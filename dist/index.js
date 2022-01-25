define("Entity", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Template method
     */
    class Entity {
        constructor(name, x = 256, y = 256, width = 32, height = 32, color = "black") {
            this.name = name;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;
        }
        update() {
            this.x += this.getRandomInt(-4, 4);
            this.y += this.getRandomInt(-4, 4);
        }
        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.font = "16px Monospace";
            ctx.fillText(this.name, this.x, this.y);
        }
        getRandomInt(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }
    }
    exports.default = Entity;
});
define("Loop", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Loop {
        constructor(game) {
            this.isRunning = false;
            this.game = game;
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
            this.game.update();
            this.game.draw();
            requestAnimationFrame(() => this.step());
        }
    }
    exports.default = Loop;
});
define("Game", ["require", "exports", "Loop", "Entity"], function (require, exports, Loop_1, Entity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Singleton & Facade Pattern
     */
    class Game {
        constructor() {
            this.entities = [];
            this.entities.push(new Entity_1.default("Bob"));
            // Canvas initialization
            this.canvasElement = document.getElementById("game");
            this.canvasElement.width = 512;
            this.canvasElement.height = 512;
            this.ctx = this.canvasElement.getContext("2d");
            // Game loop initialization
            this.loop = new Loop_1.default(this);
            // Mouse initialization
            this.mouse = new Mouse(this.canvasElement);
            this.mouse.onClick((x, y) => this.onClick(x, y));
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
            this.entities.forEach((entity) => entity.update());
            console.log("Updated");
        }
        draw() {
            this.ctx.fillStyle = "white";
            this.ctx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
            this.entities.forEach((entity) => entity.draw(this.ctx));
        }
        stop() {
            this.loop.stop();
        }
        onClick(x, y) {
            console.log(x, y);
            this.entities.push(new Entity_1.default("Y", x, y));
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
define("Entities/BlueBox", ["require", "exports", "Entity"], function (require, exports, Entity_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BlueBox extends Entity_2.default {
    }
});
define("Entities/GreenBox", ["require", "exports", "Entity"], function (require, exports, Entity_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GreenBox extends Entity_3.default {
    }
});
define("Entities/RedBox", ["require", "exports", "Entity"], function (require, exports, Entity_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RedBox extends Entity_4.default {
    }
});
define("Entities/YellowBox", ["require", "exports", "Entity"], function (require, exports, Entity_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class YellowBox extends Entity_5.default {
    }
});
//# sourceMappingURL=index.js.map