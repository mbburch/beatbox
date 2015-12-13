const chai = require('chai');
const assert = chai.assert;
const _ = require('lodash');

const Board = require('../lib/board');
const Note = require('../lib/note');

let board;

before(function () {
  board = new Board();
});

describe('Board', function () {
  it('should know whether the song has started', function () {
    assert.equal(board.started, false);
  });

  it('can start', function () {
    board.start();
    assert.equal(board.started, true);
  });

  it('knows the start time', function () {
    var now = Date.now();
    board.start();
    assert.isAbove(board.startTime, now - 1);
    assert.isBelow(board.startTime - 100, now);
  });

  it('shouldn\'t keep notes between games', function () {
    board.start();
    var noteLength = board.notes.left.length;
    board.end();
    board.start();
    assert.equal(board.notes.left.length, noteLength);
    assert.isAbove(noteLength, 1);
  });

  it('creates an array of notes for each column', function () {
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

  describe('createNote', function () {
    it('creates a note from offset', function () {
      board.start();
      let note = board.createNote(1000);
      var targetTime = (Date.now() + 1000);
      assert.isAbove(note.targetTime, targetTime-2);
      assert.isBelow(note.targetTime, targetTime+2);
    });
  });

  it('can find and hit a note', function () {
    board.start();
    assert.equal(board.notes.left[0].hit, false);
    board.play("left");
    assert.equal(board.notes.left[0].hit, true);
  });

  it('can determine that game has not ended', function () {
    board.start();
    assert.equal(board.ended(), false);
  });

  it('can determine that game has ended', function () {
    board.start();
    var endedTime = Date.now() + 10000;
    assert.equal(board.ended(endedTime), true);
  });

  it('can get total score', function () {
    board.start();
    board.notes.left[0] = new Note(Date.now() + 20);
    board.notes.left[0].strike();
    assert.equal(board.score(), 3)
  });

  it('can get best possible score', function () {
    var sum = board.notes.left.length;
    sum += board.notes.middle.length;
    sum += board.notes.right.length;
    assert.equal(board.perfectScore(), sum * 3);
  });

  it('should make notes active if they are first in line', function () {
    board.start();
    let note = board.notes["left"][0];
    board.activateNotes("left");
    assert.equal(note.size, 15);
  });

  describe('creating columns', function () {
    it('can create from dots', function () {
      let dots     = ". . . .";
      let interval = 250;
      let button   = 106;
      let xvar     = 90;
      let time     = board.startTime;
      let column = board.createColumn(dots, interval, button, xvar);
      assert.equal(column.notes[0].targetTime, time + 3000);
    });
  });
});
