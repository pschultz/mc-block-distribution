require 'bufferjs/add-chunk'
fs = require 'fs'
path = require 'path'
pack = new require('jspack').jspack

regionFile = fs.createReadStream path.join __dirname, 'region', 'r.0.0.mcr'

region = new Buffer(3657728)

regionFile.on 'data', (data) ->
  region.addChunk(data)

regionFile.on 'end', ->
  chunkOffsets = []
  chunkLocations = pack.Unpack('1024I', region)
  for o in chunkLocations
    chunkOffsets.push o if o
