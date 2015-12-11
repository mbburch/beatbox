const Board = require("./board");

var board = new Board;
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

function game () {
  board.start();
  document.getElementById("score").innerHTML = "";
  requestAnimationFrame(function gameLoop() {
    context.clearRect(0,0,360,720);
    if (board.ended() == false) {
      context.clearRect(0,0,360,720);
      context.fillStyle = "red";
      context.beginPath();
      context.moveTo(90,0);
      context.lineTo(90,720);
      context.stroke();
      context.moveTo(180,0);
      context.lineTo(180,720);
      context.stroke();
      context.moveTo(270,0);
      context.lineTo(270,720);
      context.stroke();
      context.fillRect(0, 175, 360, 10);
      context.fillStyle = "black";
      board.renderNotes(context);
      requestAnimationFrame(gameLoop);
    } else {
      var score = board.end();
      document.getElementById("score").innerHTML = "Score: " + score;
    }
  }, 16);
}

function startGame () {
  var gameButton = document.getElementById('game-start');
  gameButton.addEventListener('click', function () {
    if (board.started == false) {
      game();
      document.addEventListener('keypress', keyPressHandler, false);
    }
  });
}

function keyPressHandler(event) {
  var keyPressed = event.keyCode;
  if (keyPressed == 97) {
    board.play();
  };
}

startGame();
