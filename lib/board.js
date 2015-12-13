const Note = require('./note');
const Column = require('./column');
const _ = require('lodash');

function Board (song) {
  this.started = false;
  this.columns = [];
  this.song = song || {
    columns: [
      {
        button: 106,
        dots: "   .   .  .   .",
      },
      {
        button: 107,
        dots: "  .   . .   .  ",
      },
      {
        button: 108,
        dots: " .   .  .   .  ",
      },
      {
        button: 59,
        dots: ".   .     .   .",
        },
    ],
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
  var self = this;
  self.columns = [];
  self.song.columns.forEach(function (data) {
    xvar += xInterval;

    var dots   = data.dots;
    var button = data.button;
    var column = self.createColumn(dots, timeInterval, button, xvar);
    self.columns.push(column);
  });
  this.endTime = self.getEndTime();
};

Board.prototype.msInterval = function (bpm, hypermeasureLength) {
  var minuteInMs = 60000;
  return (minuteInMs / bpm) / hypermeasureLength;
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
  var button = parseInt(button);
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
  this.drawBoard(context);
  this.columns.forEach(function (column) {
    column.activateNotes();
    column.killNotes();
    column.renderNotes(context);
  });
};

Board.prototype.drawBoard = function (context) {
  context.clearRect(0,0,360,720);
  context.fillStyle = "red";
  context.fillRect(0, 175, 360, 10);
  context.beginPath();
  this.columns.forEach(function (column) {
    var x = column.x;
    context.moveTo(x, 0);
    context.lineTo(x, 720);
    context.stroke();
  });
}

Board.prototype.play = function (button) {
  var column = _.find(this.columns, { inputButton: button });
  var note = column.activeNote();
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
