export function make지하철Sketch() {
  return function(p) {
    let inner, door1, door2;
    let door1X = 300;
    let door2X = 680;
    let doorY = 230;
    let doorWidth = 380;
    let doorHeight = 540;

    let doorState = 'closed'; // 상태 관리
    let doorTimer = 0;
    let scaleFactor = 1.0; // 확대 비율
    let transitionTriggered = false;

    p.preload = function() {
      inner = p.loadImage('images/스크린도어-내부.jpg');
      door1 = p.loadImage('images/문1.png');
      door2 = p.loadImage('images/문2.png');
    };

    p.setup = function() {
      p.createCanvas(1366, 768);
      p.imageMode(p.CORNER);
    };

    p.draw = function() {
      p.background(255);
      p.push();
      p.translate(p.width / 2, p.height / 2);
      p.scale(scaleFactor);
      p.translate(-p.width / 2, -p.height / 2);

      // 이미지 그리기
      p.image(inner, 0, 0, p.width, p.height);
      p.image(door1, door1X, doorY, doorWidth, doorHeight);
      p.image(door2, door2X, doorY, doorWidth, doorHeight);
      p.pop();

      // 문 애니메이션
      if (doorState === 'opening') {
        if (door1X > 50) {
          door1X -= 5;
          door2X += 5;
        } else {
          doorState = 'open';
          doorTimer = p.millis();
        }
      }


      // 다음 화면 조건
      if (scaleFactor >= 1.5 && !transitionTriggered) {
        transitionTriggered = true;
        window.dispatchEvent(new Event("goToInner"));
      }
    };

    p.mousePressed = function() {
      const door1Clicked = p.mouseX >= door1X &&
                           p.mouseX <= door1X + doorWidth &&
                           p.mouseY >= doorY &&
                           p.mouseY <= doorY + doorHeight;

      const door2Clicked = p.mouseX >= door2X &&
                           p.mouseX <= door2X + doorWidth &&
                           p.mouseY >= doorY &&
                           p.mouseY <= doorY + doorHeight;

      if (doorState === 'closed' && (door1Clicked || door2Clicked)) {
        doorState = 'opening';
      }
    };

    p.mouseWheel = function(event) {
      if (doorState === 'open' && !transitionTriggered) {
        if (event.delta < 0) { // 위로 스크롤
          scaleFactor += 0.05;
          scaleFactor = p.constrain(scaleFactor, 1, 2); // 최대 2배까지 제한
        }
      }
    };
  };
}
