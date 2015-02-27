"use strict";

var test = require("tape");
var BaseShape = require("../lib/baseShape.js");

var _require = require("../");

var ShapeEventEmitter = _require.ShapeEventEmitter;

var _require2 = require("..");

var Rectangle = _require2.Rectangle;

var noop = function noop() {};

global.HTMLCanvasElement = function HTMLCanvasElement() {};
global.window = {};
global.window.document = {};
global.window.document.addEventListener = noop;

test("BaseShape#clear", function (t) {
  t.plan(2);
  var mockCtx = { save: noop,
    beginPath: noop,
    fill: noop,
    restore: noop
  },
      bs = new BaseShape();

  bs.path = function () {
    t.pass("path function was called");
  };

  bs.clear(mockCtx);

  t.equals(mockCtx.globalCompositeOperation, "destination-out");
});

test("BaseShape#clip", function (t) {
  t.plan(1);
  var mockCtx = { save: noop,
    beginPath: noop,
    clip: noop
  },
      bs = new BaseShape();
  bs.path = function () {
    t.pass("path function was called");
  };

  bs.clip(mockCtx);
});

test("BaseShape#fill", function (t) {
  t.plan(1);
  var mockCtx = { beginPath: noop,
    fill: noop
  },
      bs = new BaseShape();

  bs.path = function () {
    t.pass("path function was called");
  };

  bs.fill(mockCtx);
});

test("BaseShape#stroke", function (t) {
  t.plan(1);
  var mockCtx = { beginPath: noop,
    stroke: noop
  },
      bs = new BaseShape();

  bs.path = function () {
    t.pass("path function was called");
  };

  bs.stroke(mockCtx);
});

test("BaseShape#createShapeEventEmitter", function (t) {
  t.plan(2);
  var canvas = new HTMLCanvasElement(),
      rect = new Rectangle([10, 10], 50, 50);

  t.equals(rect.createShapeEventEmitter(canvas)._cee, new ShapeEventEmitter(rect, canvas)._cee);
  t.equals(new ShapeEventEmitter(rect, canvas)._cee, new ShapeEventEmitter(rect, canvas)._cee);
});