pack = new require('jspack').jspack

class RegionHeader
  blockSize: 4096

  constructor: (@buffer) ->

  getChunkOffsets: ->
    chunkLocations = pack.Unpack('1024I', @buffer)
    chunkOffsets = []

    for location, i in chunkLocations
      continue unless location

      byteOffset = (location >> 8) * @blockSize
      chunkOffsets.push byteOffset

    chunkOffsets


module.exports = exports = RegionHeader
