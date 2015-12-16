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

Song.prototype.createColumn = function (columnData) {
};

module.exports = Song;
