const Note   = require('./note');
const Column = require('./column');

function Song (data, bpm, hypermeasureLength) {
  this.timeInterval = this.timeInterval(bpm, hypermeasureLength);
  this.xInterval    = 360 / (data.length + 1);
  this.data    = data;
  this.started = false;
}

Song.prototype.timeInterval = function (bpm, hypermeasureLength) {
  var minuteInMs = 60000;
  return (minuteInMs / bpm) / hypermeasureLength;
};

Song.prototype.start = function () {
  this.started = true;
  this.startTime = Date.now();
  this.createColumns();
  this.endTime = this.getEndTime();
  return true;
};

Song.prototype.stop = function () {
  this.started = false;
};

Song.prototype.createNote = function (offset) {
  var targetTime = (this.startTime + offset);
  return new Note(targetTime);
};

Song.prototype.createColumns = function () {
  var self = this;
  var xval = 0;
  self.columns = self.data.map(function (columnData) {
    xval += self.xInterval;
    return self.createColumn(columnData, xval);
  });
};

Song.prototype.createColumn = function (columnData, xval) {
  var notes = [];
  var offset = 3000;
  for (var i = 0; i < columnData.dots.length; i++) {
    if (columnData.dots[i] === ".") {
      var note = this.createNote(offset);
      notes.push(note);
    }
    offset += this.timeInterval;
  }
  var column = new Column((parseInt(columnData.button)), xval, notes);
  return column;
};

Song.prototype.getNotes = function () {
  var notesOut = [];
  this.columns.forEach(function (column) {
    column.notes.forEach(function (note) {
      notesOut.push(note);
    });
  });
  return notesOut;
};

Song.prototype.play = function (button) {
  var column = _.find(this.columns, { inputButton: button });
  var note = column.activeNote();
  if (note) {
    note.strike();
  }
};

Song.prototype.score = function () {
  return this.getNotes().reduce(function (sum, note) {
    return sum + (note.score || 0);
  }, 0);
};

Song.prototype.perfectScore = function () {
  return this.getNotes().length * 3;
};

Song.prototype.tick = function (context) {
  this.drawBoard(context);
  this.columns.forEach(function (column) {
    column.activateNotes();
    column.killNotes();
    column.renderNotes(context);
  });
  this.end();
};

Song.prototype.drawBoard = function (context) {
  context.clearRect(0,0,360,720);
  context.fillStyle = "red";
  context.fillRect(0, 175, 360, 10);
  context.beginPath();
  this.columns.forEach(function (column) {
    var x = column.x;
    context.moveTo(x, 0);
    context.lineTo(x, 720);
    context.stroke();
    context.font = "40pt VT323";
    context.fillText(String.fromCharCode(column.inputButton), x, 700);
  });
};

Song.prototype.end = function () {
  if (Date.now() > this.endTime) {
    this.stop();
  }
};

Song.prototype.getEndTime = function () {
  var notes = this.getNotes();
  var sortedNotes = _.sortBy(notes, function (note) {
    return note.targetTime;
  });
  var targetTime = _.last(sortedNotes).targetTime;
  var endTime = targetTime + 1000;
  return endTime;
};

module.exports = Song;
