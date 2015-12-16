const chai = require('chai');
const assert = chai.assert;

const Song = require('../lib/song');
const Column = require('../lib/column');
const Note   = require('../lib/note');

let song;

beforeEach(function () {
  var column_1 = { button: 106, dots: ". . .   " };
  var column_2 = { button: 107, dots: " . . ..." };
  var columns = [column_1, column_2];
  song = new Song(columns, 120, 2);
});

describe('Song', function () {
  it('has a bpm', function () {
    assert.equal(120, song.bpm);
  });
});
