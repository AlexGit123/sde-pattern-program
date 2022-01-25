import Loop from './Loop';
import Entity from './Entity';

/**
 * Singleton & Facade Pattern
 */
export default class Game {
  private static instance: Game;
  private canvasElement: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private loop: Loop;
  private mouse: Mouse;

  private entities: Entity[];

  private constructor() {    
    this.entities = [];
    this.entities.push(new Entity('Bob'));

    // Canvas initialization
    this.canvasElement = document.getElementById("game") as HTMLCanvasElement;
    this.canvasElement.width = 512;
    this.canvasElement.height = 512;
    this.ctx = this.canvasElement.getContext("2d") as CanvasRenderingContext2D;

    // Game loop initialization
    this.loop = new Loop(this.update, this.draw);
   
    // Mouse initialization
    this.mouse = new Mouse(this.canvasElement);
    this.mouse.onClick(this.onClick);
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
    this.entities.forEach((entity) => entity.update());
    console.log('Updated');
  }

  draw() {
    this.entities.forEach((entity) => entity.draw(this.ctx));
  }

  stop() {
    this.loop.stop();
  }

  onClick(x: number, y: number) {
    console.log(x, y);
  }
}
