var Block, exports;

Block = (function() {

  Block.prototype.maxDataValue = 0xff;

  function Block(chunk, dataValue, coordinates) {
    this.chunk = chunk;
    this.dataValue = dataValue;
    this.coordinates = coordinates;
  }

  Block.prototype.value = function() {
    return this.dataValue;
  };

  Block.prototype.chunkX = function() {
    throw "not yet implemented";
  };

  Block.prototype.chunkY = function() {
    return this.coordinates.y;
  };

  Block.prototype.chunkZ = function() {
    throw "not yet implemented";
  };

  Block.prototype.x = function() {
    return this.worldX();
  };

  Block.prototype.y = function() {
    return this.worldY();
  };

  Block.prototype.z = function() {
    return this.worldZ();
  };

  Block.prototype.worldX = function() {
    throw "not yet implemented";
  };

  Block.prototype.worldY = function() {
    return this.chunkY();
  };

  Block.prototype.worldZ = function() {
    throw "not yet implemented";
  };

  return Block;

})();

module.exports = exports = Block;
