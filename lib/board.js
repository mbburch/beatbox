const Note = require('./note');

function Board (song) {
  this.started = false;
  this.notes = [];
  this.song = song || [1000, 2000, 3000, 4000, 5000];
};

Board.prototype.start = function () {
  this.started = true;
  this.startTime = Date.now();
  this.buildSong();
};

Board.prototype.ended = function (time) {
  time = time || Date.now();
  var lastNote = this.notes[this.notes.length - 1];
  if (time >= (lastNote.targetTime + 1000)) {
    return true;
  } else {
    return false;
  }
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
