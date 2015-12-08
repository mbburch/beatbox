function Board () {
  this.started = false;
};

Board.prototype.start = function () {
  this.started = true;
  this.startTime = Date.now();
};

module.exports = Board;
