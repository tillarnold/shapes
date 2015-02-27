"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

module.exports = (function () {
  function Vector(x, y) {
    _classCallCheck(this, Vector);

    if (!(Number.isFinite(x) && Number.isFinite(y))) {
      throw new Error("The parameters for a Vector need to be numeric! The parameters passed are \"" + x + "\" \"" + y + "\"");
    }

    this.x = x;
    this.y = y;
  }

  _prototypeProperties(Vector, {
    fromAngle: {
      value: function fromAngle(angle, magnitude) {
        return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
      },
      writable: true,
      configurable: true
    },
    makeVector: {
      value: function makeVector(v) {
        if (v instanceof Vector) {
          return v;
        }

        var length = v.length;

        if (length && length === 2) {
          return new Vector(v[0], v[1]);
        }

        if (length && length === 1) {
          return Vector.makeVector(v[0]);
        }

        throw new Error(v + " is not a valid vector");
      },
      writable: true,
      configurable: true
    }
  }, {
    distanceTo: {
      value: function distanceTo() {
        var vector = Vector.makeVector(arguments),
            s1 = (this.x - vector.x) * (this.x - vector.x),
            s2 = (this.y - vector.y) * (this.y - vector.y);

        return Math.sqrt(s1 + s2);
      },
      writable: true,
      configurable: true
    },
    toPair: {
      value: function toPair() {
        return [this.x, this.y];
      },
      writable: true,
      configurable: true
    },
    midpoint: {
      value: function midpoint() {
        var vector = Vector.makeVector(arguments);
        return new Vector((this.x + vector.x) / 2, (this.y + vector.y) / 2);
      },
      writable: true,
      configurable: true
    },
    round: {
      value: function round() {
        return new Vector(Math.round(this.x), Math.round(this.y));
      },
      writable: true,
      configurable: true
    },
    add: {
      value: function add() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var vector = Vector.makeVector(args);
        return new Vector(this.x + vector.x, this.y + vector.y);
      },
      writable: true,
      configurable: true
    },
    subtract: {
      value: function subtract() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var vector = Vector.makeVector(args);
        return new Vector(this.x - vector.x, this.y - vector.y);
      },
      writable: true,
      configurable: true
    },
    isBetween: {
      value: function isBetween(v1, v2) {
        var tolerance = arguments[2] === undefined ? 0.01 : arguments[2];

        var b = Vector.makeVector(v1),
            a = Vector.makeVector(v2),
            cMa = this.subtract(a),
            bMa = b.subtract(a),
            m = cMa.y * bMa.x - cMa.x * bMa.y;

        if (Math.abs(m) > tolerance) {
          return false;
        }

        var dotproduct = cMa.dotProduct(bMa);
        if (dotproduct < 0) {
          return false;
        }

        var squaredlengthba = bMa.x * bMa.x + bMa.y * bMa.y;
        if (dotproduct > squaredlengthba) {
          return false;
        }

        return true;
      },
      writable: true,
      configurable: true
    },
    dotProduct: {
      value: function dotProduct() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var vector = Vector.makeVector(args);

        return this.x * vector.x + this.y * vector.y;
      },
      writable: true,
      configurable: true
    },
    getMagnitude: {
      value: function getMagnitude() {
        // a^2 + b^2 = c^2
        // sqrt(a^2 + b^2) = c
        return Math.sqrt(this.x * this.x + this.y * this.y);
      },
      writable: true,
      configurable: true
    },
    clone: {
      value: function clone() {
        return new Vector(this.x, this.y);
      },
      writable: true,
      configurable: true
    },
    getAngle: {
      value: function getAngle() {
        return Math.atan2(this.y, this.x);
      },
      writable: true,
      configurable: true
    }
  });

  return Vector;
})();