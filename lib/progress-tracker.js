var ProgressTracker, events, exports;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

events = require('events');

ProgressTracker = (function() {

  __extends(ProgressTracker, events.EventEmitter);

  ProgressTracker.prototype._total = 0;

  ProgressTracker.prototype._done = 0;

  ProgressTracker.prototype.autofinish = true;

  function ProgressTracker(_total) {
    this._total = _total != null ? _total : 0;
  }

  ProgressTracker.prototype.total = function() {
    return this._total;
  };

  ProgressTracker.prototype.done = function() {
    return this._done;
  };

  ProgressTracker.prototype.todo = function() {
    return this._total - this._done;
  };

  ProgressTracker.prototype.addOneItem = function() {
    return this.addNItems(1);
  };

  ProgressTracker.prototype.addNItems = function(n) {
    this._total += n;
    return this.emitUpdate();
  };

  ProgressTracker.prototype.oneItemDone = function() {
    return this.nItemsDone(1);
  };

  ProgressTracker.prototype.nItemsDone = function(n) {
    this._done += n;
    return this.emitUpdate();
  };

  ProgressTracker.prototype.emitUpdate = function() {
    var todo;
    todo = this.todo();
    this.emit('update', {
      total: this._total,
      done: this._done,
      todo: todo
    });
    if (this.autofinish && this._total && todo <= 0) return this.emit('finish');
  };

  return ProgressTracker;

})();

module.exports = exports = ProgressTracker;
