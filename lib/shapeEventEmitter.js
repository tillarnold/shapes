'use strict';

var Vector = require('./vector.js');
var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');
/**
 *
 * @constructor
 * @param {Shape} shape - The shape whose `contains` method will be used
 * @param {EventEmitter} canvasEventEmitter - The emitter whose events will be filtered
 */
var ShapeEventEmitter = function ShapeEventEmitter(shape, canvasEventEmitter) {
  var that = this;
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
          event: e.event
        });

        if (move && !that._mouseEntered) {
          that.emit('mouseover', {
            type: 'mouseover',
            target: e.target,
            event: e.event
          });
          that._mouseEntered = true;
        }
      }
      else if (move && that._mouseEntered) {
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

module.exports = ShapeEventEmitter;
