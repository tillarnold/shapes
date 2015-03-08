let test = require('tape')
  , { Polygon } = require('..');

test('Polygon#contains', function(t) {
  t.plan(2);
  let p1 = new Polygon([ [10, 10]
                       , [10, 20]
                       , [20, 20]
                       , [20, 10]
                       ]);

  t.equals(p1.contains([15, 15]), true);
  t.equals(p1.contains([21, 15]), false);
});

test('Polygon#getCentroid', function(t) {
  t.plan(2);
  let p1 = new Polygon([ [10, 10]
                       , [10, 30]
                       , [20, 30]
                       , [20, 10]
                       ])
    , center = p1.getCentroid();

  t.equals(center.x, 15);
  t.equals(center.y, 20);
});

test('Polygon#round', (t) => {
  t.plan(1);

  let p0 = new Polygon([ [10, 10]
                       , [10, 20]
                       , [20, 20]
                       , [20, 10]
                       ])
    , p1 = new Polygon([ [9.5, 9.6]
                       , [10.4, 20.3]
                       , [19.7, 19.6]
                       , [20.333, 9.7]
                       ])
    , p2 = p1.round();

    t.deepEqual(p2.vectors, p0.vectors);
});


test('Polygon#moveBy', (t) => {
  t.plan(1);

  let p0 = new Polygon([ [15, 11]
                       , [15, 21]
                       , [25, 21]
                       , [25, 11]
                       ])
    , p1 = new Polygon([ [10, 10]
                       , [10, 20]
                       , [20, 20]
                       , [20, 10]
                       ])
    , p2 = p1.moveBy([5, 1]);

  t.deepEqual(p2.vectors, p0.vectors);
});
