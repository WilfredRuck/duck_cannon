class Duck {
  constructor(ctx, startX, startY, power) {
    this.ctx = ctx;
    this.score = 0;
    this.avoidanceBonus = 0;
    this.startX = startX;
    this.posX = startX;
    this.posY = startY;
    this.friction = 0.999;
    this.power = power;
    this.vx = 30; // velocity of x axis (should be determined by power level when launched)
    this.vy = -4; // velocity of y axis (should be determined by cannon arm angle)
    this.gravity = 0.1; 
    this.gravitySpeed = 0.5;
    this.bounce = 0.3;
    this.image = new Image();
    this.bg = new Image();
    this.spike1 = new Image();
    this.spike2 = new Image();
    this.spike3 = new Image();
    this.spike4 = new Image();
    this.blood = new Image();
    this.troll = new Image();
    this.spike1.src = "spike A.png";
    this.spike2.src = "spike B.png";
    this.spike3.src = "spike C.png";
    this.spike4.src = "spike D.png";
    this.blood.src = "blood.png";
    this.troll.src = "troll.png";
    this.bg.src = "https://i.ibb.co/YBqBGyX/grass-background.jpg";
    this.image.src = "https://i.ibb.co/vB4TtWT/storm-designz-rubber-duck.png";
    this.over = false;

    this.arr = [];
    const times = 0;
    for (let i = 0; i < times; i++) {
      this.arr.push(Math.floor((Math.random() * (9800 - 1000) + 1000)));
    }
    console.log(this.arr);
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
        this.avoidanceBonus += 1000;
        this.vx = 0;
        this.gameOver(this.score);
      }
    }
  }

  drawDuck() {
    if (this.over) return null;
    console.log(this.posX);
    const ctx = this.ctx;
    this.score = Math.floor(this.posX - this.startX);
    const pastXPos = this.posX - this.vx;
    const pastYPos = this.posY - this.vy - this.gravitySpeed;
    ctx.clearRect(pastXPos, pastYPos, 10000, 500);
    ctx.drawImage(this.image, this.posX, this.posY, 30, 60);
    
    this.collisionDetection();
    
    this.arr.forEach(randomX => {
      ctx.drawImage(this.spike2, randomX, 400, 30, 100);
      ctx.drawImage(this.troll, randomX, 0, 50, 60);
    });

    this.gravitySpeed += this.gravity;
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.posX += this.vx;
    this.posY += this.vy  + this.gravitySpeed;
    this.hitBottom();
    ctx.fillstyle = "black";
    ctx.font = "25px status-bar";
    // ctx.clearRect(this.posX - 200, 20, 10000, 500);
    // ctx.clearRect(this.posX, 40, 10000, 500);
    // ctx.fillText("Score: " + this.score, this.posX - 200, 20);
    // ctx.fillText("Power: " + this.power + "/30", this.posX - 200, 40);
    this.scrollWrapper();
    requestAnimationFrame(this.drawDuck);
  }

  collisionDetection() {
    const ctx = this.ctx;
    this.arr.forEach(obstacleX => {
      if (  (this.posX > obstacleX) && 
            (this.posX < obstacleX + 30) &&
            (this.posY > 400) &&
            (this.posY < 500) 
      ){
        this.vx = 0;
        ctx.drawImage(this.blood, this.posX - 250, 300, 900, 400);
        this.gameOver(this.score);
      }
    });
    if (this.posX >= (this.ctx.canvas.width)) {
      this.avoidanceBonus += 3000;
      this.vx = 0;
      this.finishLevel(this.score)
    }
  }

  finishLevel(score) {
    this.over = true;
    const ctx = this.ctx;
    ctx.font = "25px bold status-bar";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, this.posX - 300, 120);
    ctx.fillText("Alive Bonus: " + this.avoidanceBonus, this.posX - 300, 140);
    ctx.font = "30px bolder status-bar";
    ctx.fillText("Final Score: " + (score + this.avoidanceBonus), this.posX - 300, 170);
    ctx.fillStyle = "red";
    ctx.fillText("LEVEL COMPLETE!", this.posX - 300, 200);
    setTimeout(this.reload, 3000);
  }

  gameOver(score) {
    this.over = true;
    const ctx = this.ctx;
    ctx.font = "25px bold status-bar";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, this.posX, 120);
    ctx.fillText("Alive Bonus: " + this.avoidanceBonus, this.posX, 140);
    ctx.font = "30px bolder status-bar";
    ctx.fillText("Final Score: " + (score + this.avoidanceBonus), this.posX, 170);
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