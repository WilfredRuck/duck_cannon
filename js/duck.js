import Audio from './audio.js';

class Duck {
  constructor(ctx, startX, startY, power) {
    this.ctx = ctx;
    this.score = 0;
    this.avoidanceBonus = 0;
    this.bombBonus = 0;
    this.startX = startX;
    this.posX = startX;
    this.posY = startY;
    this.friction = 0.999;
    this.power = power;
    this.vx = this.power; // velocity of x axis (should be determined by power level when launched)
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
    this.bomb = new Image();
    this.explosion = new Image();
    this.image.src = "https://i.ibb.co/vB4TtWT/storm-designz-rubber-duck.png";
    this.bg.src = "https://i.ibb.co/YBqBGyX/grass-background.jpg";
    this.spike1.src = "spike A.png";
    this.spike2.src = "spike B.png";
    this.spike3.src = "spike C.png";
    this.spike4.src = "spike D.png";
    this.blood.src = "blood.png";
    this.troll.src = "troll.png";
    this.bomb.src = "bomb.png";
    this.explosion.src = "explosion1.png";
    this.explosionSound = new Audio("explosion.mp3");
    this.waterSound = new Audio("water.mp3");
    this.over = false;
    this.spikeArr = [];
    this.bombArr = [];
    let times = 15;
    for (let i = 0; i < times; i++) {
      this.spikeArr.push(Math.floor((Math.random() * (9800 - 1000) + 1000)));
    }
    times = 3;
    for (let i = 0; i < times; i++) {
      this.bombArr.push(Math.floor((Math.random() * (9800 - 500) + 500)));
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
        this.avoidanceBonus += 1000;
        this.vx = 0;
        this.gameOver(this.score);
      }
    }
  }

  drawDuck() {
    if (this.over) return null;
    const ctx = this.ctx;
    this.score = Math.floor(this.posX - this.startX);
    const pastXPos = this.posX - this.vx;
    const pastYPos = this.posY - this.vy - this.gravitySpeed;
    ctx.clearRect(pastXPos, pastYPos, 10000, 500);
    ctx.drawImage(this.image, this.posX, this.posY, 30, 60);
    
    this.collisionDetection();
    
    this.spikeArr.forEach(randomX => {
      ctx.drawImage(this.spike2, randomX, 420, 30, 100);
      ctx.drawImage(this.troll, randomX, 0, 50, 60);
    });

    this.bombArr.forEach(randomX => {
      ctx.drawImage(this.bomb, randomX, 300, 40, 50);
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
    this.spikeArr.forEach(obstacleX => {
      // ctx.drawImage(this.spike2, randomX, 420, 30, 100);
      if (  (this.posX < obstacleX + 30) &&
            (this.posX + 20 > obstacleX) &&
            (this.posY < 520) &&
            (this.posY + 40 > 420)
      ){
        this.vx = 0;
        this.waterSound.playSound();
        ctx.drawImage(this.blood, this.posX - 250, 300, 900, 400);
        this.gameOver(this.score);
      }
    });

    this.bombArr.forEach(obstacleX => {
      if (  (this.posX < obstacleX + 40) &&
            (this.posX + 30 > obstacleX) &&
            (this.posY < 350) &&
            (this.posY + 60 > 300)
      ){
        this.vx += 0.25;
        this.friction += 0.0003;
        this.bombBonus += 200;
        this.explosionSound.playSound();
        ctx.drawImage(this.explosion, obstacleX, this.posY, 200, 200);
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
    ctx.fillText("Score: " + score, this.posX - 300, 100);
    ctx.fillText("Alive Bonus: " + this.avoidanceBonus, this.posX - 300, 120);
    ctx.fillText("Bomb Bonus: " + this.bombBonus, this.posX - 300, 140);
    ctx.font = "30px bolder status-bar";
    ctx.fillText("Final Score: " + (score + this.avoidanceBonus + this.bombBonus), this.posX - 300, 190);
    ctx.fillStyle = "red";
    ctx.fillText("LEVEL COMPLETE!", this.posX - 300, 220);
    setTimeout(this.reload, 3000);
  }

  gameOver(score) {
    this.over = true;
    const ctx = this.ctx;
    ctx.font = "25px bold status-bar";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, this.posX, 100);
    ctx.fillText("Alive Bonus: " + this.avoidanceBonus, this.posX, 120);
    ctx.fillText("Bomb Bonus: " + this.bombBonus, this.posX, 140);
    ctx.font = "30px bolder status-bar";
    ctx.fillText("Final Score: " + (score + this.avoidanceBonus + this.bombBonus), this.posX, 190);
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