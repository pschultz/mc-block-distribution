pack = new require('jspack').jspack

class ChunkHeader
  length: 5

  constructor: (@buffer, @offset) ->

  getChunkLength: ->
    pack.Unpack('I', @buffer, @offset)[0] - 1

module.exports = exports = ChunkHeader
