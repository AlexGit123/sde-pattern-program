import Loop from "./Loop";
import Entity from "./Entity";
import BlueBox from "./Entities/BlueBox";
import RedBox from "./Entities/RedBox";
import GreenBox from "./Entities/GreenBox";
import YellowBox from "./Entities/YellowBox";

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
    this.entities.push(new Entity("Bob"));

    // Canvas initialization
    this.canvasElement = document.getElementById("game") as HTMLCanvasElement;
    this.canvasElement.width = 512;
    this.canvasElement.height = 512;
    this.ctx = this.canvasElement.getContext("2d") as CanvasRenderingContext2D;

    // Game loop initialization
    this.loop = new Loop(this);

    // Mouse initialization
    this.mouse = new Mouse(this.canvasElement);
    this.mouse.onClick((x, y) => this.onClick(x, y));
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
    console.log("Updated");
    this.entities.sort((a, b) => a.y - b.y);
  }

  draw() {
    this.ctx.fillStyle = "#FDF9F3";
    this.ctx.fillRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    this.entities.forEach((entity) => entity.draw(this.ctx));
  }

  stop() {
    this.loop.stop();
  }

  onClick(x: number, y: number) {
    console.log(x, y);
    this.entities.push(new BlueBox("Blue", x, y));
    this.entities.push(new GreenBox("Green", x, y));
    this.entities.push(new RedBox("Red", x, y));
    this.entities.push(new YellowBox("Yellow", x, y));
  }
}
