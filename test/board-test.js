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
    var noteLength = board.getNotes().length;
    board.end();
    board.start();
    assert.equal(board.getNotes().length, noteLength);
    assert.isAbove(noteLength, 1);
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
    board.columns[0].notes[0] = new Note(Date.now() + 20);
    board.columns[0].notes[1] = new Note(Date.now() + 30);
    board.play(board.columns[0].inputButton);
    board.play(board.columns[0].inputButton);
    assert.equal(board.score(), 4)
  });

  it('can get best possible score', function () {
    var sum = board.getNotes().length;
    assert.equal(board.perfectScore(), sum * 3);
  });

  describe('for column', function () {
    it('can create from dots', function () {
      let dots     = ". . . .";
      let interval = 250;
      let button   = 106;
      let xvar     = 90;
      let time     = board.startTime;
      let column   = board.createColumn(dots, interval, button, xvar);

      assert.equal(column.notes[0].targetTime, time + 3000);
    });

    it('can find and hit a note', function () {
      let dots     = ". . . .";
      let interval = 250;
      let button   = 110;
      let xvar     = 90;
      let time     = board.startTime;
      let column   = board.createColumn(dots, interval, button, xvar);
      board.columns.push(column);

      assert.equal(column.notes[0].hit, false);
      board.play(column.inputButton);
      assert.equal(column.notes[0].hit, true);
    });
  });
});
