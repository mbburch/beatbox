const chai = require('chai');
const assert = chai.assert;

const Board = require('../lib/board');
const Note = require('../lib/note');

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
    board.start();
    assert.equal(board.notes.length, 11);
    board.end();
    board.start();
    assert.equal(board.notes.length, 11);
    assert.isArray(board.notes);
  });

  it('should instantiate with a song array of offsets', function () {
    let board = new Board();
    assert.isArray(board.song);
    assert.isAbove(board.song.length, 0);
  });

  describe('addNote', function () {

    it('creates target time from offset', function () {
      let board = new Board();
      board.start();
      let note = board.addNote(1000);
      var targetTime = (board.startTime + 1000);
      assert.isAbove(note.targetTime, targetTime-2);
      assert.isBelow(note.targetTime, targetTime+2);
    });

    it('can create a note for each offset in song array', function () {
      let board = new Board();
      let songLength = board.song.length;
      board.start();
      assert.isAbove(board.notes.length, 0);
      assert.equal(board.notes.length, songLength);
      console.log(board.notes, board.notes[0].targetTime, board.song);
    });

    it('should be able to add a note to note array', function () {
      let board = new Board();
      let note = board.addNote(1000);
      assert.include(board.notes, note);
    });

  });

  it('can find and hit a note', function () {
    let board = new Board();
    board.start();
    assert.equal(board.notes[0].hit, false);
    board.play();
    assert.equal(board.notes[0].hit, true);
  });

  it('can determine that game has not ended', function () {
    let board = new Board();
    board.start();
    assert.equal(board.ended(), false);
  });

  it('can determine that game has ended', function () {
    let board = new Board();
    board.start();
    var endedTime = board.startTime + 10000;
    assert.equal(board.ended(endedTime), true);
  });

  it('can get total score', function () {
    let board = new Board();
    var note = new Note(board, Date.now() + 20);
    var note_2 = new Note(board, Date.now() + 30);
    note.strike();
    note_2.strike();
    assert.equal(board.score(), 4)
  });
});
