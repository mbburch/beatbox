function Note (targetTime) {
  this.targetTime = targetTime;
  this.hit = false;
  this.color = 'black';
  this.size = 10;
}

Note.prototype.strike = function() {
  if (this.timeWithin(25)) {
    this.update('gold', 20, 3);
  } else if (this.timeWithin(50)) {
    this.update('blue', 15, 1);
  } else {
    this.update('red', 10, 0);
  }
  this.hit = true;
};

Note.prototype.update = function (color, size, score) {
  this.color = color;
  this.size  = size;
  this.score = score;
};

Note.prototype.timeWithin = function (difference) {
  if ((this.targetTime - Date.now()) < difference &&
  (this.targetTime - Date.now()) > -difference) {
    return true;
  } else {
    return false;
  }
};

Note.prototype.y = function () {
  var difference = this.targetTime - Date.now();
  var distance   = difference / (1000.0 / 180.0);
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

Note.prototype.render = function (xval, context) {
  var size = this.size;
  if (this.renderable()) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(xval,this.y(),size/2,0,2*Math.PI);
    context.fill();
  }
};

Note.prototype.xOffset = function (column) {
  if (column === "left") {
    return 90;
  } else if (column === "middle") {
    return 180;
  } else {
    return 270;
  }
};

Note.prototype.activate = function () {
  this.size = 15;
};

Note.prototype.dead = function (timeInput) {
  var time = timeInput || (Date.now() - 250);
  if (time > this.targetTime) {
    if (this.hit === false) {
      this.strike();
    }
  }
};

module.exports = Note;
