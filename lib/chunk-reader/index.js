var Chunk, ChunkHeader, ChunkReader, events, exports, nbt, zlib;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

events = require('events');

zlib = require('zlib');

nbt = require('../nbt');

ChunkHeader = require('./chunk-header');

Chunk = require('../chunk');

ChunkReader = (function() {

  __extends(ChunkReader, events.EventEmitter);

  function ChunkReader(regionBuffer, offset) {
    this.regionBuffer = regionBuffer;
    this.offset = offset;
    this.parse = __bind(this.parse, this);
    this.header = new ChunkHeader(this.regionBuffer, this.offset);
  }

  ChunkReader.prototype.parse = function() {
    this.length = this.header.getChunkLength();
    this.chunkBuffer = new Buffer(this.length);
    this.regionBuffer.copy(this.chunkBuffer, 0, this.offset + ChunkHeader.prototype.length, this.offset + this.length);
    return this.extractAndParse();
  };

  ChunkReader.prototype.extractAndParse = function() {
    var self;
    self = this;
    return zlib.unzip(this.chunkBuffer, function(err, buffer) {
      return nbt.parse(buffer, function(err, chunkStruct) {
        return self.emit('chunk', new Chunk(chunkStruct));
      });
    });
  };

  return ChunkReader;

})();

module.exports = exports = ChunkReader;
