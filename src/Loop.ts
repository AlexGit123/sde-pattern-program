import Game from "./Game";

export default class Loop {
  private game: Game;
  private isRunning: boolean;

  constructor(game: Game) {
    this.isRunning = false;
    this.game = game;
  }

  start() {
    this.isRunning = true;
    this.step();
  }

  stop() {
    this.isRunning = false;
  }

  private step() {
    if (!this.isRunning) return;

    this.game.update();
    this.game.draw();
    requestAnimationFrame(() => this.step());
  }
}
