'use strict';

let BaseShape = require('./baseShape.js')
  , { makeVector } = require('./vector.js');


module.exports = class Circle extends BaseShape{
  constructor(v, radius) {
    super()

    let vector = makeVector(v);

    if(!Number.isFinite(radius)) {
      throw new Error('The radius parameter for the Circle counstructor must be a number.' +
                      `Your parameter was "${radius}"`);
    }

    this.radius = radius;
    this.center = vector;

    Object.freeze(this);
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

  moveBy(v) {
    return new Circle(this.center.add(v), this.radius);
  }

  changeRadiusBy(r) {
    return new Circle(this.center, this.radius + r);
  }
};
