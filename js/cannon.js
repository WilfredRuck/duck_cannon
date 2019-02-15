import Duck from './duck.js';

class Cannon {
  constructor(ctx, color = "grey") {
    this.color = color;
    this.ctx = ctx;
    this.deltaY = 0;
    this.bg = new Image();
    this.bg.src = "https://i.ibb.co/YBqBGyX/grass-background.jpg";
    this.play();
    this.lastX = 80;
    this.lastY = 250;
    this.changePower = -1;
    this.currentPower = 500;
    this.idx = 0;
    this.drawCannon();
    this.cannonInterval = setInterval(() => this.drawCannon(), 10);
  }

  drawCannon() {
    const ctx = this.ctx;
    let deltaY = this.deltaY;
    ctx.clearRect(0, 0, 10000, 400);
    // cannon arm (movable)
    ctx.fillStyle = "#000";
    ctx.fillRect(50, 300, 100, 50);
    // this.lastX = x;
    // this.lastY = y;
    // cannon body
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 250, 60, 250);
    ctx.fillStyle = "#fff";
    ctx.font = "20px status-bar";
    ctx.fillText("Power", 5, 400);
    ctx.fillText("Level", 5, 420);
    ctx.font = "15px status-bar";
    ctx.fillRect(634, 495, 30, 5);
    ctx.fillRect(271, 495, 30, 5);
    ctx.fillRect(20, this.currentPower, 20, 230);
    const pow = this.currentPower + this.changePower;
    if ((pow === 469) || (pow === 501)) this.changePower = -(this.changePower);
    this.currentPower += this.changePower;
  }

  play() {
    document.addEventListener("keydown", this.cannonArm.bind(this), false);
  }

  shoot() {
    this.endKeypress();
    clearInterval(this.cannonInterval);
    new Duck(this.ctx, this.lastX, this.lastY, (500 - this.currentPower));
  }

  endKeypress() {
    document.removeEventListener("keydown", this.cannonArm.bind(this), false)
  }

  cannonArm(e) {

    switch(e.keyCode) {
      case 38:
        this.deltaY -= 5;
      // up key
        break;
      case 40:
        this.deltaY += 5;
      // down key
        break;

    }
    if (e.keyCode === 32) {
      this.shoot();
    }
    else this.drawCannon();
  }
}

export default Cannon;