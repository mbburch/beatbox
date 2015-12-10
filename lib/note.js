function Note (board, targetTime) {
  this.board = board;
  this.targetTime = targetTime;
  this.hit = false;
  this.board.notes.push(this);
  this.color = 'black';
  this.size = 10;
};

Note.prototype.strike = function(time) {
  console.log("hit");
  this.hit = true;
  this.color = 'blue';
  this.size = 20;
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
  var size = this.size;
  var correction = (size)/2;
  if (this.renderable()) {
      context.fillStyle = this.color;
      context.fillRect(180-correction, this.y()-correction, size, size);
  }
};

module.exports = Note;
