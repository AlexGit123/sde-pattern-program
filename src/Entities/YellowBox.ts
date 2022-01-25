import Entity from "../Entity";

export default class YellowBox extends Entity {
  constructor(
    name = "Yellow Box",
    x = 256,
    y = 256,
    width = 32,
    height = 32,
    color = "#FFD866"
  ) {
    super(name, x, y, width, height, color);
  }
}
