let test = require('tape')
  , { Vector, Polygon, Rectangle, Circle, ShapeEventEmitter}  = require('..');

test('Polygon#contains', (t) =>  {
  t.plan(5);
  t.throws(()=> Polygon(), TypeError)
  t.throws(()=> Rectangle(),TypeError)
  t.throws(()=> Vector(),TypeError)
  t.throws(()=> Circle(),TypeError)
  t.throws(()=> ShapeEventEmitter(),TypeError)

});

