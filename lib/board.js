const Note = require('./note');
const _ = require('lodash');

function Board (song) {
  this.started = false;
  this.notes = {
    left:   [],
    middle: [],
    right:  [],
  };
  this.song = song || {
    left:   ". . .   .   . .",
    middle: "     .   . .   ",
    right:  "      .   .    ",
    bpm:    60,
    hypermeasureLength: 4,
  };
};

Board.prototype.parseSong = function (song) {
  var msInterval = this.msInterval(song.bpm, song.hypermeasureLength);
  for (var column in this.notes) {
    this.notes[column] = this.dotsToNotes(song[column], msInterval);
  }
};

Board.prototype.msInterval = function (bpm, hypermeasureLength) {
  var minuteInMs = 60000;
  return (minuteInMs / bpm) / hypermeasureLength;
};

Board.prototype.dotsToNotes = function (dots, msInterval) {
  var offset = 3000;
  var notes = [];
  for (var i = 0; i < dots.length; i++) {
    if (dots[i] == ".") {
      var note = this.createNote(offset);
      notes.push(note);
    };
    offset += msInterval;
  };
  return notes;
};

Board.prototype.start = function () {
  this.started = true;
  this.startTime = Date.now();
  this.parseSong(this.song);
};

Board.prototype.activeNote = function (column) {
  var note = _.find(this.notes[column], { hit: false });
  if (note) {
    note.activate();
  };
  return note;
};

Board.prototype.play = function (column) {
  var note = this.activeNote(column);
  note.strike();
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

Board.prototype.createNote = function (offset) {
  var targetTime = (this.startTime + offset);
  console.log(this.startTime);
  return new Note(targetTime);
};

Board.prototype.addNote = function (offset, column) {
  var note = this.createNote(offset);
  this.notes[column].push(note);
  return note;
};

Board.prototype.getNotes = function () {
  var notesOut = [];
  for (var column in this.notes) {
    this.notes[column].forEach(function (note) {
      notesOut.push(note);
    });
  };
  return notesOut;
};

Board.prototype.renderNotes = function (context) {
  var self = this;
  for (var column in this.notes) {
    self.notes[column].forEach(function (note) {
      self.activeNote(column)
      note.dead();
      note.render(context, column);
    });
  };
};

Board.prototype.score = function () {
  var sum = 0;
  this.getNotes().forEach(function (note) {
    sum = sum + (note.score || 0);
  });
  return sum;
};

Board.prototype.perfectScore = function () {
  var sum = 0;
  var self = this;
  for (var column in this.notes) {
    sum = sum + (self.notes[column].length * 3);
  };
  return sum;
};

module.exports = Board;
