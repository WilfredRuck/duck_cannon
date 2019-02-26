# Duckannon

<a href="https://www.willthecoder.com/duckannon">Duckannon</a> is an addictive browser-based side-scroller game utilizing JavaScript with HTML5 canvas for rendering and collision detection. To make the game more realistic, I built a custom physics engine to implement friction, gravity, and velocity. The player shoots a duck out of a cannon and gains a score based on how far they get.There are different factors in play, such as the power level at the time of launch and obstacles the duck may interact with. The goal is to obtain the furthest distance/score.


## Screenshots

![6lack_channel_preview](https://i.ibb.co/kJVktPt/duckannon-main.png)
<p align="center">Initial game screen preview</p><br />

![6lack_channel_form](https://i.ibb.co/6X3PMqr/duckannon-gameplay.png)
<p align="center">In-game screen preview</p><br />

## Technical Specifications

Duckannon was built using JavaScript, HTML5, and CSS3.

### Implementing Physics

The hardest issue I dealt with was implementing physics. In order to have the game function more realistically, this was a very important addition. Through a ton of research and testing out different values for initial friction, gravity, gravity speed, and bounce, I was able to find a fair combination of values. The next step was to make these values affect the duck at each frame, which the code below shows how I went about implementing that. The velocity of the duck comes from the power level at the time of launch. When the duck hits the bottom of the canvas, it calls the function `hitBottom()`, which turns the gravity negative so it can bounce upwards.

```JavaScript
this.gravitySpeed += this.gravity;
this.vx *= this.friction;
this.vy *= this.friction;
this.posX += this.vx;
this.posY += this.vy  + this.gravitySpeed;
this.hitBottom();
```

### Collision Detection

Collision detection was fun to implement because different obstacles required different outcomes. Obstacles are all given a random X-axis position and then put in their respective arrays. In the `collisionDetection()` function, I iterate over these arrays and run certain actions if the duck's current dimensions overlap the obstacle's dimension. If the obstacle is a bomb, I increase the velocity of the duck and negate the gravity speed so that a mid-air bounce is created. 

```JavaScript
collisionDetection() {
    const ctx = this.ctx;
    this.spikeArr.forEach(obstacleX => {
      if (  (this.posX < obstacleX + 30) &&
            (this.posX + 20 > obstacleX) &&
            (this.posY < 520) &&
            (this.posY + 40 > 420)
      ){
        this.vx = 0;
        this.duckSound.playSound();
        this.gameOver(this.score);
      }
    });

    this.bombArr.forEach(obstacleX => {
      if (  (this.posX < obstacleX + 40) &&
            (this.posX + 30 > obstacleX) &&
            (this.posY < 350) &&
            (this.posY + 60 > 300)
      ){
        this.vx += 0.2;
        this.friction += 0.0002;
        this.gravitySpeed = -(this.gravitySpeed * (this.bounce + 0.2));
        this.bombBonus += 200;
        this.explosionSound.playSound();
        ctx.drawImage(this.explosion, obstacleX, this.posY, 200, 200);
      }
    });

    if (this.posX >= (this.ctx.canvas.width)) {
      this.avoidanceBonus += 3000;
      this.vx = 0;
      this.cheerSound.playSound();
      this.finishLevel(this.score)
    }
}
```

### Future Features

* Create multiple levels
* Allow the user to move the cannon arm
* Make bombs move up and down
* Create more interactive obstacles

## Author

[WilfredRuck](https://github.com/WilfredRuck) - *Public code repos*
