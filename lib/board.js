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

Board.prototype.activeNote = function (column) {
  return _.find(this.notes[column], { hit: false });
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
  for (var column in this.notes) {
    this.notes[column].forEach(function (note) {
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
