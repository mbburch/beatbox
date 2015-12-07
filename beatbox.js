var canvas = document.getElementById("game");
console.log(document.getElementById("game"));

function game() {
  target = Date.now() + 5000;
};

window.onkeypress = function () {
  keypresstime = Date.now();
  console.log(target - keypresstime)
};

window.onclick = function () {
  game();
  console.log("game start!");
};
