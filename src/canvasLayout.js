export default function canvasLayOut(ctx, width, height, color) {
  ctx.beginPath();
  ctx.rect(0, 0, width, height);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.translate(0, height);
  ctx.rotate(-Math.PI / 2);
}
