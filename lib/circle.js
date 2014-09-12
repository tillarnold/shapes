var inherits = require('util').inherits;
var BaseShape = require('./baseShape.js');
var makeVector = require('./vector.js').makeVector;

var Circle = function Circle(p,radius){
  this.radius = radius;
  this.center = p;
};

inherits(Circle, BaseShape);

Circle.prototype.path = function(ctx){
  ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI, false);
};

Circle.prototype.contains = function(v){
  var vector = makeVector(v);
  return vector.distanceTo(this.center) <= this.radius;
};

Circle.prototype.round = function(){
  return new Circle(this.center.round(),Math.round(this.radius));
};

Circle.prototype.clone = function(){
  return new Circle(this.center.clone(),this.radius);
};

Circle.prototype.moveBy = function(v){
  return new Circle(this.center.add(v),this.radius);
};

module.exports = Circle;
