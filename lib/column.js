const Note = require('./note');
const Board = require('./board');
const _ = require('lodash');

function Column (inputButton, x, notes) {
  this.inputButton = inputButton;
  this.x           = x;
  this.notes       = notes;
};

Column.prototype.activeNote = function () {
  return _.find(this.notes, { hit: false });
};

module.exports = Column;
