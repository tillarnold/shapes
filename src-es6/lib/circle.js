'use strict';

let BaseShape = require('./baseShape.js')
  , { makeVector } = require('./vector.js');


module.exports = class Circle extends BaseShape{
  constructor(v, radius) {
    let vector = makeVector(v);
    this.radius = radius;
    this.center = vector;
  }

  path(ctx) {
    ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI, false);
  }

  contains(...args) {
    let vector = makeVector(args);
    return vector.distanceTo(this.center) <= this.radius;
  }

  round() {
    return new Circle(this.center.round(), Math.round(this.radius));
  }

  clone() {
    return new Circle(this.center.clone(), this.radius);
  }

  moveBy(v) {
    return new Circle(this.center.add(v), this.radius);
  }
};
