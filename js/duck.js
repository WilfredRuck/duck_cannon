class Duck {
  constructor(ctx, startX, startY, power) {
    this.ctx = ctx;
    this.score = 0;
    this.startX = startX;
    this.posX = startX;
    this.posY = startY;
    this.friction = 0.99;
    this.vx = power; // velocity of x axis (should be determined by power level when launched)
    this.vy = -4; // velocity of y axis (should be determined by cannon arm angle)
    this.gravity = 0.1;
    this.gravitySpeed = 1;
    this.bounce = 0.01;
    this.image = new Image();
    this.bg = new Image();
    this.bg.src = "https://i.ibb.co/YBqBGyX/grass-background.jpg";
    this.image.src = "https://i.ibb.co/vB4TtWT/storm-designz-rubber-duck.png";
    this.over = false;
    this.drawDuck = this.drawDuck.bind(this);
    // this.startFriction = this.startFriction.bind(this);
    // setInterval(this.startFriction, 1000);
    this.drawDuck();
  }

  // startFriction() {
  //   this.friction = 0.99;
  // }

  hitBottom() {
    const bottom = 440;
    if (this.posY > bottom) {
      this.posY = bottom;
      this.gravitySpeed = -(this.gravitySpeed * this.bounce);
      if (this.vx < 0.03) {
        this.gameOver(this.score);
      }
    }
  }

  drawDuck() {
    const ctx = this.ctx;
    console.log(this.posX);
    this.score = Math.floor(this.posX - this.startX);
    ctx.clearRect(0, 0, 700, 500);
    ctx.drawImage(this.bg, 0, 0, 700, 500);
    ctx.drawImage(this.image, this.posX, this.posY, 30, 60);
    this.gravitySpeed += this.gravity;
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.posX += this.vx;
    this.posY += this.vy + this.gravitySpeed;
    this.hitBottom();
    if (this.over) {
      cancelAnimationFrame(this.drawDuck);
      return null;
    }
    // this.scrollWrapper();
    ctx.fillstyle = "#000";
    ctx.font = "20px status-bar";
    ctx.fillText("Score: " + this.score, 20, 20);
    ctx.fillText("Speed: " + this.vx, 20, 40);
    requestAnimationFrame(this.drawDuck);
  }

  gameOver(score) {
    this.over = true;
    const ctx = this.ctx;
    ctx.font = "30px bolder black status-bar";
    ctx.fillText("Final Score: " + score, 250, 250);
    setTimeout(this.reload, 4000);
  }

  reload() {
    location.reload();
  }

  // scrollWrapper(){
  //   // if (this.posX * 2 > document.getElementById('wrapper').scrollLeft) {
  //     document.getElementById('wrapper').scrollLeft += 2;
  //   // }
  // }
}

export default Duck;