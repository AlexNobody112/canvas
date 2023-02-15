function putNewPoint(ctx, yPoint, xPoint, circleSize = 8) {
  let s = 100;
  requestAnimationFrame(tick);
  function tick() {
    if (yPoint > s) {
      s += 5;
    }
    ctx.fillStyle = "gray";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.fillRect(s - 30, xPoint - 10, 25, 20);
    ctx.arc(s, xPoint, circleSize, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();
    if (s === yPoint) {
      return;
    }
    requestAnimationFrame(tick);
  }
}

function putLine(ctx, yPoint1, xPoint1, yPoint2, xPoint2) {
  const k = (yPoint1 - yPoint2) / (xPoint1 - xPoint2);
  const b = yPoint1 - xPoint1 * k;
  let x1 = xPoint1;
  let y1;
  requestAnimationFrame(tick);
  function tick() {
    y1 = Math.floor(k * x1 + b);
    x1 += 4;

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(yPoint1, xPoint1);
    ctx.lineTo(y1, x1);
    ctx.stroke();

    if (x1 >= xPoint2) {
      return;
    }

    requestAnimationFrame(tick);
  }
}

export default function pointOnCanvas(ctx, baseWidth, yPoints) {
  const xStart = baseWidth * 0.125;

  yPoints.reduce((prev, current, index, arr) => {
    const part = (baseWidth - xStart * 2) / (arr.length - 1);
    const width = index === 0 ? xStart : prev.x + part;
    prev.y &&
      setTimeout(() => putLine(ctx, prev.y, prev.x, current.y, width), 500);
    putNewPoint(ctx, current.y, width);
    const coordinates = { x: width, y: current.y };
    return coordinates;
  }, xStart);
}
