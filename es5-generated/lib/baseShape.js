"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var ShapeEventEmitter = require("./shapeEventEmitter.js");

module.exports = (function () {
  function BaseShape() {
    _classCallCheck(this, BaseShape);
  }

  _prototypeProperties(BaseShape, null, {
    clear: {
      value: function clear(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.globalCompositeOperation = "destination-out";
        this.path(ctx);
        ctx.fill();
        ctx.restore();
      },
      writable: true,
      configurable: true
    },
    clip: {
      value: function clip(ctx) {
        ctx.save();
        ctx.beginPath();
        this.path(ctx);
        ctx.clip();
      },
      writable: true,
      configurable: true
    },
    fill: {
      value: function fill(ctx) {
        ctx.beginPath();
        this.path(ctx);
        ctx.fill();
      },
      writable: true,
      configurable: true
    },
    stroke: {
      value: function stroke(ctx) {
        ctx.beginPath();
        this.path(ctx);
        ctx.stroke();
      },
      writable: true,
      configurable: true
    },
    createShapeEventEmitter: {
      value: function createShapeEventEmitter(canvas) {
        return new ShapeEventEmitter(this, canvas);
      },
      writable: true,
      configurable: true
    }
  });

  return BaseShape;
})();