events = require 'events'
zlib = require 'zlib'
nbt = require '../nbt'


ChunkHeader = require './chunk-header'
Chunk = require '../chunk'

class ChunkReader extends events.EventEmitter

  constructor: (@regionBuffer, @offset) ->
    @header = new ChunkHeader @regionBuffer, @offset


  parse: =>
    @length = @header.getChunkLength()
    @chunkBuffer = new Buffer(@length)
    @regionBuffer.copy(@chunkBuffer, 0, @offset + ChunkHeader::length, @offset + @length)

    @extractAndParse()


  extractAndParse: ->
    self = @
    zlib.unzip @chunkBuffer, (err, buffer) ->
      nbt.parse buffer, (err, chunkStruct) ->
        self.emit 'chunk', new Chunk chunkStruct


module.exports = exports = ChunkReader
