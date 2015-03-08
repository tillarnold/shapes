let test = require('tape')
  , { Rectangle: Rect, Vector} = require('..');

test('Rectangle constructor', (t) => {
  t.plan(4);
  let r = new Rect(new Vector(44, 66), 32, 45);
  t.equal(r.width, 32);
  t.equal(r.height, 45);

  let r2 = new Rect([10, 100], 0, 0);
  t.equal(r2.point.x, 10);
  t.equal(r2.point.y, 100);
});

test('Rectangle#round', (t) => {
  t.plan(4);
  let r = new Rect(new Vector(33.4, 2.1), 44.7, 88.9999).round();

  t.equal(r.point.x, 33);
  t.equal(r.point.y, 2);
  t.equal(r.width, 45);
  t.equal(r.height, 89);
});

test('Rectangle#contains', (t) => {
  t.plan(2);
  let r = new Rect([10, 10], 100, 20);

  t.equals(r.contains([20, 15]), true);
  t.equals(r.contains([200, 21]), false);
});

test('Rectangle#moveBy', (t) => {
  t.plan(2);
  let r = new Rect([100, 30], 5, 5)
    , r2 = r.moveBy([11, 1]);

  t.equals(r2.point.x, 111);
  t.equals(r2.point.y, 31);
});

test('Rectangle#path', (t) => {
  t.plan(2);
  let moves = 0
    , lines = 0
    , mockCtx = { moveTo() { moves++; }
                , lineTo() { lines++; }
                }
    , r = new Rect([100, 30], 5, 5);

  r.path(mockCtx);
  t.equals(lines, 4);
  t.equals(moves, 1);
});
