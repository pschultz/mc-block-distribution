events = require 'events'

class ProgressTracker extends events.EventEmitter

  _total: 0
  _done: 0

  autofinish: true

  constructor: (@_total = 0) ->

  total: -> @_total
  done: -> @_done
  todo: -> @_total - @_done

  addOneItem: ->
    @addNItems 1

  addNItems: (n) ->
    @_total += n
    @emitUpdate()


  oneItemDone: ->
    @nItemsDone 1


  nItemsDone: (n) ->
    @_done += n
    @emitUpdate()


  emitUpdate: ->
    todo = @todo()

    @emit 'update', total: @_total, done: @_done, todo: todo

    @emit 'finish' if @autofinish and @_total and todo <= 0



module.exports = exports = ProgressTracker
