/**
 * Template method
 */
export default class Entity {
  private name: string;
  private x: number;
  private y: number;
  private z: number;
  private width: number;
  private height: number;
  private color: string;

  constructor(
    name: string,
    x = 256,
    y = 256,
    width = 32,
    height = 32,
    color = "black"
  ) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  public update() {
    this.x += this.getRandomInt(-4, 4);
    this.y += this.getRandomInt(-4, 4);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.font = "16px Monospace";
    ctx.fillText(this.name, this.x, this.y);
  }

  private getRandomInt(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }
}
