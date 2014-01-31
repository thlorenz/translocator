'use strict';

var go = module.exports = Lorange;

function Lorange(text) {
  if (!(this instanceof Lorange)) return new Lorange(text);

  this._length  = text.length;
  this._lines   = text.split('\n');
  this._lengths = this._lines.map(function (l) { return l.length + 1 /* new line */ })
}

var proto = Lorange.prototype;

proto.spot = function(loc) {

  if (loc.line > this._lines.length) {
    throw new Error('The location line: ' + loc.line + ' column: ' + loc.column + ' is out of bounds for the given text'); 
  }

  var from = 0;
  for (var i = 0; i < loc.line; i++) from += this._lengths[i];

  from += loc.column;
  return from;
}

proto.range = function(from, to) {
  return [ this.spot(from), this.spot(to) ];
}

proto.location = function(spot) {
  if (spot > this._length) {
    throw new Error('The spot: ' + spot + ' is out of bounds for the given text'); 
  }

  var line = 0;
  var currentSpot = spot;
  var lineLen = this._lengths[line];
  while(currentSpot > lineLen){ 
    currentSpot -= lineLen;
    lineLen = this._lengths[++line];
  }
  return { line: line, column: currentSpot };
}

proto.locations = function(range) {
  return { start: this.location(range[0]), end: this.location(range[1]) };
}
