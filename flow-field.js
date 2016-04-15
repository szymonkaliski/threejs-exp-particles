var THREE        = require('three');
var computeNoise = require('./compute-noise');

function FlowField(size) {
  this.field = [];
  this.size  = size;

  for (var x = 0; x < size; ++x) {
    this.field[x] = [];

    for (var y = 0; y < size; ++y) {
      this.field[x][y] = [];

      for (var z = 0; z < size; ++z) {
        var mod = 0.07;

        this.field[x][y][z] = computeNoise(x * mod, y * mod, z * mod);
      }
    }
  }
}

FlowField.prototype.sample = function(x, y, z) {
  x = Math.round(x) + this.size / 2;
  y = Math.round(y) + this.size / 2;
  z = Math.round(z) + this.size / 2;

  return (this.field[x] && this.field[x][y] && this.field[x][y][z]) ? this.field[x][y][z] : undefined;
};

module.exports = FlowField;
