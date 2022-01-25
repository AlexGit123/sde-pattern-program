import Entity from "../Entity";

export default class RedBox extends Entity {
  constructor(
    name = "Red Box",
    x = 256,
    y = 256,
    width = 32,
    height = 32,
    color = "red"
  ) {
    super(name, x, y, width, height, color);
  }
}
