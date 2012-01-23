require 'bufferjs/add-chunk'
fs = require 'fs'
path = require 'path'
pack = new require('jspack').jspack
zlib = require 'zlib'
nbt = require './lib/nbt'
eyes = require 'eyes'


regionFilename = path.join __dirname, 'region', 'r.0.0.mcr'

regionReader = new (require './lib/region-reader')
ChunkReader = require './lib/chunk-reader'

progressTracker = new (require './lib/progress-tracker')
progressIndicator = new (require './lib/console-progress-indicator') progressTracker

blockCounter = new (require './lib/block-counter')


progressTracker.on 'finish', ->
  process.stdout.write JSON.stringify blockCounter.result
  process.exit()

###
blockCount = {}
for d in [0...0xff]
  blockCount[d] = {}
  for y in [0..128]
    blockCount[d][y] = 0
###

regionReader.on 'parsed', ->
  progressTracker.addNItems regionReader.getNumberOfChunks()


regionReader.on 'chunk', (chunk) ->

  blocks = chunk.getBlocks()
  blockCounter.count blocks, ->
    progressTracker.oneItemDone()


regionReader.parseFile regionFilename

if 0
  regionFile = fs.createReadStream regionFilename

  region = new Buffer(3657728)

  regionFile.on 'data', (data) ->
    region.addChunk(data)

  blockSize = 4096
  chunks = []

  blockCount = {}
  for d in [0...0xff]
    blockCount[d] = {}
    for y in [0..128]
      blockCount[d][y] = 0

  nBlocksToParse = 0
  nBlocksParsed = 0
  afterParse = ->
    ++nBlocksParsed
    process.stderr.write "\r#{nBlocksParsed}/#{nBlocksToParse}"

    if nBlocksParsed >= nBlocksToParse
      process.stdout.write JSON.stringify blockCount
      process.exit()

  regionFile.once 'end', ->
    chunkOffsets = []
    chunkLocations = pack.Unpack('1024I', region)
    nonEmptyChunkLocations = []
    for location, i in chunkLocations
      continue unless location
      nonEmptyChunkLocations.push location

    nBlocksToParse = nonEmptyChunkLocations.length

    for location, i in nonEmptyChunkLocations
      byteOffset = (location >> 8) * blockSize
      nBlocks = location & 255

      chunkStart = byteOffset

      chunkLengthInBytes = nBlocks * blockSize
      chunkHeaderLength = 5

      chunk = header: new Buffer(chunkHeaderLength)
      region.copy(chunk.header, 0, chunkStart, chunkStart + chunkHeaderLength)

      chunkBodyLength = pack.Unpack('I', chunk.header)[0] - 1

      chunk.body = new Buffer(chunkBodyLength)
      region.copy(chunk.body, 0, chunkStart + chunkHeaderLength, chunkStart + chunkBodyLength)

      zlib.unzip chunk.body, (e, b) ->
        nbt.parse b, (e, data) ->
          for j in [0...32768]
            dataValue = data.Level.Blocks[j]
            y = j % 128
            blockCount[dataValue][y]++

          afterParse()
