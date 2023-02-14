function putNewPoint(ctx, yPoint, xPoint, circleSize = 12) {
  let pTimestamp = 0;
  let a = 200;
  requestAnimationFrame(tick);
  function tick(timestamp) {
    const diff = timestamp - pTimestamp;
    pTimestamp = timestamp;
    // console.log("ticked", diff);
    if (yPoint > a) {
      a += 3;
    }
    if (yPoint < a) {
      a -= 2;
    }
    ctx.fillStyle = "gray";
    ctx.fillRect(yPoint > a ? a - 30 : a + 1, xPoint - 13, 26, 26);
    ctx.beginPath();
    ctx.arc(a, xPoint, circleSize, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();
    if (a === yPoint) {
      return;
    }
    requestAnimationFrame(tick);
  }
}

function putLine(ctx, yPoint1, xPoint1, yPoint2, xPoint2) {
  console.log(yPoint1, yPoint2);
  const k = (yPoint1 - yPoint2) / (xPoint1 - xPoint2);
  console.log("k", k);
  const b = yPoint1 - xPoint1 * k;
  let pTimestamp = 0;
  let x1 = xPoint1;
  let y1;
  requestAnimationFrame(tick);
  function tick(timestamp) {
    const diff = timestamp - pTimestamp;
    pTimestamp = timestamp;
    console.log("ticked", diff);

    y1 = Math.floor(k * x1 + b);
    x1 += 1;

    console.log(y1);

    ctx.beginPath();
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
      setTimeout(() => putLine(ctx, prev.y, prev.x, current.y, width), 300);
    const coordinates = { x: width, y: current.y };
    return coordinates;
  }, xStart);
}
