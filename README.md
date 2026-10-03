# Duckannon

Launch a rubber duck from a cannon, catch glowing boost orbs, and see how far you can fly. Time your launch for maximum power, bounce across the meadow, and avoid the spikes.

Duckannon is a browser arcade game built with JavaScript, HTML5 Canvas, and CSS. This version gives the original game a brighter meadow design, a clearer scoreboard, and a smoother play-and-retry loop.

## Preview

![Duckannon meadow design with the duck tucked into the cannon](images/duckannon-preview.png)

## Play locally

No build step or dependency installation is required. From the repository folder, run:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open [Duckannon locally](http://127.0.0.1:8765/).

## Controls

- Press **Space** or select **Launch duck** to launch.
- Launch when the power meter reaches its yellow zone for a stronger shot.
- Collect golden orbs for a lift and **200 bonus points** each.
- Avoid spikes; hitting one ends the flight.
- Select **Try again** or press **Space** after a flight to reset.
- Select **Sound on** to enable audio. Orb pickups play a short chime.

Your final score combines distance and boost bonuses. Your best score is saved in the current browser using local storage.

## The original project

[The original Duckannon project](https://github.com/WilfredRuck/duck_cannon) was created by [WilfredRuck](https://github.com/WilfredRuck).

<a href="https://www.willthecoder.com/duckannon">Duckannon</a> is an addictive browser-based side-scroller game utilizing JavaScript with HTML5 canvas for rendering and collision detection. To make the game more realistic, I built a custom physics engine to implement friction, gravity, and velocity. The player shoots a duck out of a cannon and gains a score based on how far they get. There are different factors in play, such as the power level at the time of launch and obstacles the duck may interact with. The goal is to obtain the furthest distance/score.

## Technical Specifications

The following explanations and code examples are preserved from the original project. The refreshed game retunes the physics and replaces bomb pickups with orbs; these examples describe the original implementation, which remains in the repository.

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

Original project roadmap:

* Create multiple levels
* Allow the user to move the cannon arm
* Make bombs move up and down
* Create more interactive obstacles

## What's new

- Cream-and-green interface with the game at the center.
- Layered meadow hills, trees, birds, and flowers with parallax scrolling.
- A custom cannon with the duck peeking out from inside the barrel before launch.
- A visible power meter, distance counter, boost total, and personal best.
- Glowing, single-use boost orbs and particle effects.
- A results screen with a quick retry button.
- Responsive layout and both keyboard and button controls.
- Frame-time-based animation and retuned flight physics.

## Project structure

- `index.html` — game layout and controls.
- `css/main.css` — responsive styling.
- `js/entry.js` — active game loop, physics, rendering, scoring, and audio.
- `images/` — original artwork, including the rubber duck.
- `audio/` — launch and duck sounds, plus the new orb chime.

The original JavaScript modules and Webpack configuration are preserved for reference. The current page loads `js/entry.js` directly as a browser module. Google Fonts supplies Nunito, with system font fallbacks.

## Author

Created by [WilfredRuck](https://github.com/WilfredRuck).

[Source repository](https://github.com/WilfredRuck/duck_cannon)
