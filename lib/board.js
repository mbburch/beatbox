const Note = require('./note');
const _ = require('lodash');

function Board (song) {
  this.started = false;
  this.notes = {
    left: [],
    middle: [],
    right: [],
  };
  this.song = song || this.parseSong({
    left:   ". .   . . .   . . .   . . .   . ",
    middle: "",
    right:  "    .  . .  .  .    .  . .  .  .",
    bpm:    120,
    hypermeasureLength: 4,
  });
};

Board.prototype.parseSong = function (song) {
  var offsets = {
    left:   [],
    middle: [],
    right:  [],
  };
  var songBpm = (60000 / song.bpm) / song.hypermeasureLength
  for (var column in offsets) {
    var offset  = 3000;
    for (var i = 0; i < song[column].length; i++) {
      if (song[column][i] == ".") {
        offsets[column].push(offset);
      };
      offset += songBpm;
    };
  }
  return offsets;
};

Board.prototype.start = function () {
  this.started = true;
  this.startTime = Date.now();
  this.buildSong();
};

Board.prototype.activeNote = function (column) {
  var note =  _.find(this.notes[column], { hit: false });
  return note;
};

Board.prototype.play = function (column) {
  var note = this.activeNote(column);
  if (note) {
    note.strike();
  };
};

Board.prototype.end = function () {
  this.started = false;
  return this.score();
};

Board.prototype.ended = function (time) {
  time = time || Date.now();
  var lastNote = this.notes.left[this.notes.left.length - 1];
  if (time >= (lastNote.targetTime + 1000)) {
    return true;
  } else {
    return false;
  }
};

Board.prototype.addNote = function (offset, column) {
  var targetTime = (this.startTime + offset);
  this.notes[column].push(new Note(this, targetTime));
};

Board.prototype.buildSong = function () {
  var self = this;
  for (var column in self.notes) {
    self.song[column].forEach(function(offset) {
      self.addNote(offset, column);
    });
  };
};

Board.prototype.renderNotes = function (context) {
  var self = this;
  for (var column in self.notes) {
    self.notes[column].forEach(function (note) {
      note.active(column);
      note.dead();
      note.render(context, column);
    });
  };
};

Board.prototype.score = function () {
  var sum = 0;
  for (var column in this.notes) {
    this.notes[column].forEach(function (note) {
      sum = sum + note.score || 0;
    });
  };
  return sum;
};

Board.prototype.perfectScore = function () {
  var sum = 0;
  for (var column in this.notes) {
    sum = sum + this.notes[column].length * 3;
  };
  return sum;
};

module.exports = Board;
