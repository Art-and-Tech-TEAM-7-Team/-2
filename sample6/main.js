import { make지하철Sketch } from "./screendoor.js"; // 다른 파일에 있는 함수를 가져옴옴
import { make지하철내부Sketch } from "./inner.js"; // 추가

let currentP5 = null;

function launchScene(sceneName) {
  if (currentP5) {
    currentP5.remove();
    currentP5 = null;
  }

  if (sceneName === "screendoor") currentP5 = new p5(make지하철Sketch(), "canvas-container"); // 캔버스 그리기기
  else if (sceneName === "inner") currentP5 = new p5(make지하철내부Sketch(), "canvas-container");
}
window.addEventListener("goToInner", () => launchScene("inner"));
window.onload = () => launchScene("screendoor");
