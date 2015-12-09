const chai = require('chai');
const assert = chai.assert;

const Board = require('../lib/board');

describe('Board', function () {
  it('should know whether the song has started', function () {
    let board = new Board();
    assert.equal(board.started, false);
  });

  it('can start', function () {
    let board = new Board();
    board.start();
    assert.equal(board.started, true);
  });

  it('knows the start time', function () {
    let board = new Board();
    var now = Date.now();
    board.start();
    assert.isAbove(board.startTime, now - 1);
    assert.isBelow(board.startTime - 100, now);
  });

  it('should start out with an empty array of notes', function () {
    let board = new Board();
    assert.isArray(board.notes);
  });

  describe('addNote', function () {

    it('creates target time from offset', function () {
      let board = new Board();
      board.start();
      let note = board.addNote(1000);
      var targetTime = (board.startTime + 1000);
      assert.equal(note.targetTime, targetTime);
    });

    it('should be able to add a note to note array', function () {
      let board = new Board();
      let note = board.addNote(1000);
      assert.include(board.notes, note);
    });

  });

});
