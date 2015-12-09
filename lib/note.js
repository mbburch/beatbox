function Note (board, offset) {
  this.board = board;
  this.offset = offset;
  this.hit = false;
  this.board.notes.push(this);
};

Note.prototype.strike = function(time) {
  this.hit = true;
  var difference = Math.abs(this.offset - time);
  this.score = difference;
};

module.exports = Note;
