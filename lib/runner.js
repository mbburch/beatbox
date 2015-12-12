const Board = require("./board");
const drawLines = require("./setup/lines");

var board = new Board;
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

function game () {
  board.start();
  console.log(board);
  document.getElementById("score").innerHTML = "";
  requestAnimationFrame(function gameLoop() {
    context.clearRect(0,0,360,720);
    if (board.ended() == false) {
      context.clearRect(0,0,360,720);
      drawLines(context);
      context.fillStyle = "black";
      board.renderNotes(context);
      requestAnimationFrame(gameLoop);
    } else {
      drawLines(context);
      var perfectScore = board.perfectScore();
      var score = board.end();
      document.getElementById("score").innerHTML
        = "Score: " + score + "/" + perfectScore;
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


// 3 notes, in 3 lines
// connect a keypress (specific keyCode) to a line of notes
// x function- three x coords in array. assign random to each note

// lib/util, lib/constants, lib/notePress
// var notes = {
//   160: qWasPressed,
//   180: wWasPressed,
//   200: eWasPressed
// }

// notes[xCoord]


