const chai = require('chai');
const assert = chai.assert;

const Board = require('../lib/board');
const Note = require('../lib/note');

describe('Note', function () {

  beforeEach(function () {
    this.board = new Board();
  });


  it('should have an offset', function () {
    let note = new Note(this.board, 5000);
    assert.equal(note.offset, 5000);
  });

  it('shouldn\'t have been hit by default', function () {
    let note = new Note(this.board, 5000);
    assert.equal(note.hit, false);
  });

  it('should be able to be hit', function () {
    let note = new Note(this.board, 5000);
    note.strike(4000);
    assert.equal(note.hit, true);
  });

  it('shouldn\'t have a score by default', function () {
    let note = new Note(this.board, 5000);
    assert.equal(note.score, undefined);
  });

  it('should have a score after being hit', function () {
    let note = new Note(this.board, 5000);
    note.strike(4000);
    assert.equal(note.score, 1000);
  });

  it('should be included in the board\'s array of notes', function () {
    let note = new Note(this.board, 5000);
    assert.include(this.board.notes, note);
    assert.equal(this.board.notes.length, 1);
  });
});
