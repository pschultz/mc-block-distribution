events = require 'events'
fs = require 'fs'

RegionHeader = require './region-header'
ChunkReader = require '../chunk-reader'

class RegionReader extends events.EventEmitter
  maxRegionFileSize: 3657728
  chunkOffsets: []

  constructor: ->

  parseFile: (filename) ->
    @regionFile = fs.createReadStream filename
    @region = new Buffer(@maxRegionFileSize)

    @regionFile.on 'data', @onData
    @regionFile.once 'end', @onEnd

  onData: (data) =>
      @region.addChunk(data) # chunk as in part of a buffer

  onEnd: =>
    header = new RegionHeader @region
    @chunkOffsets = header.getChunkOffsets()

    @emit 'parsed'

    for offset in @chunkOffsets
      chunkReader = new ChunkReader @region, offset
      chunkReader.on 'chunk', @onChunk
      chunkReader.parse()

  onChunk: (chunk) =>
    @emit 'chunk', chunk

  getNumberOfChunks: -> @chunkOffsets.length

module.exports = exports = RegionReader
