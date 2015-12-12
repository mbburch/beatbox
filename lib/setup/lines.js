function drawBoard (context) {
  context.fillStyle = "red";
  context.fillRect(0, 175, 360, 10);
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
}

module.exports = drawBoard;