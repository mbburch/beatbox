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
    setTimeout (function () {
      board.start();
      assert.isAbove(board.startTime, now);
      assert.isBelow(board.startTime - 100, now);
    }, 1);
  });
});
