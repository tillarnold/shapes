"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var BaseShape = require("./baseShape.js"),
    Vector = require("./vector.js"),
    findIntersections = require("red-blue-line-segment-intersect");

var makeVector = Vector.makeVector;

module.exports = (function (BaseShape) {
  function Polygon(vs) {
    var _this = this;

    _classCallCheck(this, Polygon);

    this.vectors = [];

    vs.forEach(function (el) {
      _this.vectors.push(makeVector(el));
    });
  }

  _inherits(Polygon, BaseShape);

  _prototypeProperties(Polygon, null, {
    toPairs: {
      value: function toPairs() {
        var v = this.vectors,
            pol = [];

        v.forEach(function (elem, i) {
          pol.push([elem.toPair(), (v[i + 1] || new Vector(0, 0)).toPair()]);
        });

        pol[pol.length - 1][1] = v[0].toPair();
        return pol;
      },
      writable: true,
      configurable: true
    },
    path: {
      value: function path(ctx) {
        var v = this.vectors;

        ctx.moveTo(v[0].x, v[0].y);

        v.forEach(function (el) {
          ctx.lineTo(el.x, el.y);
        });

        ctx.lineTo(v[0].x, v[0].y);
      },
      writable: true,
      configurable: true
    },
    contains: {
      value: function contains() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var vector = makeVector(args),
            line = [vector.toPair(), vector.add([9999.987, 99999.964]).toPair()],
            pairs = this.toPairs(),
            count = 0;

        findIntersections(pairs, [line], function () {
          count++;
        });

        return count % 2 === 1;
      },
      writable: true,
      configurable: true
    },
    getCentroid: {
      value: function getCentroid() {
        var cx = undefined;
        var cy = undefined;

        var _ref = this;

        var vectors = _ref.vectors;
        var length = vectors.length;
        var a = 0;
        var i1 = 1;

        vectors.forEach(function (el) {
          a += el.x * vectors[i1].y - vectors[i1].x * el.y;
          i1 = (i1 + 1) % length;
        });

        a *= 0.5;

        cx = cy = 0;
        i1 = 1;
        vectors.forEach(function (el) {
          var t = el.x * vectors[i1].y - vectors[i1].x * el.y;
          cx += (el.x + vectors[i1].x) * t;
          cy += (el.y + vectors[i1].y) * t;
          i1 = (i1 + 1) % length;
        });
        cx = cx / (6 * a);
        cy = cy / (6 * a);

        return new Vector(cx, cy);
      },
      writable: true,
      configurable: true
    },
    map: {
      value: function map(fn) {
        return new Polygon(this.vectors.map(fn));
      },
      writable: true,
      configurable: true
    },
    round: {
      value: function round() {
        return this.map(function (el) {
          return el.round();
        });
      },
      writable: true,
      configurable: true
    },
    clone: {
      value: function clone() {
        return this.map(function (el) {
          return el.clone();
        });
      },
      writable: true,
      configurable: true
    },
    moveBy: {
      value: function moveBy(v) {
        return this.map(function (el) {
          return el.add(v);
        });
      },
      writable: true,
      configurable: true
    }
  });

  return Polygon;
})(BaseShape);