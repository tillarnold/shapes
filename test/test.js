var test = require('tape');

var shapes = require('..');
var Vector = shapes.Vector;
var Rect = shapes.Rectangle;
var Circle = shapes.Circle;
var Polygon = shapes.Polygon;


require('./rectangleTest.js');
require('./circleTest.js');
require('./vectorTest.js');
require('./polygonTest.js');
