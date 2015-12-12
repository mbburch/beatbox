const chai = require('chai');
const assert = chai.assert;
const _ = require('lodash');

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

  it('shouldn\'t keep notes between games', function () {
    let board = new Board();
    board.start();
    var noteLength = board.notes.left.length;
    board.end();
    board.start();
    assert.equal(board.notes.left.length, noteLength);
    assert.isAbove(noteLength, 1);
  });

  describe('addNote', function () {

    it('creates target time from offset', function () {
      let board = new Board();
      board.start();
      let note = board.addNote(1000, "left");
      var targetTime = (board.startTime + 1000);
      assert.isAbove(note.targetTime, targetTime-2);
      assert.isBelow(note.targetTime, targetTime+2);
    });

    it('can create a note for each offset in song array', function () {
      let board = new Board();
      let leftSongLength = board.song.left.replace(/\s/g, '').length;
      let middleSongLength = board.song.middle.replace(/\s/g, '').length;
      let rightSongLength = board.song.right.replace(/\s/g, '').length;
      board.start();
      assert.isAbove(board.notes.left.length, 0);
      assert.isAbove(board.notes.middle.length, 0);
      assert.isAbove(board.notes.right.length, 0);
      assert.equal(board.notes.left.length, leftSongLength);
      assert.equal(board.notes.middle.length, middleSongLength);
      assert.equal(board.notes.right.length, rightSongLength);
    });

    it('should be able to add a note to note array', function () {
      let board = new Board();
      let note = board.addNote(1000, "left");
      assert.include(board.notes.left, note);
    });

  });

  it('can find and hit a note', function () {
    let board = new Board();
    board.start();
    assert.equal(board.notes.left[0].hit, false);
    board.play("left");
    assert.equal(board.notes.left[0].hit, true);
  });

  it('can determine that game has not ended', function () {
    let board = new Board();
    board.start();
    assert.equal(board.ended(), false);
  });

  it('can determine that game has ended', function () {
    let board = new Board();
    board.start();
    var endedTime = Date.now() + 10000;
    assert.equal(board.ended(endedTime), true);
  });

  it('can get total score', function () {
    let board = new Board();
    board.start();
    board.notes.left[0] = new Note(Date.now() + 20);
    board.notes.left[0].strike();
    assert.equal(board.score(), 3)
  });

  it('can get best possible score', function () {
    let board = new Board();
    var sum = board.notes.left.length;
    sum += board.notes.middle.length;
    sum += board.notes.right.length;
    assert.equal(board.perfectScore(), sum * 3);
  });

  it('should make notes active if they are first in line', function () {
    let board = new Board();
    board.start();
    let note = board.activeNote("left");
    assert.equal(note.size, 15);
  });
});
