import Game from './Game.js';

// Launch game
const game = Game.getInstance();
game.start();

setTimeout(() => {
game.stop();
}, 2000);