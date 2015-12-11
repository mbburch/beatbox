function Note (board, targetTime) {
  this.board = board;
  this.targetTime = targetTime;
  this.hit = false;
  this.board.notes.push(this);
  this.color = 'black';
  this.size = 10;
};

Note.prototype.strike = function(time) {
  if (this.timeWithin(25, time)) {
    this.color = 'gold';
    this.score = 3;
  } else {
    this.color = 'blue';
    this.score = 1;
  }
  this.hit = true;
  this.size = 20;
  var time = time || Date.now();
  var difference = Math.abs(this.targetTime - time);
};

Note.prototype.timeWithin = function (difference, time) {
  return true;
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

Note.prototype.active = function () {
  if (this === this.board.activeNote()) {
    this.color = 'green';
    this.size = 15;
  }

};

Note.prototype.dead = function () {
  var time = time || (Date.now() - 200);
  if (time > this.targetTime) {
    this.color = 'gray';
    this.size = 10;
    this.hit = 'dead';
  }
};

module.exports = Note;
