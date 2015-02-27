"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Vector = require("./vector.js");

var _require = require("events");

var EventEmitter = _require.EventEmitter;

var _require2 = require("canvas-utils");

var createCanvasEventEmitter = _require2.createCanvasEventEmitter;
var MapObject = require("es6-map");

var canvasEventEmitterMap = new MapObject();

module.exports = (function (EventEmitter) {
  /**
   *
   * @constructor
   * @param {Shape} shape - The shape whose `contains` method will be used
   * @param {EventEmitter | CanvasEventEmitter} canvasReference - The emitter whose events will be filtered
   *                                                              or an canvasElement
   */

  function ShapeEventEmitter(shape, canvasReference) {
    var _this = this;

    _classCallCheck(this, ShapeEventEmitter);

    if (typeof HTMLCanvasElement !== "undefined" && canvasReference instanceof HTMLCanvasElement) {
      if (canvasEventEmitterMap.has(canvasReference)) {
        this._cee = canvasEventEmitterMap.get(canvasReference);
      } else {
        var newEmitter = createCanvasEventEmitter(canvasReference);
        this._cee = newEmitter;
        canvasEventEmitterMap.set(canvasReference, newEmitter);
      }
    } else {
      this._cee = canvasReference;
    }

    var canvasEventEmitter = this._cee;

    this._mouseEntered = false;

    canvasEventEmitter.on("mouseout", function (e) {
      if (_this._mouseEntered) {
        _this.emit("mouseout", { type: "mouseout",
          target: e.target,
          event: e.event
        });

        _this._mouseEntered = false;
      }
    });

    ["click", "mousedown", "mouseup", "mousemove"].forEach(function (elem) {
      canvasEventEmitter.on(elem, function (e) {
        var move = elem === "mousemove";
        var x = e.x;
        var y = e.y;
        var event = e.event;
        var target = e.target;
        var button = e.button;

        if (shape.contains([x, y])) {
          _this.emit(elem, { x: x,
            y: y,
            vector: new Vector(x, y),
            type: elem,
            target: target,
            event: event,
            button: button,
            preventDefault: function () {
              return e.preventDefault();
            }
          });

          if (move && !_this._mouseEntered) {
            _this.emit("mouseover", { type: "mouseover",
              target: target,
              event: event
            });

            _this._mouseEntered = true;
          }
        } else if (move && _this._mouseEntered) {

          _this.emit("mouseout", { type: "mouseout",
            target: target,
            event: event
          });

          _this._mouseEntered = false;
        }
      });
    });
  }

  _inherits(ShapeEventEmitter, EventEmitter);

  _prototypeProperties(ShapeEventEmitter, null, {
    getCanvasEventEmitter: {
      value: function getCanvasEventEmitter() {
        return this._cee;
      },
      writable: true,
      configurable: true
    }
  });

  return ShapeEventEmitter;
})(EventEmitter);