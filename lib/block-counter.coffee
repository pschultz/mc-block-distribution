Block = require './block'
Chunk = require './chunk'

class BlockCounter
  result: {}

  constructor: ->
    @reset()

  reset: ->
    @result = {}

    for v in [0...Block::maxDataValue]
      @result[v] = {}
      for y in [0...Chunk::maxY]
        @result[v][y] = 0

  count: (blocks, cb) ->
    self = @
    blocks.forEach (block) ->
      ++self.result[block.value()][block.y()]
    cb()

module.exports = exports = BlockCounter
