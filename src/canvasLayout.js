export default function canvasLayOut(ctx, width, height, color) {
  ctx.beginPath();
  ctx.rect(0, 0, width, height);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.translate(0, height);
  ctx.rotate(-Math.PI / 2);
  ctx.beginPath();
  ctx.moveTo(40, 40);
  ctx.lineTo(400, 40);
  ctx.moveTo(40, 40);
  ctx.lineTo(40, 700);
  ctx.stroke();
}
