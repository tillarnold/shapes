import BaseShape from './baseShape.js'
import { makeVector } from './vector.js'

export default class Circle extends BaseShape{
  /**
   * @param v {VectorLikeObject}
   * @param radius {number}
   */
  constructor(v, radius) {
    super()

    let vector = makeVector(v)

    if(!Number.isFinite(radius)) {
      throw new Error('The radius parameter for the Circle counstructor must be a number.' +
                      `Your parameter was "${radius}"`)
    }

    this.radius = radius
    this.center = vector

    Object.freeze(this)
  }

  /**
   * @param ctx {CanvasRenderingContext2D}
   */
  path(ctx) {
    ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI, false)
  }

  /**
   * @param args {VectorLikeObject}
   * @returns {boolean}
   */
  contains(...args) {
    let vector = makeVector(args)
    return vector.distanceTo(this.center) <= this.radius
  }

  /**
   * @return {Circle}
   */
  round() {
    return new Circle(this.center.round(), Math.round(this.radius))
  }

  /**
   * @param v {Vector}
   * @return {Circle}
   */
  moveBy(v) {
    return new Circle(this.center.add(v), this.radius)
  }

  /**
   * @param r {number}
   * @return {Circle}
   */
  changeRadiusBy(r) {
    return new Circle(this.center, this.radius + r)
  }
}
