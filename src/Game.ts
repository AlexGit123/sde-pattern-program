/**
 * Facade Pattern
 */
class Game {
  private static instance: Game;

  private constructor() {}

  public static getInstance() {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }

  update() {}

  draw() {}

  reset() {}
}
