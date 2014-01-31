'use strict';
/*jshint asi: true */

var test = require('tape')
var text = [
    '0123456'
  , '112345678'
  , '21234'
  , '31234567890'
  ].join('\n')

var locator = require('../')(text);
var inspect = require('util').inspect;

test('index', function (t) {
  [ [ { line: 0, column: 2 }, 2, '2' ] 
  , [ { line: 1, column: 2 }, 10, '2' ] 
  , [ { line: 2, column: 4 }, 22, '4' ] 
  ]
  .forEach(function (x) {
     var loc = x[0], index = x[1], c = x[2];
     var idx = locator.index(loc);
     t.equal(idx, index, inspect(x))
     t.equal(text[idx], c)
  })
  t.end()
})

test('location', function (t) {
  [ [ { line: 0, column: 2 }, 2  ] 
  , [ { line: 1, column: 2 }, 10 ] 
  , [ { line: 2, column: 4 }, 22 ] 
  ]
  .forEach(function (x) {
     var loc = x[0], index = x[1], c = x[2];
     var location = locator.location(index);
     t.deepEqual(location, loc, inspect(x))
  })
  t.end()
})

test('range', function (t) {
  [ [ { line: 0, column: 2 }, { line: 0, column: 3 }, 2, 3, '2' ] 
  , [ { line: 0, column: 2 }, { line: 0, column: 4 }, 2, 4, '23' ] 
  , [ { line: 0, column: 2 }, { line: 1, column: 2 }, 2, 10, '23456\n11' ] 
  , [ { line: 1, column: 3 }, { line: 3, column: 2 }, 11, 26, '345678\n21234\n31' ] 
  ]
  .forEach(function (x) {
     var loc1 = x[0], loc2 = x[1], r1 = x[2], r2 = x[3], s = x[4];
     var range = locator.range({ start: loc1, end: loc2 });

     t.deepEqual(range, [ r1, r2], inspect(x))
     t.equal(text.slice(range[0], range[1]), s)
  })
  t.end()
})

test('locations', function (t) {
  [ [ { line: 0, column: 2 }, { line: 0, column: 3 }, 2, 3   ] 
  , [ { line: 0, column: 2 }, { line: 0, column: 4 }, 2, 4   ] 
  , [ { line: 0, column: 2 }, { line: 1, column: 2 }, 2, 10  ] 
  , [ { line: 1, column: 3 }, { line: 3, column: 2 }, 11, 26 ] 
  ]
  .forEach(function (x) {
     var loc1 = x[0], loc2 = x[1], r1 = x[2], r2 = x[3];
     var locs = locator.locations([r1, r2 ]);

     t.deepEqual(locs, { start: loc1, end: loc2 }, inspect(x))
  })
  t.end()
})

test('roundtrip range -> locations', function (t) {
  [ [ { line: 0, column: 2 }, { line: 0, column: 3 }, 2, 3   ] 
  , [ { line: 0, column: 2 }, { line: 0, column: 4 }, 2, 4   ] 
  , [ { line: 0, column: 2 }, { line: 1, column: 2 }, 2, 10  ] 
  , [ { line: 1, column: 3 }, { line: 3, column: 2 }, 11, 26 ] 
  ]
  .forEach(function (x) {
     var loc1 = x[0], loc2 = x[1], r1 = x[2], r2 = x[3];

     var locs = locator.locations([r1, r2 ])
     var range = locator.range(locs); 

     t.deepEqual(range, [ r1, r2 ], inspect(x))
  })
  t.end()
  
})

test('roundtrip index -> location', function (t) {
  [ [ { line: 0, column: 2 }, 2  ] 
  , [ { line: 1, column: 2 }, 10 ] 
  , [ { line: 2, column: 4 }, 22 ] 
  ]
  .forEach(function (x) {
     var loc = x[0], index = x[1], c = x[2];
     var location = locator.location(index);
     var idx = locator.index(location);
     t.equal(idx, index, inspect(x))
  })
  t.end()
})
