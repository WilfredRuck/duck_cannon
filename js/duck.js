class Duck {
  constructor(ctx, startX, startY) {
    this.ctx = ctx;
    this.posX = startX - 10;
    this.posY = startY - 10;
    this.friction = 1;
    this.vx = 3; // velocity of x axis (should be determined by power level when launched)
    this.vy = -4; // velocity of y axis (should be determined by cannon arm angle)
    this.gravity = 0.1;
    this.gravitySpeed = 0;
    this.bounce = 0.2;
    this.image = new Image();
    this.image.src = "https://i.ibb.co/vB4TtWT/storm-designz-rubber-duck.png";
    this.drawDuck = this.drawDuck.bind(this);
    this.startFriction = this.startFriction.bind(this);
    setInterval(this.startFriction, 1000);
    setInterval(this.drawDuck, 10);
  }

  startFriction() {
    this.friction = 0.99;
  }

  hitBottom() {
    const bottom = 440;
    if (this.posY > bottom) {
      this.posY = bottom;
      this.gravitySpeed = -(this.gravitySpeed * this.bounce);
    }
  }

  drawDuck() {
    // this.prevGravitySpeed = this.gra
    this.ctx.clearRect(this.posX - this.vx, this.posY - this.vy, 30, 60);
    this.ctx.drawImage(this.image, this.posX, this.posY, 30, 60);
    this.gravitySpeed += this.gravity;
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.posX += this.vx;
    this.posY += this.vy;
    this.hitBottom();
    this.scrollWrapper();
    // requestAnimationFrame(this.drawDuck);
  }

  scrollWrapper(){
    // if (this.posX * 2 > document.getElementById('wrapper').scrollLeft) {
      document.getElementById('wrapper').scrollLeft = this.posX * 2;
    // }
  }
}

export default Duck;