'use strict';

var Vector = require('./vector.js');
var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

var CanvasEventEmitter = require('canvas-utils').CanvasEventEmitter;

var MapObject = require('es6-map');
var canvasEventEmitterMap = new MapObject();

/**
 *
 * @constructor
 * @param {Shape} shape - The shape whose `contains` method will be used
 * @param {EventEmitter | CanvasEventEmitter} canvasReference - The emitter whose events will be filtered or an canvasElement
 */
var ShapeEventEmitter = function ShapeEventEmitter(shape, canvasReference) {
  var that = this;

  if(typeof HTMLCanvasElement !== 'undefined' && canvasReference instanceof HTMLCanvasElement) {
   if(canvasEventEmitterMap.has(canvasReference)) {
     this._cee = canvasEventEmitterMap.get(canvasReference);
   }
   else {
     var newEmitter = new CanvasEventEmitter(canvasReference);
     this._cee = newEmitter;
     canvasEventEmitterMap.set(canvasReference, newEmitter);
   }
  }
  else {
     this._cee = canvasReference;
  }

  var canvasEventEmitter = this._cee;

  this._mouseEntered = false;

  canvasEventEmitter.on('mouseout', function(e) {
    if (that._mouseEntered) {
      that.emit('mouseout', {
        type: 'mouseout',
        target: e.target,
        event: e.event
      });
      that._mouseEntered = false;
    }
  });

  ['click', 'mousedown', 'mouseup', 'mousemove'].forEach(function(elem) {
    canvasEventEmitter.on(elem, function(e) {
      var move = elem === 'mousemove';


      if (shape.contains([e.x, e.y])) {
        that.emit(elem, {
          x: e.x,
          y: e.y,
          vector: new Vector(e.x, e.y),
          type: elem,
          target: e.target,
          event: e.event,
          button: e.button,
          preventDefault: function(){e.preventDefault();}
        });

        if (move && !that._mouseEntered) {
          that.emit('mouseover', {
            type: 'mouseover',
            target: e.target,
            event: e.event
          });
          that._mouseEntered = true;
        }
      } else if (move && that._mouseEntered) {
        that.emit('mouseout', {
          type: 'mouseout',
          target: e.target,
          event: e.event
        });
        that._mouseEntered = false;
      }
    });
  });
};

inherits(ShapeEventEmitter, EventEmitter);

ShapeEventEmitter.prototype.getCanvasEventEmitter = function getCanvasEventEmitter() {
  return this._cee;
};

module.exports = ShapeEventEmitter;
