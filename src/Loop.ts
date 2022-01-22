export default class Loop {
  private update: () => void;
  private draw: () => void;
  private isRunning: boolean;

  constructor(update: () => void, draw: () => void) {
    this.update = update;
    this.draw = draw;
    this.isRunning = false;
  }

  start() {
    this.isRunning = true;
    this.step();
  }

  stop() {
    this.isRunning = false;
  }

  private step() {
    if (!this.isRunning) return;

    this.update();
    this.draw();
    requestAnimationFrame(() => this.step());
  }
}
