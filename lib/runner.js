const Board = require("./board");
const drawLines = require("./setup/lines");

var board = new Board;
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

function game () {
  board.start();
  document.getElementById("score").innerHTML = "";
  requestAnimationFrame(function gameLoop() {
    drawLines(context);
    if (board.ended() == false) {
      board.tick(context);
      renderScore();
      requestAnimationFrame(gameLoop);
    } else {
      board.end();
      renderScore();
    }
  }, 16);
}

function startGame () {
  drawLines(context);
  var gameButton = document.getElementById('game-start');
  gameButton.addEventListener('click', function () {
    if (!board.started) {
      game();
      document.addEventListener('keypress', keyPressHandler, false);
    }
  });
}

function renderScore () {
  document.getElementById("score").innerHTML = "Score: " + board.score() + "/" + board.perfectScore();
};

function keyPressHandler(event) {
  var keyPressed = event.keyCode;
  if (keyPressed == 106) {
    board.play("left");
  } else if (keyPressed == 107) {
    board.play("middle");
  } else if (keyPressed == 108) {
    board.play("right");
  }
}

startGame();
