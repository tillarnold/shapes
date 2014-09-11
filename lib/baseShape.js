var BaseShape = function BaseShape(){

};


BaseShape.prototype.clear = function clear(ctx) {
  ctx.save();
  //TODO: Implement
  ctx.restore();
};


BaseShape.prototype.fill = function fill(ctx) {
  ctx.beginPath();
  this.path(ctx);
  ctx.fill();
};
  
BaseShape.prototype.stroke = function stroke(ctx) {
  ctx.beginPath();
  this.path(ctx);
  ctx.stroke();
};

module.exports = BaseShape;
