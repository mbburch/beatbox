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
});
