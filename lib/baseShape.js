var BaseShape = function BaseShape(){

};


BaseShape.prototype.clear = function clear(ctx) {
  ctx.save();
  ctx.beginPath();
  ctx.globalCompositeOperation = 'destination-out'
  this.path();
  ctx.fill();
  ctx.restore();
};

BaseShape.prototype.clip = function clear(ctx) {
  ctx.save();
  ctx.beginPath();
  this.path(ctx);
  ctx.clip();
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
