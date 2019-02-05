# Duckannon

## Background and Overview

Duckannon is a game where the player shoots a duck out of a cannon and gains a score based on how far they get. There will be different factors in play, such as the angle of the cannon before release, and the speed at time of launch(which will be displayed as it randomly increases and decreases). The goal is to find the best combination of angle and speed to obtain the furthest distance. There will also be various obstacles the duck may interact with as it bounces that will affect where the duck ends up stopping.
    
## Functionality and MVP Features
  
  Players will be able to:
  - [ ] Start and restart game
  - [ ] Change cannon angle
  - [ ] Hear sounds on collisions and when cannon moves/shoots
  - [ ] Shoot duck
  - [ ] View speed of cannon
  
  Also:
  - [ ] An About modal describing the basic functionality
    
## Architecture and Technologies

  This project will be implemented with the following technologies:
  <ul>
    <li>Vanilla JavaScript for game logic</li>
    <li>HTML5 Canvas for DOM manipulation and rendering</li>
    <li>Webpack to bundle various scripts into a single source</li>
  </ul>
  
  In addition to the webpack entry file, there will be four scripts involved in this project:
  <ul>
    <li> `board.js`: this script will handle the logic for creating and updating the necessary DOM elements</li>
    <li>`cannon.js`: this script will house the physics logic for the cannon</li>
    <li>`duck.js`: this script will house the physics logic for the duck</li>
    <li>`audio.js`: this script will handle the audio logic</li>
  </ul>
  
## Implementation Timeline
  <b>Day 1: </b>Setup webpack and webpack.config.js. Create basic entry file and skeleton of classes that I may need. Goals for the day:
  - [ ] Get webpack up and running
  - [ ] Determine what files I'll need, and write basic logic of each
  
  <b>Day 2: </b>Create the basic simulation. Cannon should be able to move and duck should be able to launch and bounce. Cannon speed should be displayed. Goals for the day:
  - [ ] Complete duck rendering and functionality
  - [ ] Complete cannon rendering and functionality
  - [ ] Complete display of volatile speed
  
  <b>Day 3: </b>Duck should interact with random obstacles in the field. Player should be able to restart game. Goals for the day:
  - [ ] Implement obstacle/player collision.
  - [ ] Finish game over condition.
  
  <b>Over the weekend: </b>. Goals for the day:
  - [ ] Add Github/LinkedIn/Portfolio links
  - [ ] Finish styling page
  - [ ] Iron out project
  
  ## Bonus features
  
  There are many directions in which this project could evolve.
   - [ ] Implement more interactive obstacles
   - [ ] Allow the user to customize the duck
   - [ ] Add a leaderboard
   - [ ] Allow user to add upgrades to cannon based on score
