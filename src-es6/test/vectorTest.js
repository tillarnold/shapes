let test = require('tape')
  , { Vector } = require('..')

test('Vector constructor', (t) => {
  t.plan(5)

  let p = new Vector(400, 42)
  t.equal(p.x, 400)
  t.equal(p.y, 42)

  t.throws(() => {
    p = new Vector({}, [])
  })

  t.throws(() => {
    p = new Vector('tt', new Date())
  })

  t.throws(() => {
    p = new Vector(t, 6)
  })
})


test('Vector#add', (t) => {
  t.plan(4)
  let p = new Vector(144, 333)
    , p2 = p.add([33, 9])

  t.equal(p2.x, 177)
  t.equal(p2.y, 342)

  let p3 = p2.add(new Vector(-30, -10))
  t.equal(p3.x, 147)
  t.equal(p3.y, 332)
})


test('Vector#subtract', (t) => {
  t.plan(6)
  let p = new Vector(300, 200)
    , p2 = p.subtract([20, 30])

  t.equal(p2.x, 280)
  t.equal(p2.y, 170)

  let p3 = p2.subtract(new Vector(-30, -10))
  t.equal(p3.x, 310)
  t.equal(p3.y, 180)

  let p4 = p.subtract(100, 30)
  t.equal(p4.x, 200)
  t.equal(p4.y, 170)
})

test('Vector#isBetween', (t) => {
  t.plan(4)
  let pM = new Vector(10, 20)
    , p1 = new Vector(10, 30)
    , p2 = new Vector(10, 10)

  t.equal(pM.isBetween(p1, p2), true)
  t.equal(pM.isBetween(p1, p2), true)

  t.equal(p1.isBetween(pM, p2), false)
  t.equal(p2.isBetween(pM, p1), false)
})

test('Vector#dotProduct', (t) => {
  t.plan(3)
  let a = new Vector(-6, 8)
    , b = new Vector(5, 12)
    , dotProduct1 = a.dotProduct(b)
    , dotProduct2 = b.dotProduct(a)

  t.equal(dotProduct1, dotProduct2)

  t.equal(dotProduct1, 66)
  t.equal(dotProduct2, 66)
})


test('Vector#distaceTo', (t) => {
  t.plan(3)
  let p1 = new Vector(10, 50)
    , p2 = new Vector(10, 60)
    , p4 = new Vector(20, 60)

  t.equals(p1.distanceTo(p2), 10)
  t.equals(p1.distanceTo([20, 50]), 10)
  t.equals(Math.round(p1.distanceTo(p4)), 14)
})


test('Vector#getAngle', (t) => {
  t.plan(2)
  let v = new Vector(10, 0)
  t.equals(v.getAngle(), 0)

  let v2 = new Vector(10, 10)
  t.equals(Math.round(v2.getAngle()), 1)
})


test('Vector#midpoint', (t) => {
  t.plan(2)
  let v = new Vector(10, 10)
    , m = v.midpoint([10, 20])

  t.equals(m.x, 10)
  t.equals(m.y, 15)

})


test('Vector#getMagnitude', (t) => {
  t.plan(1)

  let v = new Vector(0, 10)
  t.equals(v.getMagnitude(), 10)
})


test('Vector#fromAngle', (t) => {
  t.plan(2)

  let v = Vector.fromAngle(0, 10)
  t.equals(v.x, 10)
  t.equals(v.y, 0)

})


test('Vector#makeVector', (t) => {
  t.plan(1)
  t.throws(() => {
    Vector.makeVector({})
  })
})
