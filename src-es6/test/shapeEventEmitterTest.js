let test = require('tape')
  , { EventEmitter } = require('events')
  , { Rectangle: Rect, ShapeEventEmitter} = require('..')

test('ShapeEventEmitter emit events', (t) => {
  t.plan(4)

  let r = new Rect([10, 10], 100, 100)
    , cee = new EventEmitter()
    , see = new ShapeEventEmitter(r, cee)

  see.on('click', (e) => {
    t.equal(e.type, 'click')
  })

  see.on('mousedown', (e) => {
    t.equal(e.type, 'mousedown')
  })

  see.on('mouseup', (e) => {
    t.equal(e.type, 'mouseup')
  })

  see.on('mousemove', (e) => {
    t.equal(e.type, 'mousemove')
  })

  let eventClick = { x: 50
                   , y: 50
                   }

  cee.emit('click', eventClick)
  cee.emit('mousemove', eventClick)
  cee.emit('mousedown', eventClick)
  cee.emit('mouseup', eventClick)
})

test('ShapeEventEmitter filter events', (t) => {
  let r = new Rect([10, 10], 100, 100)
    , cee = new EventEmitter()
    , see = new ShapeEventEmitter(r, cee)

  see.on('click', () => {
    t.fail('called event listener for click')
  })

  see.on('mousedown', () => {
    t.fail('called event listener for mousedown')
  })

  let eventClick = { x: 800
                   , y: 50
                   }

  cee.emit('click', eventClick)
  cee.emit('mousedown', eventClick)
  t.end()
})

test('ShapeEventEmitter mouseover and mouseout', (t) => {
  let r = new Rect([10, 10], 100, 100)
    , cee = new EventEmitter()
    , see = new ShapeEventEmitter(r, cee)
    , overs = 0
    , outs = 0

  t.plan(6)

  see.on('mouseover', (e) => {
    t.equal(e.type, 'mouseover')
    overs++
  })

  see.on('mouseout', (e) => {
    t.equal(e.type, 'mouseout')
    outs++
  })

  cee.emit('mousemove', { x: 50
                        , y: 50
                        })

  cee.emit('mousemove', { x: 500
                        , y: 50
                        })

  cee.emit('mousemove', { x: 50
                        , y: 60
                        })

  cee.emit('mouseout', {})
  cee.emit('mouseout', {})

  t.equal(overs, 2)
  t.equal(outs, 2)
})

test('ShapeEventEmitter mouseover and mouseout', (t) => {
  let r = new Rect([10, 10], 100, 100)
    , cee = new EventEmitter()
    , see = new ShapeEventEmitter(r, cee)

  t.plan(1)

  t.equal(cee, see.getCanvasEventEmitter())
})

test('preventDefault', (t) => {
  t.plan(1)

  let r = new Rect([10, 10], 100, 100)
    , cee = new EventEmitter()
    , see = new ShapeEventEmitter(r, cee)

  see.on('mousemove', (e) => {
    e.preventDefault()
  })

  cee.emit('mousemove', { x: 30
                        , y: 70
                        , preventDefault: () => t.pass()
                        })
})
