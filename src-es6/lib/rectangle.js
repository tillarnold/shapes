import BaseShape from './baseShape.js'
import { makeVector } from './vector.js'

export default class Rectangle extends BaseShape {

  constructor(v, w, h) {
    super()

    let vector = makeVector(v)

    this.point = vector
    this.width = w
    this.height = h

    Object.freeze(this)
  }


  path(ctx) {
    ctx.moveTo(this.point.x, this.point.y)
    ctx.lineTo(this.point.x, this.point.y + this.height)
    ctx.lineTo(this.point.x + this.width, this.point.y + this.height)
    ctx.lineTo(this.point.x + this.width, this.point.y)
    ctx.lineTo(this.point.x, this.point.y)
  }

  contains(...args) {
    let vector = makeVector(args)
    return this.point.x < vector.x &&
           this.point.y < vector.y &&
           this.point.x + this.width > vector.x &&
           this.point.y + this.height > vector.y
  }

  round() {
    return new Rectangle(this.point.round(), Math.round(this.width), Math.round(this.height))
  }

  moveBy(v) {
    return new Rectangle(this.point.add(v), this.width, this.height)
  }
}
