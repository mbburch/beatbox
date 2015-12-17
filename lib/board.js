const Song = require('./song');
const Column = require('./column');
const Note = require('./note');
const _ = require('lodash');

function Board (song) {
  this.songsData = [
    {
      data: [
        { button: 106, dots: ". . .   " },
        { button: 107, dots: " . . ..." },
      ],
      bpm: 60,
      hypermeasureLegth: 4,
    }, {
      data: [
        { button: 97,  dots: ". .   . . .   . " },
        { button: 115, dots: "    .  . .  .  ." },
      ],
      bpm: 180,
      hypermeasureLegth: 2,
    }
  ];
}

Board.prototype.generateSongs = function () {
  this.songs = this.songsData.map (function (songData) {
    return new Song(songData.data, songData.bpm, songData.hypermeasureLength);
  });
};

Board.prototype.startSong = function (song) {
  song.start();
};

Board.prototype.currentSong = function () {
  return _.find(this.songs, function (song) {
    return song.started == true;
  });
};

Board.prototype.start = function (song) {
  song.start();
};

Board.prototype.stop = function (song) {
  song.stop();
};

module.exports = Board;
