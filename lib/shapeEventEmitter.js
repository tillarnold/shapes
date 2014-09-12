var Vector = require('./vector.js');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

/**
 *
 * @constructor
 */
var ShapeEventEmitter = function ShapeEventEmitter(shape, canvasEventEmitter) {
  var that = this;
  
  ['click','mousedown','mouseup','mousemove'].forEach(function(elem){
    canvasEventEmitter.on(elem,function(e){
      if (shape.contains([e.x,e.y])) {
        that.emit(elem,{
          x:e.x,
          y:e.y,
          vector: new Vector(e.x,e.y),
          type: elem,
          target: e.target,
          event: e.event
        });
      }
    });
  });
};
util.inherits(ShapeEventEmitter, EventEmitter);

module.exports =  ShapeEventEmitter;
