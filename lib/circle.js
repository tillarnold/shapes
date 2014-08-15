var Circle = function Circle(p,radius){
  this.radius = radius;
  this.center = p;
};

Circle.prototype.fill = function(ctx){
  ctx.beginPath();
  ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI, false);
  ctx.fill();
};
Circle.prototype.stroke = function(ctx){
  ctx.beginPath();
  ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI, false);
  ctx.stroke();
};

Circle.prototype.contains = function(p){
  return p.distanceTo(this.center) <= this.radius;
};

Circle.prototype.round = function(){
  return new Circle(this.center.round(),Math.round(this.radius));
};

module.exports = Circle;
