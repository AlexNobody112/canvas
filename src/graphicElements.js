function putNewPoint(ctx, yPoint, xPoint, circleSize = 12) {
  let pTimestamp = 200;
  let s = 200;
  requestAnimationFrame(tick);
  function tick(timestamp) {
    // const diff = timestamp - pTimestamp;
    // pTimestamp = timestamp;
    // console.log("ticked", diff);
    if (yPoint > s) {
      s += 3;
    }
    if (yPoint < s) {
      s -= 3;
    }
    ctx.fillStyle = "gray";
    // ctx.fillStyle = "red";
    ctx.fillRect(s - 30, xPoint - 14, 50, 30);
    ctx.beginPath();
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
  function tick(timestamp) {
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
  const xStart = baseWidth * 0.05;

  yPoints.reduce((prev, current, index, arr) => {
    const part = (baseWidth - xStart * 2) / (arr.length - 1);
    const width = index === 0 ? xStart : prev.x + part;
    putNewPoint(ctx, current.y, width);
    prev.y &&
      setTimeout(() => putLine(ctx, prev.y, prev.x, current.y, width), 500);
    const coordinates = { x: width, y: current.y };
    return coordinates;
  }, xStart);
}
