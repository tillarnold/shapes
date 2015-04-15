import BaseShape from './baseShape.js'
import Vector from './vector.js'
import findIntersections from 'red-blue-line-segment-intersect'

let { makeVector } = Vector


export default class Polygon extends BaseShape {
  /**
   * @param vs {VectorLikeObject[]}
   */
  constructor(vs) {
    super()

    //@type { Vector[] }
    this.vectors = []

    vs.forEach( el => {
      this.vectors.push(makeVector(el))
    })

    Object.freeze(this)

  }

  /**
   * @return {[number,number][]}
   */
  toPairs() {
    let v = this.vectors
      , pol = []

    v.forEach( (elem, i) => {
      pol.push([elem.toPair(), (v[i + 1] || new Vector(0, 0)).toPair()])
    })

    pol[pol.length - 1][1] = v[0].toPair()
    return pol
  }

  /**
   * @param ctx {CanvasRenderingContext2D}
   */
  path(ctx) {
    let v = this.vectors

    ctx.moveTo(v[0].x, v[0].y)

    v.forEach( el => {
      ctx.lineTo(el.x, el.y)
    })

    ctx.lineTo(v[0].x, v[0].y)
  }

  /**
   * @param args {VectorLikeObject}
   * @return {boolean}
   */
  contains(...args) {
    let vector = makeVector(args)
      , line = [vector.toPair(), vector.add([9999.987, 99999.964]).toPair()]
      , pairs = this.toPairs()
      , count = 0

    findIntersections(pairs, [line], () => {
      count++
    })

    return count % 2 === 1
  }

  /**
   * @return {Vector}
   */
  getCentroid() {
    let cx
      , cy
      , { vectors } = this
      , { length } = vectors
      , a = 0.0
      , i1 = 1

    vectors.forEach( el => {
      a += el.x * vectors[i1].y - vectors[i1].x * el.y
      i1 = (i1 + 1) % length
    })

    a *= 0.5


    cx = cy = 0.0
    i1 = 1
    vectors.forEach( el => {
      let t = el.x * vectors[i1].y - vectors[i1].x * el.y
      cx += (el.x + vectors[i1].x) * t
      cy += (el.y + vectors[i1].y) * t
      i1 = (i1 + 1) % length
    })
    cx = cx / (6.0 * a)
    cy = cy / (6.0 * a)


    return new Vector(cx, cy)
  }

  /**
   * creates a new Polygon by calling map
   * on the vectors in the Polygon
   * @param fn {function} - the map function
   * @return {Polygon}
   */
  map(fn) {
    return new Polygon(this.vectors.map(fn))
  }

  /**
   * Returns a new Polygon with
   * all vectors rounded
   * @return {Polygon}
   */
  round() {
    return this.map( el => el.round() )
  }

  /**
   * @param args {VectorLikeObject}
   * @return {Polygon}
   */
  moveBy(...args) {
    return this.map( el => el.add(args) )
  }
}
