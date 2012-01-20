var afterParse, blockCount, blockSize, chunks, d, eyes, fs, nBlocksParsed, nBlocksToParse, nbt, pack, path, region, regionFile, y, zlib;

require('bufferjs/add-chunk');

fs = require('fs');

path = require('path');

pack = new require('jspack').jspack;

zlib = require('zlib');

nbt = require('./lib/nbt');

eyes = require('eyes');

regionFile = fs.createReadStream(path.join(__dirname, 'region', 'r.0.0.mcr'));

region = new Buffer(3657728);

regionFile.on('data', function(data) {
  return region.addChunk(data);
});

blockSize = 4096;

chunks = [];

blockCount = {};

for (d = 0; 0 <= 0xff ? d < 0xff : d > 0xff; 0 <= 0xff ? d++ : d--) {
  blockCount[d] = {};
  for (y = 0; y <= 128; y++) {
    blockCount[d][y] = 0;
  }
}

nBlocksToParse = 0;

nBlocksParsed = 0;

afterParse = function() {
  ++nBlocksParsed;
  process.stderr.write("\r" + nBlocksParsed + "/" + nBlocksToParse);
  if (nBlocksParsed >= nBlocksToParse) {
    process.stdout.write(JSON.stringify(blockCount));
    return process.exit();
  }
};

regionFile.once('end', function() {
  var byteOffset, chunk, chunkBodyLength, chunkHeaderLength, chunkLengthInBytes, chunkLocations, chunkOffsets, chunkStart, i, location, nBlocks, nonEmptyChunkLocations, _len, _len2, _results;
  chunkOffsets = [];
  chunkLocations = pack.Unpack('1024I', region);
  nonEmptyChunkLocations = [];
  for (i = 0, _len = chunkLocations.length; i < _len; i++) {
    location = chunkLocations[i];
    if (!location) continue;
    nonEmptyChunkLocations.push(location);
  }
  nBlocksToParse = nonEmptyChunkLocations.length;
  _results = [];
  for (i = 0, _len2 = nonEmptyChunkLocations.length; i < _len2; i++) {
    location = nonEmptyChunkLocations[i];
    byteOffset = (location >> 8) * blockSize;
    nBlocks = location & 255;
    chunkStart = byteOffset;
    chunkLengthInBytes = nBlocks * blockSize;
    chunkHeaderLength = 5;
    chunk = {
      header: new Buffer(chunkHeaderLength)
    };
    region.copy(chunk.header, 0, chunkStart, chunkStart + chunkHeaderLength);
    chunkBodyLength = pack.Unpack('I', chunk.header)[0] - 1;
    chunk.body = new Buffer(chunkBodyLength);
    region.copy(chunk.body, 0, chunkStart + chunkHeaderLength, chunkStart + chunkBodyLength);
    _results.push(zlib.unzip(chunk.body, function(e, b) {
      return nbt.parse(b, function(e, data) {
        var dataValue, j;
        for (j = 0; j < 32768; j++) {
          dataValue = data.Level.Blocks[j];
          y = j % 128;
          blockCount[dataValue][y]++;
        }
        return afterParse();
      });
    }));
  }
  return _results;
});
