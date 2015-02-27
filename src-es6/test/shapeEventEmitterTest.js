'use strict';
var test = require('tape');

var shapes = require('..');
var EventEmitter = require('events').EventEmitter;

var Rect = shapes.Rectangle;
var ShapeEventEmitter = shapes.ShapeEventEmitter;

test('ShapeEventEmitter emit events', function(t) {
  t.plan(4);

  var r = new Rect([10, 10], 100, 100);
  var cee = new EventEmitter();
  var see = new ShapeEventEmitter(r, cee);

  see.on('click', function(e) {
    t.equal(e.type, 'click');
  });

  see.on('mousedown', function(e) {
    t.equal(e.type, 'mousedown');
  });

  see.on('mouseup', function(e) {
    t.equal(e.type, 'mouseup');
  });

  see.on('mousemove', function(e) {
    t.equal(e.type, 'mousemove');
  });

  var eventClick = {
    x: 50,
    y: 50
  };
  cee.emit('click', eventClick);
  cee.emit('mousemove', eventClick);
  cee.emit('mousedown', eventClick);
  cee.emit('mouseup', eventClick);
});

test('ShapeEventEmitter filter events', function(t) {
  var r = new Rect([10, 10], 100, 100);
  var cee = new EventEmitter();
  var see = new ShapeEventEmitter(r, cee);

  see.on('click', function() {
    t.fail('called event listener for click');
  });

  see.on('mousedown', function() {
    t.fail('called event listener for mousedown');
  });

  var eventClick = {
    x: 800,
    y: 50
  };

  cee.emit('click', eventClick);
  cee.emit('mousedown', eventClick);
  t.end();
});

test('ShapeEventEmitter mouseover and mouseout', function(t) {
  var r = new Rect([10, 10], 100, 100);
  var cee = new EventEmitter();
  var see = new ShapeEventEmitter(r, cee);

  var overs = 0;
  var outs = 0;

  t.plan(6);

  see.on('mouseover', function(e) {
    t.equal(e.type, 'mouseover');
    overs++;
  });

  see.on('mouseout', function(e) {
    t.equal(e.type, 'mouseout');
    outs++;
  });

  cee.emit('mousemove', {
    x: 50,
    y: 50
  });
  cee.emit('mousemove', {
    x: 500,
    y: 50
  });
  cee.emit('mousemove', {
    x: 50,
    y: 60
  });
  cee.emit('mouseout', {});
  cee.emit('mouseout', {});

  t.equal(overs, 2);
  t.equal(outs, 2);
});

test('ShapeEventEmitter mouseover and mouseout', function(t) {
  var r = new Rect([10, 10], 100, 100);
  var cee = new EventEmitter();
  var see = new ShapeEventEmitter(r, cee);

  t.plan(1);

  t.equal(cee, see.getCanvasEventEmitter());
});

test('preventDefault', function(t) {
  t.plan(1);

  var r = new Rect([10, 10], 100, 100);

  var cee = new EventEmitter();
  var see = new ShapeEventEmitter(r, cee);

  see.on('mousemove', function(e) {
    e.preventDefault();
  });

  cee.emit('mousemove', {
    x: 30,
    y: 70,
    preventDefault: function() {
      t.pass();
    }
  });


});
