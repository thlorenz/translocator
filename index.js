'use strict';

var go = module.exports = Translocator;

/**
 * Creates a translocator for the given text.
 * 
 * @name translocator
 * @function
 * @param {string} text 
 * @return {Translocator} translocator
 */
function Translocator(text) {
  if (!(this instanceof Translocator)) return new Translocator(text);

  this._length  = text.length;
  this._lines   = text.split('\n');
  this._lengths = this._lines.map(function (l) { return l.length + 1 /* new line */ })
}

var proto = Translocator.prototype;

/**
 * Finds the index in the text that matches the given location.
 * 
 * @name translocator::index
 * @function
 * @throws {Error} when the given location is outside of the text
 * @param {Object} loc location of format: `{ line: number, column: number }`
 * @return {number} the index of the given location in the text
 */
proto.index = function(loc) {

  if (loc.line > this._lines.length) {
    throw new Error('The location line: ' + loc.line + ' column: ' + loc.column + ' is out of bounds for the given text'); 
  }

  var from = 0;
  for (var i = 0; i < loc.line; i++) from += this._lengths[i];

  from += loc.column;
  return from;
}

/**
 * Finds start and end index for the given locations.
 * 
 * @name translocator::range
 * @function
 * @throws {Error} when the given location is outside of the text
 * @param {Object} locs start and end locationx of format: 
 *  `{ start: { line: number, column, number }, end: { line: number, column: number } }`
 * @param {Object} to   end location of format: `{ line: number, column: number }`
 * @return {Arrary.<number>} the range of the locations within the text of format `[ start, end ]`
 */
proto.range = function(locs) {
  return [ this.index(locs.start), this.index(locs.end) ];
}

/**
 * Finds the location of the character in the text at the given index.
 * 
 * @name translocator::location
 * @function
 * @throws {Error} when the given index is outside of the text
 * @param {number} index the index of the character in the text to locate
 * @return {Object} location of format: `{ line: number, column: number }`
 */
proto.location = function(index) {
  if (index > this._length) {
    throw new Error('The index: ' + index + ' is out of bounds for the given text'); 
  }

  var line = 0;
  var currentindex = index;
  var lineLen = this._lengths[line];
  while(currentindex > lineLen){ 
    currentindex -= lineLen;
    lineLen = this._lengths[++line];
  }
  return { line: line, column: currentindex };
}

/**
 * Finds the start and end locations for the given range
 * 
 * @name translocator::locations
 * @function
 * @throws {Error} when the given index is outside of the text
 * @param {Array.<number>} range start and end indexes of the format `[ start, end ]`
 * @return {Object} locations of the format `{ start: { line: number, column, number }, end: { line: number, column: number } }`
 */
proto.locations = function(range) {
  return { start: this.location(range[0]), end: this.location(range[1]) };
}
