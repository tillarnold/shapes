"use strict";

var test = require("tape");

var shapes = require("..");
var Rect = shapes.Rectangle;
var Vector = shapes.Vector;

test("Rectangle constructor", function (t) {
  t.plan(4);
  var r = new Rect(new Vector(44, 66), 32, 45);
  t.equal(r.width, 32);
  t.equal(r.height, 45);

  var r2 = new Rect([10, 100], 0, 0);
  t.equal(r2.point.x, 10);
  t.equal(r2.point.y, 100);
});

test("Rectangle#round", function (t) {
  t.plan(4);
  var r = new Rect(new Vector(33.4, 2.1), 44.7, 88.9999).round();
  t.equal(r.point.x, 33);
  t.equal(r.point.y, 2);
  t.equal(r.width, 45);
  t.equal(r.height, 89);
});

test("Rectangle#contains", function (t) {
  t.plan(2);
  var r = new Rect([10, 10], 100, 20);
  t.equals(r.contains([20, 15]), true);
  t.equals(r.contains([200, 21]), false);
});

test("Rectangle#clone", function (t) {
  t.plan(1);
  var r = new Rect([10, 10], 10, 10);
  var x = r.clone();
  r.width = 100;

  t.equals(x.width, 10);
});

test("Rectangle#moveBy", function (t) {
  t.plan(2);
  var r = new Rect([100, 30], 5, 5);
  var r2 = r.moveBy([11, 1]);
  t.equals(r2.point.x, 111);
  t.equals(r2.point.y, 31);
});

test("Rectangle#path", function (t) {
  t.plan(2);
  var moves = 0;
  var lines = 0;

  var mockCtx = {
    moveTo: function moveTo() {
      moves++;
    },
    lineTo: function lineTo() {
      lines++;
    }
  };

  var r = new Rect([100, 30], 5, 5);
  r.path(mockCtx);
  t.equals(lines, 4);
  t.equals(moves, 1);
});