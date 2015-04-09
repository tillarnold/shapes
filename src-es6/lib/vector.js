module.exports = class Vector {
  constructor (x, y) {

    if(!(Number.isFinite(x) && Number.isFinite(y))) {
      throw new Error('The parameters for a Vector need to be numeric! The parameters passed are "' + x + '" "' + y + '"')
    }

    this.x = x
    this.y = y

    Object.freeze(this)
  }

  distanceTo() {
    let vector = Vector.makeVector(arguments)
      , s1 = (this.x - vector.x) * (this.x - vector.x)
      , s2 = (this.y - vector.y) * (this.y - vector.y)

    return Math.sqrt(s1 + s2)
  }

  toPair() {
    return [this.x, this.y]
  }

  midpoint() {
    let vector = Vector.makeVector(arguments)
    return new Vector((this.x + vector.x) / 2, (this.y + vector.y) / 2)
  }

  round() {
    return new Vector(Math.round(this.x), Math.round(this.y))
  }

  add(...args) {
    let vector = Vector.makeVector(args)
    return new Vector(this.x + vector.x, this.y + vector.y)
  }

  subtract(...args) {
    let vector = Vector.makeVector(args)
    return new Vector(this.x - vector.x, this.y - vector.y)
  }

  isBetween(v1, v2, tolerance = 0.01) {
    let b = Vector.makeVector(v1)
      , a = Vector.makeVector(v2)
      , cMa = this.subtract(a)
      , bMa = b.subtract(a)
      , m = cMa.y * bMa.x - cMa.x * bMa.y

    if (Math.abs(m) > tolerance) {
      return false
    }

    let dotproduct = cMa.dotProduct(bMa)
    if (dotproduct < 0) {
      return false
    }

    let squaredlengthba = bMa.x * bMa.x + bMa.y * bMa.y
    if (dotproduct > squaredlengthba){
      return false
    }

    return true
  }

  dotProduct(...args) {
    let vector = Vector.makeVector(args)

    return this.x * vector.x + this.y * vector.y
  }

  getMagnitude() {
    // a^2 + b^2 = c^2
    // sqrt(a^2 + b^2) = c
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  getAngle() {
    return Math.atan2(this.y, this.x)
  }


  static fromAngle(angle, magnitude) {
    return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle))
  }

  static makeVector(v) {
    if (v instanceof Vector) {
      return v
    }

    let { length } = v

    if (length && length === 2) {
      return new Vector(v[0], v[1])
    }

    if (length && length === 1) {
      return Vector.makeVector(v[0])
    }

    throw new Error(v + ' is not a valid vector')
  }
}
