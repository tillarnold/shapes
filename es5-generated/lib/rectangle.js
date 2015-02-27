"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var BaseShape = require("./baseShape.js");

var _require = require("./vector.js");

var makeVector = _require.makeVector;

module.exports = (function (BaseShape) {
  function Rectangle(v, w, h) {
    _classCallCheck(this, Rectangle);

    var vector = makeVector(v);

    this.point = vector;
    this.width = w;
    this.height = h;
  }

  _inherits(Rectangle, BaseShape);

  _prototypeProperties(Rectangle, null, {
    path: {
      value: function path(ctx) {
        ctx.moveTo(this.point.x, this.point.y);
        ctx.lineTo(this.point.x, this.point.y + this.height);
        ctx.lineTo(this.point.x + this.width, this.point.y + this.height);
        ctx.lineTo(this.point.x + this.width, this.point.y);
        ctx.lineTo(this.point.x, this.point.y);
      },
      writable: true,
      configurable: true
    },
    contains: {
      value: function contains() {
        var vector = makeVector(arguments);
        return this.point.x < vector.x && this.point.y < vector.y && this.point.x + this.width > vector.x && this.point.y + this.height > vector.y;
      },
      writable: true,
      configurable: true
    },
    round: {
      value: function round() {
        return new Rectangle(this.point.round(), Math.round(this.width), Math.round(this.height));
      },
      writable: true,
      configurable: true
    },
    clone: {
      value: function clone() {
        return new Rectangle(this.point.clone(), this.width, this.height);
      },
      writable: true,
      configurable: true
    },
    moveBy: {
      value: function moveBy(v) {
        return new Rectangle(this.point.add(v), this.width, this.height);
      },
      writable: true,
      configurable: true
    }
  });

  return Rectangle;
})(BaseShape);