var Square = function Square(p,s){
    this.point = p;
    this.side = s;
};

Square.centerAt = function(p,s) {
  return new Square(p.moveBy(-s/2,-s/2),s);
};

Square.prototype.fill = function(ctx){
  ctx.fillRect(this.point.x,this.point.y,this.side,this.side);  
};

Square.prototype.stroke = function(ctx){
  ctx.strokeRect(this.point.x,this.point.y,this.side,this.side); 
};

Square.prototype.contains = function(p){
  return this.point.x<p.x && this.point.y<p.y && this.point.x+this.side>p.x && this.point.y+this.side>p.y;
};

Square.prototype.round = function(){
  return new Square(this.point.round(),Math.round(this.side));
};

module.exports = Square;
