function Note (offset) {
  this.offset = offset;
  this.hit    = false;
};

Note.prototype.strike = function(time) {
  this.hit = true;
  var difference = Math.abs(this.offset - time);
  this.score = difference;
};

module.exports = Note;
