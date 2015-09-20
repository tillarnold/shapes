import test from 'tape'
import BaseShape from '../lib/baseShape.js'
import { ShapeEventEmitter } from '..'
import { Rectangle } from '..'

let noop = function() {}

global.HTMLCanvasElement = function HTMLCanvasElement() {}
global.window = {}
global.window.document = {}
global.window.document.addEventListener = noop

test('BaseShape#clear', t => {
  t.plan(2)
  let mockCtx = { save: noop
                , beginPath: noop
                , fill: noop
                , restore: noop
                }
    , bs = new BaseShape()

  bs.path = function() {
    t.pass('path function was called')
  }

  bs.clear(mockCtx)

  t.equals(mockCtx.globalCompositeOperation, 'destination-out')
})


test('BaseShape#clip', t => {
  t.plan(1)
  let mockCtx = { save: noop
                , beginPath: noop
                , clip: noop
                }
    , bs = new BaseShape()
  bs.path = () => {
    t.pass('path function was called')
  }

  bs.clip(mockCtx)
})


test('BaseShape#fill', t => {
  t.plan(1)
  let mockCtx = { beginPath: noop
                , fill: noop
                }
    , bs = new BaseShape()

  bs.path = () => t.pass('path function was called')

  bs.fill(mockCtx)
})


test('BaseShape#stroke', t => {
  t.plan(1)
  let mockCtx = { beginPath: noop
                , stroke: noop
                }
    , bs = new BaseShape()

  bs.path = () => t.pass('path function was called')


  bs.stroke(mockCtx)
})

test('BaseShape#createShapeEventEmitter', t => {
  t.plan(2)
  let canvas = new HTMLCanvasElement()
    , rect = new Rectangle([10, 10], 50, 50)

  t.equals(rect.createShapeEventEmitter(canvas)._cee, new ShapeEventEmitter(rect, canvas)._cee)
  t.equals(new ShapeEventEmitter(rect, canvas)._cee, new ShapeEventEmitter(rect, canvas)._cee)

})
