const Note   = require('./note');
const Column = require('./column');

function Song (data, bpm, hypermeasureLength) {
  this.timeInterval = this.timeInterval(bpm, hypermeasureLength);
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
};

Song.prototype.createNote = function (offset) {
  var targetTime = (this.startTime + offset);
  return new Note(targetTime);
};

Song.prototype.createColumns = function () {
  var self = this;
  this.columns = this.data.map(function (columnData) {
    return self.createColumn(columnData);
  });
};

Song.prototype.createColumn = function (columnData) {
  var notes = [];
  var offset = 3000;
  for (var i = 0; i < columnData.dots.length; i++) {
    if (columnData.dots[i] === ".") {
      var note = this.createNote(offset);
      notes.push(note);
    }
    offset += this.timeInterval;
  }
  var column = new Column((parseInt(columnData.button)), columnData.xvar, notes);
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

module.exports = Song;
