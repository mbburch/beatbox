const Note   = require('./note');
const Column = require('./column');

function Song (columns, bpm, hypermeasureLength) {
  this.timeInterval = this.timeInterval(bpm, hypermeasureLength);
  this.columns = columns;
  this.started = false;
}

Song.prototype.timeInterval = function (bpm, hypermeasureLength) {
  var minuteInMs = 60000;
  return (minuteInMs / bpm) / hypermeasureLength;
};

Song.prototype.start = function () {
  this.started = true;
  this.startTime = Date.now();
};

Song.prototype.createNote = function (offset) {
  var targetTime = (this.startTime + offset);
  return new Note(targetTime);
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

module.exports = Song;
