import ShapeEventEmitter from './shapeEventEmitter.js'

export default class BaseShape {

  /**
   * @param ctx {CanvasRenderingContext2D}
   */
  clear(ctx) {
    ctx.save()
    ctx.beginPath()
    ctx.globalCompositeOperation = 'destination-out'
    this.path(ctx)
    ctx.fill()
    ctx.restore()
  }

  /**
   * @param ctx {CanvasRenderingContext2D}
   */
  clip(ctx) {
    ctx.save()
    ctx.beginPath()
    this.path(ctx)
    ctx.clip()
  }

  /**
   * @param ctx {CanvasRenderingContext2D}
   */
  fill(ctx) {
    ctx.beginPath()
    this.path(ctx)
    ctx.fill()
  }

  /**
   * @param ctx {CanvasRenderingContext2D}
   */
  stroke(ctx) {
    ctx.beginPath()
    this.path(ctx)
    ctx.stroke()
  }

  /**
   * @param canvas {EventEmitter | CanvasEventEmitter | HTMLCanvasElement}
   * @returns {ShapeEventEmitter}
   */
  createShapeEventEmitter(canvas) {
    return new ShapeEventEmitter(this, canvas)
  }
}
