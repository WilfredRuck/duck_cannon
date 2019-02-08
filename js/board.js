import Cannon from './cannon.js';
import Duck from './duck.js';
import Obstacle from './obstacle.js';

class Board {
  constructor(ctx) {
    this.cannon = new Cannon(ctx);
  }

}

export default Board;
