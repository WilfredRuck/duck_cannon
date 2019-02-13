import Duck from './duck.js';

class Cannon {
  constructor(ctx, color = "grey") {
    this.color = color;
    this.ctx = ctx;
    this.deltaY = 0;
    this.drawCannon();
    this.play();
    this.lastX = 60;
    this.lastY = 250;
  }

  drawCannon() {
    const ctx = this.ctx;
    let deltaY = this.deltaY;
    ctx.clearRect(0, 0, 700, 500);

    // cannon arm (movable)
    ctx.beginPath();
    ctx.moveTo(30 , 300);
    let x = 60;
    let y = 250 + deltaY;
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.strokeStyle = "black";
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
    console.log(x, y);
    this.lastX = x;
    this.lastY = y;

    // cannon body
    ctx.fillStyle = this.color;
    ctx.fillRect(1, 250, 40, 250);
  }

  play() {
    document.addEventListener("keydown", this.cannonArm.bind(this), false);
  }

  shoot() {
    this.endKeypress();
    new Duck(this.ctx, this.lastX, this.lastY);
  }

  endKeypress() {
    document.removeEventListener("keydown", this.cannonArm.bind(this), false)
  }

  cannonArm(e) {

    switch(e.keyCode) {
      case 38:
        this.deltaY -= 15;
      // up key
        break;
      case 40:
        this.deltaY += 15;
      // down key
        break;
      case 32:
        this.shoot();
        break;
    }
    if (e.keyCode === 32) {
      this.shoot()
    }
    else this.drawCannon();
  }
}

export default Cannon;