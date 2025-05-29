import { make교통통Sketch } from "./sketch.js"; // 다른 파일에 있는 함수를 가져옴옴

let currentP5 = null;

function launchScene(sceneName) {
  if (currentP5) {
    currentP5.remove();
    currentP5 = null;
  }

  if (sceneName === "sketch") currentP5 = new p5(make교통통Sketch(), "canvas-container"); // 캔버스 그리기기
}

window.onload = () => launchScene("sketch");
