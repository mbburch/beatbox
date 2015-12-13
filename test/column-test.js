const chai = require('chai');
const assert = chai.assert;
const _ = require('lodash');

const Board = require('../lib/board');
const Column = require('../lib/column');
const Note = require('../lib/note');

let column;
let note_1;
let note_2;
let note_3;

before(function () {
  note_1 = new Note(Date.now() + 1000);
  note_2 = new Note(Date.now() + 2000);
  note_3 = new Note(Date.now() + 3000);
  var notes = [note_1, note_2, note_3];
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
    assert.equal(note_1, column.notes[0])
  });

  it('can get active note', function () {
    assert.equal(column.activeNote(), note_1);
    note_1.strike();
    assert.equal(column.activeNote(), note_2);
  });
});
