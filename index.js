import canvasLayOut from "./src/canvasLayout";
import pointOnCanvas from "./src/graphicElements";

const CANVAS_WIDTH = 750;
const CANVAS_HEIGHT = 420;

const app = document.getElementById("app");

const clearApp = () => {
  while (app.firstChild) app.removeChild(app.firstChild);
};

// let pTimestamp = 0;

function redrawCanvas() {
  const points = [
    { y: Math.floor(Math.random() * 400) },
    { y: Math.floor(Math.random() * 400) },
    { y: Math.floor(Math.random() * 400) },
    { y: Math.floor(Math.random() * 400) },
  ];
  const canvasElem = document.createElement("canvas");
  canvasElem.width = CANVAS_WIDTH;
  canvasElem.height = CANVAS_HEIGHT;
  const ctx = canvasElem.getContext(`2d`);
  canvasLayOut(ctx, CANVAS_WIDTH, CANVAS_HEIGHT, "gray");
  pointOnCanvas(ctx, CANVAS_WIDTH, points);
  console.log("object");
  clearApp();
  app.appendChild(canvasElem);
}

window.onload = function () {
  redrawCanvas();
};

app.addEventListener("click", () => redrawCanvas());
