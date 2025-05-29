export function make교통통Sketch() {
  return function(p) {

    let images = [];
    let currentIndex = 0;
    let imagePaths = [
      'images/스크린도어.jpg',
      'images/지하철-내부.jpg',
      'images/지하철-계단.jpg',
      'images/버스-정류장.jpg'
    ];

    p.preload = function() {
      for (let path of imagePaths) {
        images.push(p.loadImage(path)); // ← 여기 수정!
      }
    }

    p.setup = function() {
      p.createCanvas(1366, 768); // 이미지 해상도에 맞춰 설정
      p.imageMode(p.CORNER);
    }

    p.draw = function(){
      p.background(255);
      p.image(images[currentIndex], 0, 0, p.width, p.height); // ← 여기도 p. 붙이기!
    }

    p.mousePressed = function() {
      currentIndex++;
      if (currentIndex >= images.length) {
        currentIndex = 0; // 다시 처음부터 시작하거나, 멈추고 싶다면 이 줄을 제거하세요.
      }
    }


  }
}