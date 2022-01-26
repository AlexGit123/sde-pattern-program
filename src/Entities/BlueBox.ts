import Entity from "../Entity";

export default class BlueBox extends Entity {
  constructor(
    name = "Blue Box",
    x = 256,
    y = 256,
    width = 32,
    height = 32,
    color = "#AB9DF2"
  ) {
    super(name, x, y, width, height, color);
  }

  public update() {
    super.update();
    this.x -= 0.5;
    this.y -= 0.5;
  }
}
