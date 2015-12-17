const Board = require("./board");

let board = new Board();
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

function game (song) {
  if (board.start(song)) {
    requestAnimationFrame(function gameLoop() {
      if (board.currentSong()) {
        song.tick(ctx);
        renderScore(song);
        requestAnimationFrame(gameLoop);
      } else {
        board.stop(song);
        endGame();
        document.getElementById('beats').pause();
        renderScore(song);
      }
    }, 16);
  }
}

function startGame () {
  gameButton.addEventListener('click', function () {
    if (!board.started) {
      document.getElementById('beats').currentTime = 0;
      document.getElementById('beats').play();
      setTimeout (function () {
        game();
        console.log(Date.now());
      }, 80);
    }
  });
}

function endGame () {
  ctx.clearRect(0,0,360,720);
  ctx.fillStyle = "Black";
  ctx.font = "40pt VT323";
  ctx.fillText("GAME OVER", 90, 200);
}

function renderScore (song) {
  document.getElementById("score").innerHTML = "Score: " + song.score() + "/" + song.perfectScore();
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
  game1.addEventListener('click', function () { game(board.songs[0]); })
  game2.addEventListener('click', function () { game(board.songs[1]); })
}

loadSongs();
