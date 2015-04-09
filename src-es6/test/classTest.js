import test from 'tape'
import { Vector, Polygon, Rectangle, Circle, ShapeEventEmitter } from '..'

test('Polygon#contains', (t) => {
  t.plan(5)
  //Disable warning about missing 'new'. That's what we are testing
  /*jshint -W064 */
  /*eslint-disable new-cap */
  t.throws(()=> Polygon(), TypeError)
  t.throws(()=> Rectangle(), TypeError)
  t.throws(()=> Vector(), TypeError)
  t.throws(()=> Circle(), TypeError)
  t.throws(()=> ShapeEventEmitter(), TypeError)
  /*eslint-enable new-cap */

})

