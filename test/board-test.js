const chai = require('chai');
const assert = chai.assert;

const Board = require('../lib/board');
const Note = require('../lib/note');

let board;

before(function () {
  board = new Board();
});

describe('Board', function () {
  it('can generate a song', function () {
    board.generateSongs();
    board.startSong(board.songs[0]);
    assert.equal(board.songs[0].startTime, Date.now());
  });

  it('can tell that no song has start by default', function () {
    board.generateSongs();
    assert.notOk(board.currentSong());
  });
});
