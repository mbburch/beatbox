const Song = require('./song');
const Column = require('./column');
const Note = require('./note');
const _ = require('lodash');

function Board (song) {
  this.songsData = [
    {
        data: [
        {
          button: 106,
          dots: ". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ",
        },
        {
          button: 107,
          dots: ".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ",
        },
        {
          button: 108,
          dots: " . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .",
        }
      ],
      bpm: 120,
      hypermeasureLegth: 1,
      startOffset: 80,
      trackName: "120bpm",
    }, {
      data: [
        { button: 104, dots: "-----------.---------------.---------------.---------------.---\
-----------.---------------.---------------.---------------\
.-.---.-.-.---.-.-.---.-.-.---.-.-.---.-.-.---.-.-.---.-.-.-" },
        { button: 106, dots: "-.---.---.---.---.---.---.---.---.---.---.---.---.---.---.---.-\
-.---.---.---.---.---.---.---.---.---.---.---.---.---.---.-\
------------------------------------------------------------" },
        { button: 107, dots: "---.---------------.---------------.---------------.-----------\
---.---------------.---------------.---------------.-------\
------------------------------------------------------------" },
        { button: 108, dots: "-------.---------------.---------------.---------------.-------\
-------.---------------.---------------.---------------.---\
-------.-------.-------.-------.-------.-------.-------.----" },
        { button: 59,  dots: "---------------------------------------------------------------\
-----------------------------------------------------------\
----.-------.-------.-------.-------.-------.-------.-------" },
      ],
      bpm: 179,
      hypermeasureLegth: 4,
      startOffset: 40,
      trackName: "180bpm",
    }
  ];
}

Board.prototype.generateSongs = function () {
  this.songs = this.songsData.map (function (songData) {
    return new Song(songData.data, songData.bpm, songData.hypermeasureLegth, songData.startOffset, songData.trackName);
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
  if (! this.currentSong()) {
    return song.start();
  };
};

Board.prototype.stop = function (song) {
  song.stop();
};

Board.prototype.play = function (input) {
  if (this.currentSong()) {
    this.currentSong().play(input);
  }
};

module.exports = Board;
