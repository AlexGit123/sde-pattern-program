import Entity from "../Entity";

export default class GreenBox extends Entity {
  constructor(
    name = "Green Box",
    x = 256,
    y = 256,
    width = 32,
    height = 32,
    color = "#A9DC76"
  ) {
    super(name, x, y, width, height, color);
  }
}
