const Note = require('./note');
const _ = require('lodash');

function Board (song) {
  this.started = false;
  this.notes = [];
  this.song = song || [
    3000, 3500,
    4000, 4250, 4500,
    5000, 5250, 5500, 5750,
    6250, 6500,
  ];
};

Board.prototype.start = function () {
  this.started = true;
  this.startTime = Date.now();
  this.buildSong();
};

Board.prototype.activeNote = function () {
  var note =  _.find(this.notes, { hit: false });
  return note;
};

Board.prototype.play = function () {
  // need to make specific to each note x coord
  var note = this.activeNote();
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
  var self = this;
  this.notes = [];
  return (self.song).forEach(function(offset) {
    self.addNote(offset);
  });
};

Board.prototype.renderNotes = function (context) {
  var self = this;
  self.notes.forEach(function (note) {
    note.active();
    note.dead();
    note.render(context);
  });
};

Board.prototype.score = function () {
  var n = 0;
  this.notes.forEach(function (note) {
    n += note.score || 0;
  });
  return n;
};

Board.prototype.perfectScore = function () {
  return this.notes.length * 3;
};

module.exports = Board;
