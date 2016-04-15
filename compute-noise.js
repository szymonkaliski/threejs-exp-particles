var Perlin = require('perlin-simplex');
var THREE  = require('three');

var noise  = new Perlin();

module.exports = function(x, y, z) {
  var eps = 1.0;
  var n1, n2, a, b;
  var curl = new THREE.Vector3();

  n1 = noise.noise3d(x, y + eps, z);
  n2 = noise.noise3d(x, y - eps, z);

  a = (n1 - n2) / (2 * eps);

  n1 = noise.noise3d(x, y, z + eps);
  n2 = noise.noise3d(x, y, z - eps);

  b = (n1 - n2) / (2 * eps);

  curl.x = a - b;

  n1 = noise.noise3d(x, y, z + eps);
  n2 = noise.noise3d(x, y, z - eps);

  a = (n1 - n2)/(2 * eps);

  n1 = noise.noise3d(x + eps, y, z);
  n2 = noise.noise3d(x + eps, y, z);

  b = (n1 - n2)/(2 * eps);

  curl.y = a - b;

  n1 = noise.noise3d(x + eps, y, z);
  n2 = noise.noise3d(x - eps, y, z);

  a = (n1 - n2)/(2 * eps);

  n1 = noise.noise3d(x, y + eps, z);
  n2 = noise.noise3d(x, y - eps, z);

  b = (n1 - n2)/(2 * eps);

  curl.z = a - b;

  return curl;
};
