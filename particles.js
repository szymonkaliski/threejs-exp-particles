var THREE = require('three');

function Particles(num, size, flowField) {
  this.flowField = flowField;

  var geometry = new THREE.Geometry();
  this.velocities = [];

  for (var i = 0; i < num; ++i) {
    var vertex = new THREE.Vector3(
      (Math.random() - 0.5),
      (Math.random() - 0.5),
      (Math.random() - 0.5)
    );

    geometry.vertices.push(vertex);

    this.velocities.push(new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    ));
  }

  var material = new THREE.PointsMaterial({
    size: 0.01,
    color: 0xffffff
  });

  this.points = new THREE.Points(geometry, material);
}

Particles.prototype.update = function() {
  for (var i = 0; i < this.points.geometry.vertices.length; ++i) {
    var vertex = this.points.geometry.vertices[i];
    var velocity = this.velocities[i];

    var flow = this.flowField.sample(vertex.x, vertex.y, vertex.z);

    if (flow) {
      var steer = flow.clone().sub(velocity);

      velocity.add(steer.multiplyScalar(0.02));
      vertex.add(velocity.multiplyScalar(1.0));
    }
    else {
      vertex.set(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      );

      velocity.set(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      );
    }
  }

  this.points.geometry.verticesNeedUpdate = true;
};

module.exports = Particles;

