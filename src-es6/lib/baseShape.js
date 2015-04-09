let ShapeEventEmitter = require('./shapeEventEmitter.js')

module.exports = class BaseShape {
  clear(ctx) {
    ctx.save()
    ctx.beginPath()
    ctx.globalCompositeOperation = 'destination-out'
    this.path(ctx)
    ctx.fill()
    ctx.restore()
  }

  clip(ctx) {
    ctx.save()
    ctx.beginPath()
    this.path(ctx)
    ctx.clip()
  }

  fill(ctx) {
    ctx.beginPath()
    this.path(ctx)
    ctx.fill()
  }

  stroke(ctx) {
    ctx.beginPath()
    this.path(ctx)
    ctx.stroke()
  }

  createShapeEventEmitter(canvas) {
    return new ShapeEventEmitter(this, canvas)
  }
}
