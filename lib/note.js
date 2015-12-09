function Note (targetTime) {
  this.targetTime = targetTime;
  this.hit        = false;
};

Note.prototype.strike = function(time) {
  this.hit = true;
  var difference = Math.abs(this.targetTime - time);
  this.score = difference;
};

module.exports = Note;
