let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

let drawLine = (startX, startY, endX, endY) => {
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

ctx.beginPath();

//head
ctx.arc(250, 100, 75, 0, 2 * Math.PI);
ctx.stroke();

//body
drawLine(250, 175, 250, 300);

//left leg
drawLine(250, 300, 150, 400);

//right leg
drawLine(250, 300, 350, 400);

//left arm
drawLine(250, 215, 150, 175);

//right arm
drawLine(250, 215, 350, 175);

