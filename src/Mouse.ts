type MouseCallback = (x: number, y: number) => void;
type Observers = { onClick: MouseCallback[], onMove: MouseCallback[] };

/**
 * Observer pattern
 */
class Mouse {
    public x: number;
    public y: number;

    private canvas: HTMLCanvasElement;
    private observers: Observers;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.observers = { onClick: [], onMove: [] };

        // On click
        canvas.addEventListener('mouseup', (event) => {
            const { x, y } = this.getMousePosition(event);
            this.x = x;
            this.y = y;
            this.observers.onClick.forEach((observer) => observer(x, y))
        }, false);

        // On move
        canvas.addEventListener('mousemove', (event) => {
            const { x, y } = this.getMousePosition(event);
            this.x = x;
            this.y = y;
            this.observers.onMove.forEach((observer) => observer(x, y))
        }, false);
    }

    public onMove(callback: MouseCallback): void {
        this.observers.onMove.push(callback);
    }

    public onClick(callback: MouseCallback): void {
        this.observers.onClick.push(callback);
    }

    private getMousePosition(event: MouseEvent): { x: number, y: number } {
        const { clientX, clientY } = event;
        const { left, top } = this.canvas.getBoundingClientRect();

        return {
            x: Math.floor(clientX - left),
            y: Math.floor(clientY - top)
        };
    }
}