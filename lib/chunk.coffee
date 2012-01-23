Block = require './block'

class Chunk
  maxY: 127

  blocksPerChunk: 32768

  blocks: []

  constructor: (@nbtStruct) ->

  getBlocks: ->
    @readBlocks() unless @blocks.length
    @blocks


  readBlocks: ->
    for blockIndex in [0...@blocksPerChunk]
      dataValue = @nbtStruct.Level.Blocks[blockIndex]
      chunkCoodinates = @blockIndexToChunkCoordinates blockIndex

      @blocks.push new Block @, dataValue, chunkCoodinates


  blockIndexToChunkCoordinates: (index) ->
    y: index % 128


module.exports = exports = Chunk
