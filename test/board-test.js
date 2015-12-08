const chai = require('chai');
const assert = chai.assert;

const Board = require('../lib/board');

describe('Board', function () {
  it('should know whether the song has started', function () {
    let board = new Board();
    assert.equal(board.started, false);
  });
});
