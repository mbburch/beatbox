const chai = require('chai');
const assert = chai.assert;

const Song = require('../lib/song');
const Column = require('../lib/column');
const Note   = require('../lib/note');

let column_1;
let column_2;
let song;

beforeEach(function () {
  column_1 = { button: 106, dots: ". . .   " };
  column_2 = { button: 107, dots: " . . ..." };
  let columns = [column_1, column_2];
  song = new Song(columns, 60, 4);
});

describe('Song', function () {
  it('can get time interval', function () {
    assert.equal(250, song.timeInterval);
  });

  it('should know whether the song has started', function () {
    assert.equal(song.started, false);
  });

  it('can start', function () {
    assert.equal(song.started, false);
    song.start();
    assert.equal(song.started, true);
  });

  it('knows the start time', function () {
    var now = Date.now();
    song.start();
    assert.isAbove(song.startTime, now - 1);
    assert.isBelow(song.startTime - 100, now);
  });

  it('can create note', function () {
    song.start();
    let note = song.createNote(1000);
    var targetTime = (Date.now() + 1000);
    assert.isAbove(note.targetTime, targetTime-2);
    assert.isBelow(note.targetTime, targetTime+2);
  });

  it('can create column', function () {
    song.start();
    let columnData = { button: 59, dots: ". . . ." };
    let column     = song.createColumn(columnData);

    assert.equal(column.notes[0].targetTime, song.startTime + 3000);
    assert.equal(column.notes[1].targetTime, song.startTime + 3500);
  });
});
