const chai = require('chai');
const assert = chai.assert;

const Note = require('../lib/note');

describe('Note', function () {
  it('should have an offset', function () {
    let note = new Note(5000);
    assert.equal(note.offset, 5000);
  });

  it('shouldn\'t have been hit by default', function () {
    let note = new Note(5000);
    assert.equal(note.hit, false);
  });

  it('should be able to be hit', function () {
    let note = new Note(5000);
    note.strike(4000);
    assert.equal(note.hit, true);
  });

  it('shouldn\'t have a score by default', function () {
    let note = new Note(5000);
    assert.equal(note.score, undefined);
  });

  it('should have a score after being hit', function () {
    let note = new Note(5000);
    note.strike(4000);
    assert.equal(note.score, 1000);
  });
});
