'use strict';

var inherits = require('inherits');
var BaseShape = require('./baseShape.js');
var makeVector = require('./vector.js').makeVector;

var Rectangle = function Rectangle(v, w, h) {
  var vector = makeVector(v);

  this.point = vector;
  this.width = w;
  this.height = h;
};

inherits(Rectangle, BaseShape);

Rectangle.prototype.path = function(ctx) {
  ctx.moveTo(this.point.x, this.point.y);
  ctx.lineTo(this.point.x, this.point.y + this.height);
  ctx.lineTo(this.point.x + this.width, this.point.y + this.height);
  ctx.lineTo(this.point.x + this.width, this.point.y);
  ctx.lineTo(this.point.x, this.point.y);
};

Rectangle.prototype.contains = function() {
  var vector = makeVector(arguments);
  return this.point.x < vector.x && this.point.y < vector.y && this.point.x + this.width > vector.x && this.point.y + this.height > vector.y;
};

Rectangle.prototype.round = function() {
  return new Rectangle(this.point.round(), Math.round(this.width), Math.round(this.height));
};

Rectangle.prototype.clone = function() {
  return new Rectangle(this.point.clone(), this.width, this.height);
};

Rectangle.prototype.moveBy = function(v) {
  return new Rectangle(this.point.add(v), this.width, this.height);
};

module.exports = Rectangle;
