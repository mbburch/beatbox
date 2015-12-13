const chai = require('chai');
const assert = chai.assert;
const _ = require('lodash');

const Board = require('../lib/board');
const Column = require('../lib/column');
const Note = require('../lib/note');

describe('Column', function () {
  it('has an input button', function () {
    var column = new Column(106);
    assert.equal(106, column.inputButton);
  });
});
