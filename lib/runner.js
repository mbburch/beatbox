const Board = require("./board");

var board = new Board();
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  alert("This game is not mobile compatible. Try it on your computer!");
}

function game () {
  board.start();
  document.getElementById("score").innerHTML = "";
  requestAnimationFrame(function gameLoop() {
    if (board.ended() === false) {
      board.tick(ctx);
      renderScore();
      requestAnimationFrame(gameLoop);
    } else {
      board.end(ctx);
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
  var imageObj = new Image();

  imageObj.onload = function() {
    ctx.drawImage(imageObj, 40, 250);
  };
  imageObj.src = '../images/gesture.png';
  ctx.fillStyle = "Black";
  ctx.font = "50pt VT323";
  ctx.fillText("GAME OVER", 60, 150);
}


function renderScore () {
  document.getElementById("score").innerHTML = "Score: " + board.score() + "/" + board.perfectScore();
}

function keyPressHandler(event) {
  var keyPressed = event.keyCode;
  board.play(keyPressed);
}

startGame();
