const Board = require("./board");

var board = new Board();
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

function game () {
  board.start();
  document.getElementById("score").innerHTML = "";
  requestAnimationFrame(function gameLoop() {
    if (board.ended() === false) {
      board.tick(ctx);
      renderScore();
      requestAnimationFrame(gameLoop);
    } else {
      board.stop(ctx);
      endGame();
      console.log(Date.now());
      document.getElementById('beats').pause();
      renderScore();
    }
  }, 16);
}

function startGame () {
  var gameButton = document.getElementById('game-start');
  gameButton.addEventListener('click', function () {
    if (!board.started) {
      document.addEventListener('keypress', keyPressHandler, false);
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


function renderScore () {
  document.getElementById("score").innerHTML = "Score: " + board.score() + "/" + board.perfectScore();
}

function keyPressHandler(event) {
  var keyPressed = event.keyCode;
  board.play(keyPressed);
}

startGame();
