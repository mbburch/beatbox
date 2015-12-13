const chai = require('chai');
const assert = chai.assert;
const _ = require('lodash');

const Board = require('../lib/board');
const Column = require('../lib/column');
const Note = require('../lib/note');

let column;
let note;
before(function () {
  note = new Note(Date.now() + 1000);
  var note_2 = new Note(Date.now() + 2000);
  var note_3 = new Note(Date.now() + 3000);
  var notes = [note, note_2, note_3];
  column = new Column(106, 90, notes);
});

describe('Column', function () {
  it('has an input button', function () {
    assert.equal(106, column.inputButton);
  });

  it('has a x varible', function () {
    assert.equal(90, column.x);
  });

  it('can have notes', function () {
    assert.equal(note, column.notes[0])
  });
});
