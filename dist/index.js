/**
 * Template method
 */
class Entity {
    constructor(x = 256, y = 256, width = 32, height = 32, color = 'black') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    update() {
        this.x += this.getRandomInt(-16, 16);
        this.y += this.getRandomInt(-16, 16);
    }
    draw(ctx) {
    }
    getRandomInt(min, max) {
        return Math.floor(Math.random() * max);
    }
}
define("Loop", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Loop {
        constructor(update, draw) {
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
        step() {
            if (!this.isRunning)
                return;
            this.update();
            this.draw();
            requestAnimationFrame(() => this.step());
        }
    }
    exports.default = Loop;
});
define("Game", ["require", "exports", "Loop"], function (require, exports, Loop_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Facade Pattern
     */
    class Game {
        constructor() {
            this.canvasElement = document.getElementById("game");
            this.ctx = this.canvasElement.getContext("2d");
            this.loop = new Loop_js_1.default(this.update, this.draw);
        }
        static getInstance() {
            if (!Game.instance) {
                Game.instance = new Game();
            }
            return Game.instance;
        }
        start() {
            this.loop.start();
        }
        update() {
            console.log('Updated');
        }
        draw() { }
        stop() {
            this.loop.stop();
        }
    }
    exports.default = Game;
});
define("index", ["require", "exports", "Game"], function (require, exports, Game_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Launch game
    const game = Game_js_1.default.getInstance();
    game.start();
    setTimeout(() => {
        game.stop();
    }, 2000);
});
//# sourceMappingURL=index.js.map