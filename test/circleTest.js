'use strict';
var test = require('tape');

var shapes = require('..');
var Circle = shapes.Circle;
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

test('Circle#round', function(t) {
  t.plan(3);
  var c = new Circle( [20.49,25.33], 0.76);
  var c2 = c.round();

  t.equal(c2.center.x, 20);
  t.equal(c2.center.y, 25);
  t.equal(c2.radius, 1);
});


test('Circle#clone', function(t) {
  t.plan(3);
  var c = new Circle( [55,66],3);
  var c2 = c.clone();

  c.center.x = 100;
  c.center.y = 10440;
  c.radius = 12;

  t.equal(c2.center.x, 55);
  t.equal(c2.center.y, 66);
  t.equal(c2.radius, 3);
});

test('Circle#moveBy', function(t) {
  t.plan(3);
  var c = new Circle( [55,66],3);
  var c2 = c.moveBy([10,20]);

  c.center.x = 100;
  c.center.y = 10440;
  c.radius = 12;

  t.equal(c2.center.x, 65);
  t.equal(c2.center.y, 86);
  t.equal(c2.radius, 3);
});
