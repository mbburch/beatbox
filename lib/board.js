const Note = require('./note');

function Board () {
  this.started = false;
  this.notes = [];
  this.song = [1000, 2000, 3000, 4000, 5000];
};

Board.prototype.start = function () {
  this.started = true;
  this.startTime = Date.now();
};

Board.prototype.addNote = function (offset) {
  var targetTime = (this.startTime + offset);
  return new Note(this, targetTime);
};

Board.prototype.buildSong = function () {
  var self = this
  return (self.song).forEach(function(offset) {
    self.addNote(offset);
  });
};

module.exports = Board;
