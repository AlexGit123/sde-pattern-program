import Loop from './Loop.js';

/**
 * Facade Pattern
 */
export default class Game {
  private static instance: Game;
  private canvasElement: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private loop: Loop;

  private constructor() {
    this.canvasElement = document.getElementById("game") as HTMLCanvasElement;
    this.ctx = this.canvasElement.getContext("2d") as CanvasRenderingContext2D;

    this.loop = new Loop(this.update, this.draw);
  }

  public static getInstance() {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }

  start() {
    this.loop.start();
  }

  update() {
    console.log('Updated');
  }

  draw() {}

  stop() {
    this.loop.stop();
  }
}
