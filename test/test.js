var test = require('tape');

var shapes = require('..');
var Point = shapes.Point;
var Rect = shapes.Rectangle;
var Circle = shapes.Circle;
var Square = shapes.Square;



test('Point constructor', function (t) {
  t.plan(2);
  var p = new Point(400,42);
  t.equal(p.x,400);
  t.equal(p.y,42);
});

test('Circle constructor', function (t) {
  t.plan(1);
  var c = new Circle(new Point(50,50),10);
  t.equal(c.radius,10);
});

test('Rectangle constructor', function (t) {
  t.plan(2);
  var r = new Rect(new Point(44,66),32,45);
  t.equal(r.width,32);
  t.equal(r.height,45);
});

test('Point#moveBy', function (t) {
  t.plan(4);
  var p = new Point(144,333);
  var p2 = p.moveBy(33,9);
  t.equal(p2.x,177);
  t.equal(p2.y,342);

  var p3 = p2.moveBy(-30,-10);
  t.equal(p3.x,147);
  t.equal(p3.y,332);
});

test('Square#centerAt', function (t) {
  t.plan(2);
  var s = Square.centerAt(new Point(100,150),46);
  t.equal(s.point.x,77);
  t.equal(s.point.y,127);
});


