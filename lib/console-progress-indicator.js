var ConsoleProgressIndicator, exports;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

ConsoleProgressIndicator = (function() {

  function ConsoleProgressIndicator(progressTracker) {
    this.progressTracker = progressTracker;
    this.onFinish = __bind(this.onFinish, this);
    this.onUpdate = __bind(this.onUpdate, this);
    this.progressTracker.on('update', this.onUpdate);
    this.progressTracker.once('finish', this.onFinish);
  }

  ConsoleProgressIndicator.prototype.onUpdate = function(status) {
    return process.stderr.write("\r" + status.done + "/" + status.total);
  };

  ConsoleProgressIndicator.prototype.onFinish = function() {
    this.progressTracker.removeListener('update', this.onUpdate);
    return process.stderr.write("\n");
  };

  return ConsoleProgressIndicator;

})();

module.exports = exports = ConsoleProgressIndicator;
