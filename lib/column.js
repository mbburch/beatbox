const Note = require('./note');
const Board = require('./board');
const _ = require('lodash');

function Column (inputButton, x) {
  this.inputButton = inputButton;
  this.x = x;
};

module.exports = Column;
