class ConsoleProgressIndicator

  constructor: (@progressTracker) ->
    @progressTracker.on 'update', @onUpdate
    @progressTracker.once 'finish', @onFinish


  onUpdate: (status) =>
    process.stderr.write "\r#{status.done}/#{status.total}"


  onFinish: =>
    @progressTracker.removeListener 'update', @onUpdate
    process.stderr.write "\n"


module.exports = exports = ConsoleProgressIndicator
