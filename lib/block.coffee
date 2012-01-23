class Block
  maxDataValue: 0xff

  constructor: (@chunk, @dataValue, @coordinates) ->

  value: -> @dataValue

  chunkX: -> throw "not yet implemented"
  chunkY: -> @coordinates.y
  chunkZ: -> throw "not yet implemented"

  x: -> @worldX()
  y: -> @worldY()
  z: -> @worldZ()

  worldX: -> throw "not yet implemented"
  worldY: -> @chunkY()
  worldZ: -> throw "not yet implemented"


module.exports = exports = Block
