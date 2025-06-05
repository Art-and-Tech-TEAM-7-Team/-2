export function make지하철내부Sketch() {
  return function(p) {
    let inner, chair, person;
    let cX = 370;
    let cY = 400;
    let scaleFactor = 1;

    let people = [];
    let showPeople = false;

    p.preload = function() {
      inner = p.loadImage('images/지하철-내부2.jpg');
      chair = p.loadImage('images/의자.png');
      person = p.loadImage('images/사람.png');
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

      // 배경 및 의자
      p.image(inner, 0, 0, p.width, p.height);
      p.image(chair, cX, cY, 1000, 290);

      // 사람들 등장
      for (let personObj of people) {
        let elapsed = p.millis() - personObj.startTime;
        let alpha = p.map(elapsed, 0, 1000, 0, 255, true); // 1초간 페이드인
        p.tint(255, alpha);
        p.image(person, personObj.x, personObj.y, 160, 380); // 크기 조절 가능
      }
      p.noTint();

      p.pop();
    };

    p.mousePressed = function() {
      // 의자 클릭 시 사람 등장
      if (!showPeople && p.mouseX > cX && p.mouseX < cX + 1000 && p.mouseY > cY && p.mouseY < cY + 290) {
        showPeople = true;
        let numberOfPeople = 4;
        let spacing = 230; // 사람 간 간격
        let startX = 450;
        let y = 350;

        for (let i = 0; i < numberOfPeople; i++) {
          people.push({
            x: startX + i * spacing,
            y: y,
            startTime: p.millis()
          });
        }
      }
    };
  };
};
