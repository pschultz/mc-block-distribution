var Block, Chunk, exports;

Block = require('./block');

Chunk = (function() {

  Chunk.prototype.maxY = 127;

  Chunk.prototype.blocksPerChunk = 32768;

  Chunk.prototype.blocks = [];

  function Chunk(nbtStruct) {
    this.nbtStruct = nbtStruct;
  }

  Chunk.prototype.getBlocks = function() {
    if (!this.blocks.length) this.readBlocks();
    return this.blocks;
  };

  Chunk.prototype.readBlocks = function() {
    var blockIndex, chunkCoodinates, dataValue, _ref, _results;
    _results = [];
    for (blockIndex = 0, _ref = this.blocksPerChunk; 0 <= _ref ? blockIndex < _ref : blockIndex > _ref; 0 <= _ref ? blockIndex++ : blockIndex--) {
      dataValue = this.nbtStruct.Level.Blocks[blockIndex];
      chunkCoodinates = this.blockIndexToChunkCoordinates(blockIndex);
      _results.push(this.blocks.push(new Block(this, dataValue, chunkCoodinates)));
    }
    return _results;
  };

  Chunk.prototype.blockIndexToChunkCoordinates = function(index) {
    return {
      y: index % 128
    };
  };

  return Chunk;

})();

module.exports = exports = Chunk;
