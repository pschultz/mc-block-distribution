var ChunkReader, RegionHeader, RegionReader, events, exports, fs;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

events = require('events');

fs = require('fs');

RegionHeader = require('./region-header');

ChunkReader = require('../chunk-reader');

RegionReader = (function() {

  __extends(RegionReader, events.EventEmitter);

  RegionReader.prototype.maxRegionFileSize = 3657728;

  RegionReader.prototype.chunkOffsets = [];

  function RegionReader() {
    this.onChunk = __bind(this.onChunk, this);
    this.onEnd = __bind(this.onEnd, this);
    this.onData = __bind(this.onData, this);
  }

  RegionReader.prototype.parseFile = function(filename) {
    this.regionFile = fs.createReadStream(filename);
    this.region = new Buffer(this.maxRegionFileSize);
    this.regionFile.on('data', this.onData);
    return this.regionFile.once('end', this.onEnd);
  };

  RegionReader.prototype.onData = function(data) {
    return this.region.addChunk(data);
  };

  RegionReader.prototype.onEnd = function() {
    var chunkReader, header, offset, _i, _len, _ref, _results;
    header = new RegionHeader(this.region);
    this.chunkOffsets = header.getChunkOffsets();
    this.emit('parsed');
    _ref = this.chunkOffsets;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      offset = _ref[_i];
      chunkReader = new ChunkReader(this.region, offset);
      chunkReader.on('chunk', this.onChunk);
      _results.push(chunkReader.parse());
    }
    return _results;
  };

  RegionReader.prototype.onChunk = function(chunk) {
    return this.emit('chunk', chunk);
  };

  RegionReader.prototype.getNumberOfChunks = function() {
    return this.chunkOffsets.length;
  };

  return RegionReader;

})();

module.exports = exports = RegionReader;
