var Point = function Point(x,y) {
  this.x = x;
  this.y = y;
};
 
Point.prototype.distanceTo = function(p) {
  var s1 = (this.x-p.x)*(this.x-p.x);
  var s2 = (this.y-p.y)*(this.y-p.y);
  return Math.sqrt( s1+s2 );
};
 
Point.prototype.moveBy = function(x,y) {
  return new Point(this.x+x,this.y+y);
};
 
Point.prototype.midpoint = function (p) {
  return new Point((this.x+p.x)/2,(this.y+p.y)/2);
};
 
Point.prototype.round = function() {
  return new Point(Math.round(this.x),Math.round(this.y));
};

module.exports = Point;

