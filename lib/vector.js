var Vector = function Point(x, y) {
  this.x = x;
  this.y = y;
};

Vector.prototype.distanceTo = function(v) {
  var vector = Vector.makeVector(v);

  var s1 = (this.x - vector.x) * (this.x - vector.x);
  var s2 = (this.y - vector.y) * (this.y - vector.y);
  return Math.sqrt(s1 + s2);
};

Vector.prototype.toPair = function() {
  return [this.x, this.y];
};

Vector.prototype.midpoint = function(v) {
  var vector = Vector.makeVector(v);
  return new Vector((this.x + vector.x) / 2, (this.y + vector.y) / 2);
};

Vector.prototype.round = function() {
  return new Vector(Math.round(this.x), Math.round(this.y));
};

Vector.prototype.add = function(v) {
  var vector = Vector.makeVector(v);
  return new Vector(this.x + vector.x, this.y + vector.y);
};

Vector.prototype.getMagnitude = function() {
  // a^2 + b^2 = c^2
  // sqrt(a^2 + b^2) = c
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector.prototype.clone = function() {
  return new Vector(this.x, this.y);
};

Vector.prototype.getAngle = function() {
  return Math.atan2(this.y, this.x);
};

Vector.fromAngle = function(angle, magnitude) {
  return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
};

Vector.makeVector = function makeVector(v) {
  if (v instanceof Vector) {
    return v;
  }

  if (Array.isArray(v) && v.length === 2) {
    return new Vector(v[0], v[1]);
  }

  throw new Error(v + ' is not a valid vector');
};
module.exports = Vector;
