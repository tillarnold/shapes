var inherits = require('util').inherits;
var BaseShape = require('./baseShape.js');


var Rectangle = function Rectangle(p,w,h){
  this.point = p;
  this.width = w;
  this.height = h;
};

inherits(Rectangle, BaseShape);

Rectangle.prototype.path = function(ctx){
  ctx.moveTo(this.point.x,this.point.y);
  ctx.lineTo(this.point.x,this.point.y + this.height);
  ctx.lineTo(this.point.x + this.width, this.point.y + this.height);
  ctx.lineTo(this.point.x + this.width, this.point.y);
  ctx.lineTo(this.point.x,this.point.y);
};

Rectangle.prototype.contains = function(p){
  return this.point.x<p.x && this.point.y<p.y && this.point.x+this.width>p.x && this.point.y+this.height>p.y;
};

Rectangle.prototype.round = function(){
  return new Rectangle(this.point.round(),Math.round(this.width),Math.round(this.height));
};

module.exports = Rectangle;
