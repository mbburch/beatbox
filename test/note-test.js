const chai = require('chai');
const assert = chai.assert;

const Board = require('../lib/board');
const Note = require('../lib/note');

describe('Note', function () {

  beforeEach(function () {
    this.board = new Board();
  });


  it('should have an targetTime', function () {
    let note = new Note(this.board, 5000);
    assert.isAbove(note.targetTime, 5000-2);
    assert.isBelow(note.targetTime, 5000+2);
  });

  it('shouldn\'t have been hit by default', function () {
    let note = new Note(this.board, 5000);
    assert.equal(note.hit, false);
  });

  it('should be able to be hit', function () {
    let note = new Note(this.board, 5000);
    note.strike(4000);
    assert.equal(note.hit, true);
  });

  it('shouldn\'t have a score by default', function () {
    let note = new Note(this.board, 5000);
    assert.equal(note.score, undefined);
  });

  it('should have a score after being hit', function () {
    let note = new Note(this.board, Date.now());
    note.strike(20);
    assert.equal(note.score, 3);
  });

  it('should change appearance when hit', function () {
    let note = new Note(this.board, 5000);
    note.strike(4000);
  });

  it('should be included in the board\'s array of notes', function () {
    let note = this.board.addNote(5000, "right");
    assert.include(this.board.notes.right, note);
    assert.equal(this.board.notes.right.length, 1);
  });

  it('generates a y coordinate from time', function () {
    this.board.start();
    let time = (this.board.startTime + 1000)
    let note = new Note(this.board, time);
    assert.isAbove(note.y(), 360-2);
    assert.isBelow(note.y(), 360+2);
  });

  it('generates another y coordinate from time', function () {
    this.board.start();
    let time = (this.board.startTime)
    let note = new Note(this.board, time);
    assert.isAbove(note.y(), 180-2);
    assert.isBelow(note.y(), 180+2);
  });

  it('should know if it should render', function () {
    this.board.start();
    let time = (this.board.startTime + 2500)
    let note = new Note(this.board, time);
    assert.equal(note.renderable(), true);
  });

  it('should know how it should render if active note', function () {
    this.board.start();
    var newNote = new Note(this.board, (Date.now() + 1000));
    this.board.notes.left.unshift(newNote);
    var note = this.board.activeNote("left");
    note.active("left");
    assert.equal(note.size, 15);
  });

  it('should know how it should render if struck', function () {
    this.board.start();
    let time = (this.board.startTime + 20)
    let note = new Note(this.board, time);
    assert.equal(note.color, 'black');
    assert.equal(note.size, 10);
    note.strike();
    assert.equal(note.color, 'gold');
    assert.equal(note.size, 20);
  });

  it('should know how to render if slightly past target', function () {
    this.board.start();
    let time = (this.board.startTime + -300)
    let note = new Note(this.board, time);
    assert.equal(note.renderable(), true);
    note.dead();
    assert.equal(note.color, 'red');
    assert.equal(note.size, 10);
    assert(note.hit);
  });

  it('should know if it shouldn\'t render yet', function () {
    this.board.start();
    let time = (this.board.startTime + 3500);
    let note = new Note(this.board, time);
    assert.equal(note.renderable(), false);
  });

  it('should know if it shouldn\'t render any more', function () {
    this.board.start();
    let time = (this.board.startTime + -1500);
    let note = new Note(this.board, time);
    assert.equal(note.renderable(), false);
  });

  it('should be gold if hit within 25 milliseconds of goal', function () {
    this.board.start();

    let note = new Note(this.board, Date.now() + 20);
    note.strike();
    assert.equal(note.color, 'gold');
    assert.equal(note.score, 3);

    let note_2 = new Note(this.board, Date.now() - 20);
    note_2.strike();
    assert.equal(note_2.color, 'gold');
    assert.equal(note.score, 3);
  });

  it('should be blue if hit within 50 milliseconds of goal', function () {
    this.board.start();

    let note = new Note(this.board, Date.now() + 45);
    note.strike();
    assert.equal(note.color, 'blue');
    assert.equal(note.score, 1);

    let note_2 = new Note(this.board, Date.now() - 45);
    note_2.strike();
    assert.equal(note_2.color, 'blue');
    assert.equal(note.score, 1);
  });

  it('misses if more than 50 milliseconds away from target', function () {
    this.board.start();

    let note = new Note(this.board, Date.now() + 55);
    note.strike();
    assert.equal(note.color, 'red');
    assert.equal(note.score, 0);

    let note_2 = new Note(this.board, Date.now() - 55);
    note_2.strike();
    assert.equal(note_2.color, 'red');
    assert.equal(note.score, 0);
  });

  it('shouldn\'t be killable if already hit', function () {
    this.board.start();

    let note = new Note(this.board, Date.now());
    note.strike();
    note.dead(200);
    assert.equal(note.color, 'gold');
  });
});
