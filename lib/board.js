const Note = require('./note');

function Board () {
  this.started = false;
  this.notes = [];
};

Board.prototype.start = function () {
  this.started = true;
  this.startTime = Date.now();
};

Board.prototype.addNote = function (offset) {
  return new Note(this, offset);
};

module.exports = Board;
