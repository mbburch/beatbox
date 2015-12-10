const Board = require("./board");

var board = new Board;

function game () {
  board.start();
  requestAnimationFrame(function gameLoop() {
    var canvas = document.getElementById("game");
    var context = canvas.getContext("2d");
    context.clearRect(0,0,360,720);
    context.fillStyle = "red";
    context.fillRect(0, 175, 360, 10);
    context.fillStyle = "black";
    board.renderNotes(context);
    requestAnimationFrame(gameLoop);
  }, 16);
}

function startGame () {
  var gameButton = document.getElementById('game-start');
  gameButton.addEventListener('click', function () {
    game();
    console.log("game start!");
  });
}

startGame();
