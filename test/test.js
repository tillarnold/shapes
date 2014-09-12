var test = require('tape');

var shapes = require('..');
var Vector = shapes.Vector;
var Rect = shapes.Rectangle;
var Circle = shapes.Circle;


test('Vector constructor', function (t) {
  t.plan(2);
  var p = new Vector(400,42);
  t.equal(p.x,400);
  t.equal(p.y,42);
});

test('Circle constructor', function (t) {
  t.plan(1);
  var c = new Circle(new Vector(50,50),10);
  t.equal(c.radius,10);
});

test('Rectangle constructor', function (t) {
  t.plan(4);
  var r = new Rect(new Vector(44,66),32,45);
  t.equal(r.width,32);
  t.equal(r.height,45);
  
  var r = new Rect([10,100],0,0);
  t.equal(r.point.x,10);
  t.equal(r.point.y,100);
});

test('Vector#add', function (t) {
  t.plan(4);
  var p = new Vector(144,333);
  var p2 = p.add([33,9]);
  t.equal(p2.x,177);
  t.equal(p2.y,342);

  var p3 = p2.add(new Vector(-30,-10));
  t.equal(p3.x,147);
  t.equal(p3.y,332);
});
test('Rectangle#round', function (t) {
  t.plan(4);
  var r = new Rect(new Vector(33.4,2.1),44.7,88.9999).round();
  t.equal(r.point.x,33);
  t.equal(r.point.y,2);
  t.equal(r.width,45);
  t.equal(r.height,89);
});


test('Vector#distaceTo', function (t) {
  t.plan(3);
  var p1 = new Vector(10,50);
  var p2 = new Vector(10,60);
  var p4 = new Vector(20,60);
  t.equals(p1.distanceTo(p2),10);
  t.equals(p1.distanceTo([20,50]),10);
  t.equals(Math.round(p1.distanceTo(p4)),14);
});
