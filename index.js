var THREE         = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);

var FlowField     = require('./flow-field');
var Particles     = require('./particles');

var renderer      = new THREE.WebGLRenderer();
var width         = window.innerWidth;
var height        = window.innerHeight;

renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

var scene    = new THREE.Scene();
scene.fog    = new THREE.Fog(0x000000, 10, 190);

var camera   = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
var controls = new OrbitControls(camera);

camera.position.z = 100;

var flowField = new FlowField(100);
var particles = new Particles(20000, 100, flowField);

scene.add(particles.points);

function render() {
  requestAnimationFrame(render);

  particles.update();

  renderer.render(scene, camera);
}

render();
