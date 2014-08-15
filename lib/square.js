var Rect = require('./rectangle.js');

var Square = function Square(p,s){
  return new Rect(p,s,s);
};

Square.centerAt = function(p,s) {
  return new Square(p.moveBy(-s/2,-s/2),s);
}
;
module.exports = Square;
