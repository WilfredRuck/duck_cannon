class Duck {
  constructor(ctx, startX, startY) {
    this.ctx = ctx;
    this.posX = startX;
    this.posY = startY;
    this.x = 1;
    this.y = -1;
    this.image = new Image();
    this.image.src = "https://i.ibb.co/9hzZkx3/monkey.png";
    this.drawDuck = this.drawDuck.bind(this);
    this.drawDuck();
  }

  drawDuck() {
    this.ctx.clearRect(this.posX - 10, this.posY - 10, 30, 60);
    this.ctx.drawImage(this.image, this.posX - 10, this.posY - 10, 30, 60);
    if (((this.posY + 3) + this.y > 452) || ((this.posY - 3) + this.y < 0)) {
      this.y = -(this.y);
      console.log('BOUNCE');
    }
    this.posX += this.x;
    this.posY += this.y;
    this.scrollWrapper();
    requestAnimationFrame(this.drawDuck);
  }

  scrollWrapper(){
    document.getElementById('wrapper').scrollLeft += 1;
  }
}

export default Duck;