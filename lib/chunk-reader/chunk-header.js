var ChunkHeader, exports, pack;

pack = new require('jspack').jspack;

ChunkHeader = (function() {

  ChunkHeader.prototype.length = 5;

  function ChunkHeader(buffer, offset) {
    this.buffer = buffer;
    this.offset = offset;
  }

  ChunkHeader.prototype.getChunkLength = function() {
    return pack.Unpack('I', this.buffer, this.offset)[0] - 1;
  };

  return ChunkHeader;

})();

module.exports = exports = ChunkHeader;
