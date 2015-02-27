"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var BaseShape = require("./baseShape.js");

var _require = require("./vector.js");

var makeVector = _require.makeVector;

module.exports = (function (BaseShape) {
  function Circle(v, radius) {
    _classCallCheck(this, Circle);

    var vector = makeVector(v);
    this.radius = radius;
    this.center = vector;
  }

  _inherits(Circle, BaseShape);

  _prototypeProperties(Circle, null, {
    path: {
      value: function path(ctx) {
        ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI, false);
      },
      writable: true,
      configurable: true
    },
    contains: {
      value: function contains() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var vector = makeVector(args);
        return vector.distanceTo(this.center) <= this.radius;
      },
      writable: true,
      configurable: true
    },
    round: {
      value: function round() {
        return new Circle(this.center.round(), Math.round(this.radius));
      },
      writable: true,
      configurable: true
    },
    clone: {
      value: function clone() {
        return new Circle(this.center.clone(), this.radius);
      },
      writable: true,
      configurable: true
    },
    moveBy: {
      value: function moveBy(v) {
        return new Circle(this.center.add(v), this.radius);
      },
      writable: true,
      configurable: true
    }
  });

  return Circle;
})(BaseShape);