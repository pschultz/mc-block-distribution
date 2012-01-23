var Block, BlockCounter, Chunk, exports;

Block = require('./block');

Chunk = require('./chunk');

BlockCounter = (function() {

  BlockCounter.prototype.result = {};

  function BlockCounter() {
    this.reset();
  }

  BlockCounter.prototype.reset = function() {
    var v, y, _ref, _results;
    this.result = {};
    _results = [];
    for (v = 0, _ref = Block.prototype.maxDataValue; 0 <= _ref ? v < _ref : v > _ref; 0 <= _ref ? v++ : v--) {
      this.result[v] = {};
      _results.push((function() {
        var _ref2, _results2;
        _results2 = [];
        for (y = 0, _ref2 = Chunk.prototype.maxY; 0 <= _ref2 ? y < _ref2 : y > _ref2; 0 <= _ref2 ? y++ : y--) {
          _results2.push(this.result[v][y] = 0);
        }
        return _results2;
      }).call(this));
    }
    return _results;
  };

  BlockCounter.prototype.count = function(blocks, cb) {
    var self;
    self = this;
    blocks.forEach(function(block) {
      return ++self.result[block.value()][block.y()];
    });
    return cb();
  };

  return BlockCounter;

})();

module.exports = exports = BlockCounter;
