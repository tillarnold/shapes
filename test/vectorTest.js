'use strict';
var test = require('tape');

var shapes = require('..');
var Vector = shapes.Vector;

test('Vector constructor', function(t) {
  t.plan(5);

  var p = new Vector(400, 42);
  t.equal(p.x, 400);
  t.equal(p.y, 42);

  t.throws(function(){
    new Vector({},[]);
  });

  t.throws(function(){
    new Vector('tt',new Date());
  });

  t.throws(function(){
    new Vector(t,6);
  });
});


test('Vector#add', function(t) {
  t.plan(4);
  var p = new Vector(144, 333);
  var p2 = p.add([33, 9]);
  t.equal(p2.x, 177);
  t.equal(p2.y, 342);

  var p3 = p2.add(new Vector(-30, -10));
  t.equal(p3.x, 147);
  t.equal(p3.y, 332);
});


test('Vector#subtract', function(t) {
  t.plan(6);
  var p = new Vector(300, 200);
  var p2 = p.subtract([20, 30]);
  t.equal(p2.x, 280);
  t.equal(p2.y, 170);

  var p3 = p2.subtract(new Vector(-30, -10));
  t.equal(p3.x, 310);
  t.equal(p3.y, 180);

  var p4 = p.subtract(100, 30);
  t.equal(p4.x, 200);
  t.equal(p4.y, 170);
});

test('Vector#isBetween', function(t) {
  t.plan(4);
  var pM = new Vector(10, 20);
  var p1 = new Vector(10, 30);
  var p2 = new Vector(10, 10);

  t.equal(pM.isBetween(p1,p2), true);
  t.equal(pM.isBetween(p1,p2), true);

  t.equal(p1.isBetween(pM,p2), false);
  t.equal(p2.isBetween(pM,p1), false);
});

test('Vector#dotProduct', function(t) {
  t.plan(3);
  var a = new Vector(-6, 8);
  var b = new Vector(5, 12);

  var dotProduct1 = a.dotProduct(b);
  var dotProduct2 = b.dotProduct(a);

  t.equal(dotProduct1, dotProduct2);

  t.equal(dotProduct1, 66);
  t.equal(dotProduct2, 66);
});


test('Vector#distaceTo', function(t) {
  t.plan(3);
  var p1 = new Vector(10, 50);
  var p2 = new Vector(10, 60);
  var p4 = new Vector(20, 60);
  t.equals(p1.distanceTo(p2), 10);
  t.equals(p1.distanceTo([20, 50]), 10);
  t.equals(Math.round(p1.distanceTo(p4)), 14);
});


test('Vector#getAngle', function(t) {
  t.plan(2);
  var v = new Vector(10, 0);
  t.equals(v.getAngle(), 0);

  var v2 = new Vector(10, 10);
  t.equals(Math.round(v2.getAngle()), 1);
});


test('Vector#midpoint', function(t) {
  t.plan(2);
  var v = new Vector(10, 10);
  var m = v.midpoint([10, 20]);
  t.equals(m.x, 10);
  t.equals(m.y, 15);

});


test('Vector#getMagnitude', function(t) {
  t.plan(1);

  var v = new Vector(0, 10);
  t.equals(v.getMagnitude(), 10);
});


test('Vector#fromAngle', function(t) {
  t.plan(2);

  var v = Vector.fromAngle(0, 10);
  t.equals(v.x, 10);
  t.equals(v.y, 0);

});


test('Vector#makeVector', function(t) {
  t.plan(1);
  t.throws(function() {
    Vector.makeVector({});
  });
});
