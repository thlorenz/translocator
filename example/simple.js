'use strict';
var assert = require('assert');

var text = [
    'line0'
  , 'line1'
].join('\n');

var translocator = require('../')(text);

var locations = { start: { line: 0, column: 2 }, end: { line: 1, column: 3 } };
var range     = translocator.range(locations)

console.dir({ range: range, subtext: text.slice(range[0], range[1]) });

assert.deepEqual(translocator.locations(range), locations);
