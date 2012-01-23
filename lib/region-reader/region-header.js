var RegionHeader, exports, pack;

pack = new require('jspack').jspack;

RegionHeader = (function() {

  RegionHeader.prototype.blockSize = 4096;

  function RegionHeader(buffer) {
    this.buffer = buffer;
  }

  RegionHeader.prototype.getChunkOffsets = function() {
    var byteOffset, chunkLocations, chunkOffsets, i, location, _len;
    chunkLocations = pack.Unpack('1024I', this.buffer);
    chunkOffsets = [];
    for (i = 0, _len = chunkLocations.length; i < _len; i++) {
      location = chunkLocations[i];
      if (!location) continue;
      byteOffset = (location >> 8) * this.blockSize;
      chunkOffsets.push(byteOffset);
    }
    return chunkOffsets;
  };

  return RegionHeader;

})();

module.exports = exports = RegionHeader;
