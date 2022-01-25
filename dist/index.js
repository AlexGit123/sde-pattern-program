define("Entity", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Template method
     */
    class Entity {
        constructor(name = "Box", x = 256, y = 256, width = 32, height = 32, color = "black") {
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
            ctx.textAlign = "center";
            ctx.font = "16px monospace";
            ctx.fillText(this.name, this.x + this.width / 2, this.y - 4);
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
define("Entities/BlueBox", ["require", "exports", "Entity"], function (require, exports, Entity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BlueBox extends Entity_1.default {
        constructor(name = "Blue Box", x = 256, y = 256, width = 32, height = 32, color = "#AB9DF2") {
            super(name, x, y, width, height, color);
        }
    }
    exports.default = BlueBox;
});
define("Entities/RedBox", ["require", "exports", "Entity"], function (require, exports, Entity_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RedBox extends Entity_2.default {
        constructor(name = "Red Box", x = 256, y = 256, width = 32, height = 32, color = "#FF6188") {
            super(name, x, y, width, height, color);
        }
    }
    exports.default = RedBox;
});
define("Entities/GreenBox", ["require", "exports", "Entity"], function (require, exports, Entity_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GreenBox extends Entity_3.default {
        constructor(name = "Green Box", x = 256, y = 256, width = 32, height = 32, color = "#A9DC76") {
            super(name, x, y, width, height, color);
        }
    }
    exports.default = GreenBox;
});
define("Entities/YellowBox", ["require", "exports", "Entity"], function (require, exports, Entity_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class YellowBox extends Entity_4.default {
        constructor(name = "Yellow Box", x = 256, y = 256, width = 32, height = 32, color = "#FFD866") {
            super(name, x, y, width, height, color);
        }
    }
    exports.default = YellowBox;
});
define("Game", ["require", "exports", "Loop", "Entity", "Entities/BlueBox", "Entities/RedBox", "Entities/GreenBox", "Entities/YellowBox"], function (require, exports, Loop_1, Entity_5, BlueBox_1, RedBox_1, GreenBox_1, YellowBox_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Singleton & Facade Pattern
     */
    class Game {
        constructor() {
            this.entities = [];
            this.entities.push(new Entity_5.default("Bob"));
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
            this.entities.sort((a, b) => a.y - b.y);
        }
        draw() {
            this.ctx.fillStyle = "#FDF9F3";
            this.ctx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
            this.entities.forEach((entity) => entity.draw(this.ctx));
        }
        stop() {
            this.loop.stop();
        }
        onClick(x, y) {
            console.log(x, y);
            this.entities.push(new BlueBox_1.default("Blue", x, y));
            this.entities.push(new GreenBox_1.default("Green", x, y));
            this.entities.push(new RedBox_1.default("Red", x, y));
            this.entities.push(new YellowBox_1.default("Yellow", x, y));
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