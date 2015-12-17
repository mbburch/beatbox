const Board = require("./board");

let board = new Board();
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  ctx.fillStyle = "Black";
  ctx.font = "10pt Arial";
  ctx.fillText("Sorry! This game is not mobile compatible.", 40, 150);
  alert("This game is not mobile compatible. Try it on your computer!");
}

function game (song) {
  if (! board.currentSong()) {
    var track = document.getElementById(song.trackName);
    track.play();
    setTimeout (function () {
      board.start(song);
      requestAnimationFrame(function gameLoop() {
        if (board.currentSong()) {
          song.tick(ctx);
          renderScore(song);
          requestAnimationFrame(gameLoop);
        } else {
          board.stop(song);
          track.pause();
          track.currentTime = 0;
          endGame();
          renderScore(song);
          document.getElementById('beats').pause();
        }
      }, 16);
    }, song.startOffset);
  }
}

function endGame () {
  ctx.clearRect(0,0,360,720);
  var imageObj = new Image();

  imageObj.onload = function() {
    ctx.drawImage(imageObj, 40, 250);
  };
  imageObj.src = './images/gesture.png';
  ctx.fillStyle = "Black";
  ctx.font = "50pt VT323";
  ctx.fillText("GAME OVER", 60, 150);
}

function renderScore (song) {
  var bestscore = localStorage.getItem(song.trackName + "bestscore");
  song.highscore(bestscore);
  document.getElementById("score").innerHTML = "Score: " + song.score() + "/" + song.perfectScore();
  document.getElementById("highscore").innerHTML = "High Score: " + parseInt(bestscore);
}

function keyPressHandler(event) {
  var keyPressed = event.keyCode;
  board.play(keyPressed);
}

function loadSongs() {
  document.addEventListener('keypress', keyPressHandler, false);
  board.generateSongs();
  var game1 = document.getElementById('song-1');
  var game2 = document.getElementById('song-2');
  game1.addEventListener('click', function () { game(board.songs[0]); });
  game2.addEventListener('click', function () { game(board.songs[1]); });
}

loadSongs();
