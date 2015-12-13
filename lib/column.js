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

Column.prototype.activateNotes = function () {
  var note = this.activeNote();
  if (note) {
    note.activate();
  };
};

Column.prototype.killNotes = function () {
  this.notes.forEach(function (note) {
    note.dead();
  });
};

Column.prototype.renderNotes = function (context) {
  var self = this;
  self.notes.forEach(function (note) {
    note.render(self.x, context);
  });
};

module.exports = Column;
