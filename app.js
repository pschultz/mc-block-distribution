var fs, pack, path, region, regionFile;

require('bufferjs/add-chunk');

fs = require('fs');

path = require('path');

pack = new require('jspack').jspack;

regionFile = fs.createReadStream(path.join(__dirname, 'region', 'r.0.0.mcr'));

region = new Buffer(3657728);

regionFile.on('data', function(data) {
  return region.addChunk(data);
});

regionFile.on('end', function() {
  var chunkLocations, chunkOffsets, o, _i, _len, _results;
  chunkOffsets = [];
  chunkLocations = pack.Unpack('1024I', region);
  _results = [];
  for (_i = 0, _len = chunkLocations.length; _i < _len; _i++) {
    o = chunkLocations[_i];
    if (o) {
      _results.push(chunkOffsets.push(o));
    } else {
      _results.push(void 0);
    }
  }
  return _results;
});
