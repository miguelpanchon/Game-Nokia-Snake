export class Game {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.canvas.classList.add('game-board');

        this.container = document.createElement('div');
        this.container.classList.add('game-container');
        this.container.appendChild(this.canvas);
    }

    init() {
        // Add to the DOM
        document.body.appendChild(this.container);
        // Start game loop
        this.gameLoop();
    }

    gameLoop() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw grid (optional, helps visualize the game board)
        this.drawGrid();

        // Request next frame
        requestAnimationFrame(() => this.gameLoop());
    }

    drawGrid() {
        const gridSize = 10; // Size of each cell
        this.ctx.strokeStyle = '#a8b596'; // Slightly lighter than background

        // Draw vertical lines
        for (let x = 0; x <= this.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }

        // Draw horizontal lines
        for (let y = 0; y <= this.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }
}
