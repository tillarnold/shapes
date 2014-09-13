var shapes = require('..');
var Circle = shapes.Circle;
var test = require('tape');
var Vector = shapes.Vector;


test('Circle constructor', function(t) {
  t.plan(1);
  var c = new Circle(new Vector(50, 50), 10);
  t.equal(c.radius, 10);
});
