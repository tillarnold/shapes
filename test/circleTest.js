var shapes = require('..');
var Circle = shapes.Circle;
var test = require('tape');
var Vector = shapes.Vector;


test('Circle constructor', function(t) {
  t.plan(1);
  var c = new Circle(new Vector(50, 50), 10);
  t.equal(c.radius, 10);
});

test('Circle#contains', function(t) {
  t.plan(2);
  var c = new Circle( [20,20], 10);

  var v1 = [21,18];
  var v2 = [99,18];

  t.equal(c.contains(v1), true);
  t.equal(c.contains(v2), false);
});
