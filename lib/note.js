function Note (board, targetTime) {
  this.board = board;
  this.targetTime = targetTime;
  this.hit = false;
  this.board.notes.push(this);
  this.color = 'black';
  this.size = 10;
};

Note.prototype.strike = function(time) {
  if (this.timeWithin(25)) {
    this.color = 'gold';
    this.size = 20;
    this.score = 3;
  } else if (this.timeWithin(50)) {
    this.color = 'blue';
    this.size = 20;
    this.score = 1;
  } else {
    this.color = 'red';
    this.size = 10;
    this.score = 0;
  };
  this.hit = true;
};

Note.prototype.timeWithin = function (difference) {
  if ((this.targetTime - Date.now()) < difference
      && (this.targetTime - Date.now()) > -difference) {
    return true;
  } else {
    return false;
  };
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

Note.prototype.dead = function (time) {
  var time = time || (Date.now() - 250);
  if (time > this.targetTime) {
    if (this.hit == false) {
      this.strike();
    };
  };
};

module.exports = Note;
