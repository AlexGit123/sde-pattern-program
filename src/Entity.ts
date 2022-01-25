/**
 * Template method
 */
export default class Entity {
  public name: string;
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public color: string;

  constructor(
    name = "entity",
    x = 256,
    y = 256,
    width = 32,
    height = 32,
    color = "red"
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

    ctx.textAlign = "center";
    ctx.font = "16px monospace";
    ctx.fillText(this.name, this.x + this.width / 2, this.y - 4);
  }

  private getRandomInt(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }
}
