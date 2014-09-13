# shapes
[![Code Climate](https://codeclimate.com/github/tillarnold/shapes/badges/gpa.svg)](https://codeclimate.com/github/tillarnold/shapes)
[![Build Status](https://travis-ci.org/tillarnold/shapes.svg?branch=master)](https://travis-ci.org/tillarnold/shapes)
[![devDependency Status](https://david-dm.org/tillarnold/shapes/dev-status.svg)](https://david-dm.org/tillarnold/shapes#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/tillarnold/shapes/badge.png?branch=master)](https://coveralls.io/r/tillarnold/shapes?branch=master)

A shapes library for JavaScript

```js
var rc = reuqire('random-color');
var shapes = reuqire('shapes');


var CanvasEventEmitter = require('canvas-utils').CanvasEventEmitter;
var ShapeEventEmitter = shapes.ShapeEventEmitter;
var Circle = shapes.Circle;

var canvas  =  document.getElementById('c');
var ctx = canvas.getContext('2d');


var myCanvasEmitter = new CanvasEventEmitter(canvas);

var myShape = new Circle([200,200],50);

var myShapeEmitter = new ShapeEventEmitter(myShape,myCanvasEmitter);

myShape.stroke(ctx);

myShapeEmitter.on("click",function(){
  ctx.fillStyle = rc(); //get a random color
  myShape.fill(ctx);
});

```
## Release History
* 2014-09-13   v0.0.2   Fixed circle constructor bug.
* 2014-09-13   v0.0.1   Initial version.
