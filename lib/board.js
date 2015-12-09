const Note = require('./note');

function Board () {
  this.started = false;
};

Board.prototype.start = function () {
  this.started = true;
  this.startTime = Date.now();
};

Board.prototype.newNote = function (targetTime) {
  var time = this.startTime + targetTime;
  var note = new Note(time);
  return note;
};

module.exports = Board;
