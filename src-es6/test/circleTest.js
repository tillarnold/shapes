let test = require('tape')
  , { Circle, Vector } = require('..')


test('Circle constructor', (t) => {
  t.plan(1)
  let c = new Circle(new Vector(50, 50), 10)

  t.equal(c.radius, 10)
})

test('Circle#contains', (t) => {
  t.plan(2)
  let c = new Circle([20, 20], 10)
    , v1 = [21, 18]
    , v2 = [99, 18]

  t.equal(c.contains(v1), true)
  t.equal(c.contains(v2), false)
})

test('Circle#round', (t) => {
  t.plan(3)
  let c = new Circle([20.49, 25.33], 0.76)
    , c2 = c.round()

  t.equal(c2.center.x, 20)
  t.equal(c2.center.y, 25)
  t.equal(c2.radius, 1)
})


test('Circle#moveBy', (t) => {
  t.plan(3)
  let c = new Circle([55, 66], 3)
    , c2 = c.moveBy([10, 20])

  t.equal(c2.center.x, 65)
  t.equal(c2.center.y, 86)
  t.equal(c2.radius, 3)
})
