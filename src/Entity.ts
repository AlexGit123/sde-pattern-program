/**
 * Template method
 */
class Entity {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private color: string;

    constructor(x = 256, y = 256, width = 32, height = 32, color = 'black') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    public update() {
        this.x += this.getRandomInt(-16, 16);
        this.y += this.getRandomInt(-16, 16);
    }

    public draw(ctx: CanvasRenderingContext2D) {

    }

    private getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * max);
    }
}