'use strict';
var test = require('tape');

var shapes = require('..');
var Vector = shapes.Vector;
var Polygon = shapes.Polygon;

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

test('Polygon#round', function(t) {
  t.plan(1);

  var p0 = new Polygon([
    [10, 10],
    [10, 20],
    [20, 20],
    [20, 10]
  ]);

  var p1 = new Polygon([
    [9.5, 9.6],
    [10.4, 20.3],
    [19.7, 19.6],
    [20.333, 9.7]
  ]);

  var p2 = p1.round();
  t.deepEqual(p2.vectors, p0.vectors);
});


test('Polygon#round', function(t) {
  t.plan(1);

  var p0 = new Polygon([
    [15, 11],
    [15, 21],
    [25, 21],
    [25, 11]
  ]);

  var p1 = new Polygon([
    [10, 10],
    [10, 20],
    [20, 20],
    [20, 10]
  ]);

  var p2 = p1.moveBy([5, 1]);
  t.deepEqual(p2.vectors, p0.vectors);
});
