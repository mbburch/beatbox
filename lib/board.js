const Note = require('./note');
const Column = require('./column');
const _ = require('lodash');

function Board (song) {
  this.started = false;
  this.columns = [];
  this.song = song || {
    columns: {
      106: ". . .   .   . .",
      107: "     .   . .   ",
      108: "      .   .    ",
    },
    bpm: 60,
    hypermeasureLength: 4,
  };
};

Board.prototype.parseSong = function (song) {
  let width        = 360;
  let columnLength = Object.keys(this.song.columns).length;
  let xInterval    = width / (columnLength + 1);
  var xvar = 0;
  var timeInterval = this.msInterval(song.bpm, song.hypermeasureLength);
  this.columns = [];
  for (var button in this.song.columns) {
    xvar += xInterval;
    var dots = this.song.columns[button];
    var column = this.createColumn(dots, timeInterval, button, xvar);
    this.columns.push(column);
  }
  this.endTime = this.getEndTime();
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

Board.prototype.createColumn = function (dots, interval, button, xvar) {
  var notes = []
  var offset = 3000;
  for (var i = 0; i < dots.length; i++) {
    if (dots[i] == ".") {
      var note = this.createNote(offset);
      notes.push(note);
    };
    offset += interval;
  };
  var column = new Column(button, xvar, notes);
  return column;
};

Board.prototype.createNote = function (offset) {
  var targetTime = (this.startTime + offset);
  return new Note(targetTime);
};


Board.prototype.start = function () {
  this.started = true;
  this.startTime = Date.now();
  this.parseSong(this.song);
};

Board.prototype.tick = function (context) {
  for (var column in this.notes) {
    this.activateNotes(column);
    this.killNotes(column);
    this.renderNotes(column, context);
  };
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


Board.prototype.activateNotes = function (column) {
  var note = this.activeNote(column);
  if (note) {
    note.activate();
  };
};

Board.prototype.killNotes = function (column) {
  this.notes[column].forEach(function (note) {
    note.dead();
  });
};

Board.prototype.renderNotes = function (column, context) {
  this.notes[column].forEach(function (note) {
    note.render(column, context);
  });
};


Board.prototype.ended = function (time) {
  time = time || Date.now();
  if (time >= this.endTime) {
    return true;
  } else {
    return false;
  }
};

Board.prototype.getEndTime = function () {
  var notes = this.getNotes();
  var notes = _.sortBy(notes, function (note) {
    return note.targetTime;
  });
  var targetTime = _.last(notes).targetTime;
  var endTime = targetTime + 1000;
  return endTime;
};

Board.prototype.getNotes = function () {
  var notesOut = [];
  for (var i = 0; i < this.columns.length; i++) {
    var column = this.columns[i];
    column.notes.forEach(function (note) {
      notesOut.push(note);
    });
  };
  return notesOut;
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
  this.getNotes().map(function (note) {
    sum += 3;
  });
  return sum;
};

module.exports = Board;
