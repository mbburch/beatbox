const Note = require('./note');
const Board = require('./board');
const _ = require('lodash');

function Column (inputButton) {
  this.inputButton = inputButton;
};

module.exports = Column;
