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

  public currentX: number;
  public currentY: number;

  constructor(
    name = "Box",
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
    this.currentX = x;
    this.currentY = y;
  }

  public update() {
    this.x += this.getRandomInt(-16, 16);
    this.y += this.getRandomInt(-16, 16);

    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;

    if (this.x > 480) this.x = 480;
    if (this.y > 480) this.y = 480;

    this.currentX = this.lerp(this.currentX, this.x, 0.1);
    this.currentY = this.lerp(this.currentY, this.y, 0.1);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.currentX, this.currentY, this.width, this.height);

    ctx.textAlign = "center";
    ctx.font = "16px monospace";
    ctx.fillText(this.name, this.currentX + this.width / 2, this.currentY - 4);
  }

  private lerp(start: number, end: number, t: number): number {
      return start * (1 - t) + end * t;
  }

  private getRandomInt(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }
}
