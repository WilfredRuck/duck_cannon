import Cannon from './cannon.js';
import Duck from './duck.js';
import Obstacle from './obstacle.js';

class Board {
  constructor(ctx) {
    this.cannon = new Cannon();
    this.duck = new Duck();
    this.ctx = ctx;
    this.deltaX = 0;
    this.deltaY = 0;
    this.drawCannon();
    this.play();
  }

  drawCannon() {
    const ctx = this.ctx;
    let deltaX = this.deltaX;
    let deltaY = this.deltaY;
    
    ctx.clearRect(0, 0, 700, 500);
    // cannon body
    ctx.beginPath();
            // (x, y)
    ctx.moveTo(20, 110);
    ctx.lineTo(60, 110);
    ctx.lineTo(40, 80);
    ctx.lineTo(20, 110);
    ctx.closePath();
    ctx.strokeStyle = "grey";
    ctx.fillStyle = "grey";
    ctx.fill();
    ctx.stroke();

    // cannon arm (movable)
    console.log(deltaX, deltaY);
    ctx.beginPath();
    ctx.moveTo(42 + deltaX, 83 + deltaY);
    ctx.lineTo(80 + deltaX, 70 + deltaY);
    ctx.lineTo(87 + deltaX, 78 + deltaY);
    ctx.lineTo(48 + deltaX, 92 + deltaY);
    ctx.closePath();
    ctx.strokeStyle = "grey";
    ctx.fillStyle = "grey";
    ctx.fill();
    ctx.stroke();
  }

  play() {
    document.addEventListener("keydown", this.moveCannonArm.bind(this), false);
  }

  moveCannonArm(e) {

    switch(e.keyCode) {
      case 37:
        this.deltaX -= 2;
      // left key
        break;
      case 38:
        this.deltaY -= 2;
      // up key
        break;
      case 39:
        this.deltaX += 2;
      // right key
        break;
      case 40:
        this.deltaY += 2;
      // down key
        break;
    }
    this.drawCannon();
  }
  

}

export default Board;
