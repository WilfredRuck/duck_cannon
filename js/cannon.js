import Duck from './duck.js';
import Audio from './audio.js';

class Cannon {
  constructor(ctx, color = "grey") {
    this.color = color;
    this.ctx = ctx;
    this.bg = new Image();
    this.bg.src = "https://i.ibb.co/YBqBGyX/grass-background.jpg";
    this.explosionSound = new Audio("explosion.mp3");
    this.cannonArm = this.cannonArm.bind(this);
    this.play();
    this.changePower = -1;
    this.currentPower = 500;
    this.cannonInterval = setInterval(() => this.drawCannon(), 10);
    this.drawCannon();
  }

  drawCannon() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, 10000, 400);
    // cannon arm
    ctx.fillStyle = "#000";
    ctx.fillRect(50, 300, 100, 50);
    // cannon body
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 250, 60, 250);
    ctx.fillStyle = "#fff";
    // cannon power
    ctx.font = "20px status-bar";
    ctx.fillText("Power", 5, 400);
    ctx.fillText("Level", 5, 420);
    ctx.font = "15px status-bar";
    ctx.fillStyle = "red";
    ctx.fillRect(20, this.currentPower, 20, 230);

    const pow = this.currentPower + this.changePower;
    if ((pow === 469) || (pow === 501)) this.changePower = -(this.changePower);
    this.currentPower += this.changePower;
    ctx.fillstyle = "black";
    ctx.font = "25px status-bar";
    ctx.fillText("Score: 0", 0, 20);
  }

  play() {
    document.addEventListener("keydown", this.cannonArm);
  }

  shoot() {
    this.endKeypress();
    clearInterval(this.cannonInterval);
    this.explosionSound.playSound();
    new Duck(this.ctx, 150, 250, (500 - this.currentPower));
  }

  endKeypress() {
    document.removeEventListener("keydown", this.cannonArm);
  }

  cannonArm(e) {
    if (e.keyCode === 32) this.shoot();
  }
}

export default Cannon;