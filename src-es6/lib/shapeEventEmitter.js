import Vector from './vector.js'
import { EventEmitter } from 'events'
import { createCanvasEventEmitter } from 'canvas-utils'
import MapObject from 'es6-map'

let canvasEventEmitterMap = new MapObject()

export default class ShapeEventEmitter extends EventEmitter {
  /**
   *
   * @constructor
   * @param {Shape} shape - The shape whose `contains` method will be used
   * @param {EventEmitter | CanvasEventEmitter | HTMLCanvasElement} canvasReference - The emitter whose events will be filtered
   *                                                                or an canvasElement
   */
  constructor(shape, canvasReference) {
    super()

    if(typeof HTMLCanvasElement !== 'undefined' && canvasReference instanceof HTMLCanvasElement) {
     if(canvasEventEmitterMap.has(canvasReference)) {
       this._cee = canvasEventEmitterMap.get(canvasReference)
     }
     else {
       let newEmitter = createCanvasEventEmitter(canvasReference)
       this._cee = newEmitter
       canvasEventEmitterMap.set(canvasReference, newEmitter)
     }
    }
    else {
       this._cee = canvasReference
    }

    let canvasEventEmitter = this._cee

    this._mouseEntered = false

    canvasEventEmitter.on('mouseout', (e) => {
      if (this._mouseEntered) {
        this.emit('mouseout', { type: 'mouseout'
                              , target: e.target
                              , event: e.event
                              })

        this._mouseEntered = false
      }
    })

    ; ['click', 'mousedown', 'mouseup', 'mousemove'].forEach( elem => {
      canvasEventEmitter.on(elem, e => {
        let move = elem === 'mousemove'
          , {x, y, event, target, button} = e


        if (shape.contains([x, y])) {
          this.emit(elem, { x
                          , y
                          , vector: new Vector(x, y)
                          , type: elem
                          , target
                          , event
                          , button
                          , preventDefault: () => e.preventDefault()
                          })

          if (move && !this._mouseEntered) {
            this.emit('mouseover', { type: 'mouseover'
                                   , target
                                   , event
                                   })

            this._mouseEntered = true
          }

        } else if (move && this._mouseEntered) {

          this.emit('mouseout', { type: 'mouseout'
                                , target
                                , event
                                })

          this._mouseEntered = false
        }
      })
    })
  }

  /**
   * @returns {EventEmitter | CanvasEventEmitter}
   */
  getCanvasEventEmitter() {
    return this._cee
  }
}
