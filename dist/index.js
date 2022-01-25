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
define("Game", ["require", "exports", "Loop"], function (require, exports, Loop_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Singleton & Facade Pattern
     */
    class Game {
        constructor() {
            // Canvas initialization
            this.canvasElement = document.getElementById("game");
            this.canvasElement.width = 512;
            this.canvasElement.height = 512;
            this.ctx = this.canvasElement.getContext("2d");
            // Game loop initialization
            this.loop = new Loop_1.default(this.update, this.draw);
            // Mouse initialization
            this.mouse = new Mouse(this.canvasElement);
            this.mouse.onClick(this.onClick);
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
        draw() {
        }
        stop() {
            this.loop.stop();
        }
        onClick(x, y) {
            console.log(x, y);
        }
    }
    exports.default = Game;
});
/**
 * Observer pattern
 */
class Mouse {
    constructor(canvas) {
        this.canvas = canvas;
        this.observers = { onClick: [], onMove: [] };
        // On click
        canvas.addEventListener('mouseup', (event) => {
            const { x, y } = this.getMousePosition(event);
            this.x = x;
            this.y = y;
            this.observers.onClick.forEach((observer) => observer(x, y));
        }, false);
        // On move
        canvas.addEventListener('mousemove', (event) => {
            const { x, y } = this.getMousePosition(event);
            this.x = x;
            this.y = y;
            this.observers.onMove.forEach((observer) => observer(x, y));
        }, false);
    }
    onMove(callback) {
        this.observers.onMove.push(callback);
    }
    onClick(callback) {
        this.observers.onClick.push(callback);
    }
    getMousePosition(event) {
        const { clientX, clientY } = event;
        const { left, top } = this.canvas.getBoundingClientRect();
        return {
            x: Math.floor(clientX - left),
            y: Math.floor(clientY - top)
        };
    }
}
define("index", ["require", "exports", "Game"], function (require, exports, Game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Launch game
    const game = Game_1.default.getInstance();
    game.start();
});
//# sourceMappingURL=index.js.map