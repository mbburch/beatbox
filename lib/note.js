function Note (board, targetTime) {
  this.board = board;
  this.targetTime = targetTime;
  this.hit = false;
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
    this.size = 15;
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

Note.prototype.render = function (context, column) {
  var x = this.xOffset(column)
  var size = this.size;
  if (this.renderable()) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(x,this.y(),size/2,0,2*Math.PI);
    context.fill();
  }
};

Note.prototype.xOffset = function (column) {
  if (column == "left") {
    return 90;
  } else if (column == "middle") {
    return 180;
  } else {
    return 270;
  }
};

Note.prototype.active = function (column) {
  if (this === this.board.activeNote(column)) {
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
