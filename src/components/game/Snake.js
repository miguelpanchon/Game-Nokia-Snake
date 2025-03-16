import { CELL_SIZE } from '../../config/constants.js';

export class Snake { // Class to represent the snake

    constructor() { // Initialize the snake

        this.body = [{ x: 0, y: 0 }]; // Initial position of the snake
        this.direction = 'right'; // Initial direction
    }

    init() {
        // Initialize the snake's position and direction
        this.body = [{ x: 0, y: 0 }];
        this.direction = 'right';
    }

    move() {
        // Move the snake in the current direction
        const head = { ...this.body[0] };

        switch (this.direction) {
            case 'up':
                head.y -= 1;
                break;
            case 'down':
                head.y += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'right':
                head.x += 1;
                break;
        }

        this.body.unshift(head); // Add new head to the front of the body
        this.body.pop(); // Remove the last segment of the snake
    }

    grow() {
        // Add a new segment to the snake's body
        const tail = { ...this.body[this.body.length - 1] };
        this.body.push(tail); // Duplicate the last segment to grow the snake
    }

    checkCollision() {
        // Check for collision with walls or itself
        const head = this.body[0];
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
            return true; // Collision with walls
        }

        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true; // Collision with itself
            }
        }

        return false; // No collision
    }

    setDirection(newDirection) {
        // Prevent the snake from reversing direction
        const oppositeDirection = {
            up: 'down',
            down: 'up',
            left: 'right',
            right: 'left'
        };

        if (newDirection !== oppositeDirection[this.direction]) {
            this.direction = newDirection; // Update direction
        }
    }

    getHead() {
        return this.body[0]; // Return the head of the snake
    }

    draw(ctx) {
        // Draw the snake on the canvas
        ctx.fillStyle = '#2ecc71'; // Color for the snake
        for (const segment of this.body) {
            ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
}
