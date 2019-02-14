class Duck {
  constructor(ctx, startX, startY, power) {
    this.ctx = ctx;
    this.score = 0;
    this.startX = startX;
    this.posX = startX;
    this.posY = startY;
    this.friction = 0.999;
    this.power = power;
    this.vx = power; // velocity of x axis (should be determined by power level when launched)
    this.vy = -4; // velocity of y axis (should be determined by cannon arm angle)
    this.gravity = 0.1; 
    this.gravitySpeed = 0.5;
    this.bounce = 0.08;
    this.image = new Image();
    this.bg = new Image();
    this.spike1 = new Image();
    this.spike2 = new Image();
    this.spike3 = new Image();
    this.spike4 = new Image();
    this.spike1.src = "spike A.png";
    this.spike2.src = "spike B.png";
    this.spike3.src = "spike C.png";
    this.spike4.src = "spike D.png";
    this.bg.src = "https://i.ibb.co/YBqBGyX/grass-background.jpg";
    this.image.src = "https://i.ibb.co/vB4TtWT/storm-designz-rubber-duck.png";
    this.over = false;

    this.arr = [];
    const times = 5;
    for (let i = 0; i < times; i++) {
      this.arr.push(Math.floor((Math.random() * (10000 - 1000) + 1000)));
    }

    this.drawDuck = this.drawDuck.bind(this);
    this.drawDuck();
  }

  hitBottom() {
    const bottom = 440;
    if (this.posY > bottom) {
      this.posY = bottom;
      this.friction -= 0.001;
      if (Math.floor(this.posX) === 634 || Math.floor(this.posX) === 271) {
        this.vx = this.vx * 23;
      } 
      this.gravitySpeed = -(this.gravitySpeed * this.bounce);
      if (this.vx < 0.05) {
        this.gameOver(this.score);
      }
    }
  }

  drawDuck() {
    const ctx = this.ctx;
    this.score = Math.floor(this.posX - this.startX);
    const pastXPos = this.posX - this.vx;
    const pastYPos = this.posY - this.vy - this.gravitySpeed;
    ctx.clearRect(pastXPos, pastYPos, 10000, 500);
    ctx.drawImage(this.image, this.posX, this.posY, 30, 60);
    console.log(Math.floor(this.posX))
    // if (this.arr.includes(Math.floor(this.posX))) {
    //   // debugger
    //   this.gameOver(this.score);
    // }
    this.arr.forEach(randomX => {
      ctx.drawImage(this.spike1, randomX, 440, 30, 60);
    });
    ctx.fillRect(634, 495, 30, 5);
    ctx.fillRect(271, 495, 30, 5);
    this.gravitySpeed += this.gravity;
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.posX += this.vx;
    this.posY += this.vy;
    this.hitBottom();
    if (this.over) {
      cancelAnimationFrame(this.drawDuck);
      return null;
    }
    ctx.fillstyle = "black";
    ctx.font = "25px status-bar";
    // ctx.clearRect(this.posX - 250, 20, 10000, 500);
    // ctx.clearRect(this.posX - 250, 40, 10000, 500);
    // ctx.fillText("Score: " + this.score, this.posX - 200, 20);
    // ctx.fillText("Power: " + this.power + "/30", this.posX - 200, 40);
    this.scrollWrapper();
    requestAnimationFrame(this.drawDuck);
  }

  // drawObstacle() {
  //   // const ctx = this.ctx;
  //   // const screenLeft = this.posX - 250;
  //   // const screenRight = this.posX + 250;
  //   // const randomX = Math.floor((Math.random() * (10000) + 1));
  //   // // ctx.fillRect(randomX, 495, 30, 5);
  //   // // ctx.fillRect(randomX + 50, 495, 30, 5);
  //   // ctx.drawImage(this.spike1, randomX, 440, 30, 60);
  //   // console.log("SPIKE Created");
  //   // console.log(Math.floor((Math.random() * ((this.posX + 250) + (this.posX - 250)) + (this.posX - 250))));
  // }

  gameOver(score) {
    this.over = true;
    this.vx = 0;
    const ctx = this.ctx;
    ctx.font = "30px bolder status-bar";
    ctx.fillText("Final Score: " + score, this.posX, 200);
    // clearInterval(this.obstacleInterval);
    setTimeout(this.reload, 3000);
  }

  reload() {
    location.reload();
  }

  scrollWrapper(){
    document.getElementById('wrapper').scrollLeft = this.posX - 250;
  }
}

export default Duck;