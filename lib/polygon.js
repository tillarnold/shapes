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

Polygon.prototype.contains = function(v) {
  var vector = makeVector(v);
  var line = [vector.toPair(), vector.add([9999.987, 99999.964]).toPair()];
  var pairs = this.toPairs();

  var count = 0;
  findIntersections(pairs, [line], function() {
    count++;
  });

  return count % 2 === 1;
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
