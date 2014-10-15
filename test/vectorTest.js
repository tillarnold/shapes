var test = require('tape');

var shapes = require('..');
var Vector = shapes.Vector;

test('Vector constructor', function(t) {
  t.plan(2);
  var p = new Vector(400, 42);
  t.equal(p.x, 400);
  t.equal(p.y, 42);
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

test('Vector#distaceTo', function(t) {
  t.plan(3);
  var p1 = new Vector(10, 50);
  var p2 = new Vector(10, 60);
  var p4 = new Vector(20, 60);
  t.equals(p1.distanceTo(p2), 10);
  t.equals(p1.distanceTo([20, 50]), 10);
  t.equals(Math.round(p1.distanceTo(p4)), 14);
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

test('Vector#makeVector', function(t) {
  t.plan(1);
  t.throws(function(){ Vector.makeVector({});});
});
