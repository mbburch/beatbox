function Note (board, targetTime) {
  this.board = board;
  this.targetTime = targetTime;
  this.hit = false;
  this.board.notes.push(this);
};

Note.prototype.strike = function(time) {
  this.hit = true;
  var time = time || Date.now();
  var difference = Math.abs(this.targetTime - time);
  this.score = difference;
};

module.exports = Note;
