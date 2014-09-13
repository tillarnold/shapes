var test = require('tape');

var shapes = require('..');
var Vector = shapes.Vector;
var Rect = shapes.Rectangle;
var Circle = shapes.Circle;
var Polygon = shapes.Polygon;

test('Vector constructor', function(t) {
  t.plan(2);
  var p = new Vector(400, 42);
  t.equal(p.x, 400);
  t.equal(p.y, 42);
});

test('Circle constructor', function(t) {
  t.plan(1);
  var c = new Circle(new Vector(50, 50), 10);
  t.equal(c.radius, 10);
});

test('Rectangle constructor', function(t) {
  t.plan(4);
  var r = new Rect(new Vector(44, 66), 32, 45);
  t.equal(r.width, 32);
  t.equal(r.height, 45);

  var r2 = new Rect([10, 100], 0, 0);
  t.equal(r2.point.x, 10);
  t.equal(r2.point.y, 100);
});

test('Vector#add', function(t) {
  t.plan(4);
  var p = new Vector(144, 333);
  var p2 = p.add([33, 9]);
  t.equal(p2.x, 177);
  t.equal(p2.y, 342);

  var p3 = p2.add(new Vector(-30, -10));
  t.equal(p3.x, 147);
  t.equal(p3.y, 332);
});

test('Rectangle#round', function(t) {
  t.plan(4);
  var r = new Rect(new Vector(33.4, 2.1), 44.7, 88.9999).round();
  t.equal(r.point.x, 33);
  t.equal(r.point.y, 2);
  t.equal(r.width, 45);
  t.equal(r.height, 89);
});


test('Vector#distaceTo', function(t) {
  t.plan(3);
  var p1 = new Vector(10, 50);
  var p2 = new Vector(10, 60);
  var p4 = new Vector(20, 60);
  t.equals(p1.distanceTo(p2), 10);
  t.equals(p1.distanceTo([20, 50]), 10);
  t.equals(Math.round(p1.distanceTo(p4)), 14);
});

test('Polygon#clone', function(t) {
  t.plan(2);
  var p1 = new Polygon([
    [12, 18],
    [14, 31],
    [19, 32],
    [22, 24]
  ]);
  var p2 = p1.clone();

  p1.vectors[0] = new Vector(10000, 3);
  t.equals(p1.vectors[1].x, 14);

  t.equals(p2.vectors[0].x, 12);
});

test('Polygon#contains', function(t) {
  t.plan(2);
  var p1 = new Polygon([
    [10, 10],
    [10, 20],
    [20, 20],
    [20, 10]
  ]);

  t.equals(p1.contains([15, 15]), true);
  t.equals(p1.contains([21, 15]), false);
});


test('Vector#getAngle', function(t) {
  t.plan(2);
  var v = new Vector(10, 0);
  t.equals(v.getAngle(), 0);

  var v2 = new Vector(10, 10);
  t.equals(Math.round(v2.getAngle()), 1);
});

test('Vector#midpoint', function(t) {
  t.plan(2);
  var v = new Vector(10, 10);
  var m = v.midpoint([10, 20]);
  t.equals(m.x, 10);
  t.equals(m.y, 15);

});


test('Vector#getMagnitude', function(t) {
  t.plan(1);

  var v = new Vector(0, 10);
  t.equals(v.getMagnitude(), 10);
});


test('Vector#fromAngle', function(t) {
  t.plan(2);

  var v = Vector.fromAngle(0, 10);
  t.equals(v.x, 10);
  t.equals(v.y, 0);

});

test('Rectangle#contains', function(t) {
  t.plan(2);
  var r = new Rect([10, 10], 100, 20);
  t.equals(r.contains([20, 15]), true);
  t.equals(r.contains([200, 21]), false);
});
