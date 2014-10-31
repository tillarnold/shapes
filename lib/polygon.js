'use strict';

var inherits = require('inherits');
var BaseShape = require('./baseShape.js');
var Vector = require('./vector.js');
var makeVector = Vector.makeVector;
var findIntersections = require('red-blue-line-segment-intersect');

var Polygon = function Polygon(vs) {
  var vectors = [];

  vs.forEach(function(el) {
    vectors.push(makeVector(el));
  });

  this.vectors = vectors;
};

inherits(Polygon, BaseShape);


Polygon.prototype.toPairs = function() {
  var v = this.vectors;
  var pol = [];

  v.forEach(function(elem, i) {
    pol.push([elem.toPair(), (v[i + 1] || new Vector(0, 0)).toPair()]);
  });

  pol[pol.length - 1][1] = v[0].toPair();
  return pol;
};

Polygon.prototype.path = function(ctx) {
  var v = this.vectors;

  ctx.moveTo(v[0].x, v[0].y);

  v.forEach(function(el) {
    ctx.lineTo(el.x, el.y);
  });

  ctx.lineTo(v[0].x, v[0].y);
};

Polygon.prototype.contains = function() {
  var vector = makeVector(arguments);
  var line = [vector.toPair(), vector.add([9999.987, 99999.964]).toPair()];
  var pairs = this.toPairs();

  var count = 0;
  findIntersections(pairs, [line], function() {
    count++;
  });

  return count % 2 === 1;
};

Polygon.prototype.getCentroid = function() {
  var cx, cy;

  var length = this.vectors.length;
  var vectors = this.vectors;
  var a = 0.0;
  var i1 = 1;
  vectors.forEach(function(el) {
    a += el.x * vectors[i1].y - vectors[i1].x * el.y;
    i1 = (i1 + 1) % length;
  });
  a *= 0.5;


  cx = cy = 0.0;
  i1 = 1;
  vectors.forEach(function(el) {
    var t = el.x * vectors[i1].y - vectors[i1].x * el.y;
    cx += (el.x + vectors[i1].x) * t;
    cy += (el.y + vectors[i1].y) * t;
    i1 = (i1 + 1) % length;
  });
  cx = cx / (6.0 * a);
  cy = cy / (6.0 * a);


  return new Vector(cx, cy);
};

Polygon.prototype.map = function(fn) {
  return new Polygon(this.vectors.map(fn));
};

Polygon.prototype.round = function() {
  return this.map(function(el) {
    return el.round();
  });
};

Polygon.prototype.clone = function() {
  return this.map(function(el) {
    return el.clone();
  });
};

Polygon.prototype.moveBy = function(v) {
  return this.map(function(el) {
    return el.add(v);
  });
};

module.exports = Polygon;
