var Rectangle = function Rectangle(p,w,h){
  this.point = p;
  this.width = w;
  this.height = h;
};

Rectangle.prototype.fill = function(ctx){
  ctx.fillRect(this.point.x,this.point.y,this.width,this.height);  
};

Rectangle.prototype.stroke = function(ctx){
  ctx.strokeRect(this.point.x,this.point.y,this.width,this.height);
};

Rectangle.prototype.contains = function(p){
  return this.point.x<p.x && this.point.y<p.y && this.point.x+this.width>p.x && this.point.y+this.height>p.y;
};

Rectangle.prototype.round = function(){
  return new Rectangle(this.point.round(),Math.round(this.width),Math.round(this.height));
};

module.exports = Rectangle;
