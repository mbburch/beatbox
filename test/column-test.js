const chai = require('chai');
const assert = chai.assert;
const _ = require('lodash');

const Board = require('../lib/board');
const Column = require('../lib/column');
const Note = require('../lib/note');

describe('Column', function () {
  it('has an input button', function () {
    var column = new Column(106);
    assert.equal(106, column.inputButton);
  });

  it('has a x varible', function () {
    var column = new Column(106, 90);
    assert.equal(90, column.x);
  });

  it('can have notes', function () {
    var note_1 = new Note(Date.now() + 1000);
    var note_2 = new Note(Date.now() + 2000);
    var note_3 = new Note(Date.now() + 3000);
    var notes = [note_1, note_2, note_3];
    var column = new Column(106, 90, notes);
    assert.equal(note_1, column.notes[0])
  });
});
