'use strict';

var shape = require('..');

var ShapeEventEmitter = shape.ShapeEventEmitter;
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

document.body.appendChild(canvas);
canvas.style.outline = '1px solid black';


var circle = new shape.Circle([10, 10], 50);
var see = new ShapeEventEmitter(circle, canvas);


var colorSwitch = true;
see.on('click', function(){
  colorSwitch = !colorSwitch;
  ctx.fillStyle = colorSwitch ? 'red' : 'blue';

  circle.fill(ctx);
});

circle.stroke(ctx);
