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

Note.prototype.y = function () {
  var difference = this.targetTime - Date.now();
  var distance   = difference / (1000.0 / 180.0)
  return distance + 180;
};

Note.prototype.renderable = function () {
  var difference = this.targetTime - Date.now();
  if (difference > 3000) {
    return false;
  } else if (difference < -1000) {
    return false;
  } else {
    return true;
  }
};

Note.prototype.render = function (context) {
  if (this.renderable()) {
    context.fillRect(175,this.y()-5,10,10);
  }
};

module.exports = Note;
