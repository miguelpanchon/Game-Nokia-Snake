// src/components/snake/snake.js

import { GRID_SIZE, CELL_SIZE } from '../../config/constants';

export class Snake {
    constructor() {
        // Start with snake in the middle of the grid
        this.body = [
            { x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) }
        ];
        this.direction = 'right';
        this.nextDirection = 'right';
    }

    setDirection(newDirection) {
        // Prevent 180-degree turns
        const opposites = {
            'up': 'down',
            'down': 'up',
            'left': 'right',
            'right': 'left'
        };

        if (opposites[newDirection] !== this.direction) {
            this.nextDirection = newDirection;
        }
    }

    move() {
        // Update current direction
        this.direction = this.nextDirection;

        // Calculate new head position
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

        // Add new head to beginning of array
        this.body.unshift(head);

        // Remove tail unless snake is growing
        if (!this.growing) {
            this.body.pop();
        } else {
            this.growing = false;
        }
    }

    grow() {
        this.growing = true;
    }

    checkCollision() {
        const head = this.body[0];

        // Check wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
            return true;
        }

        // Check self collision (start from 1 to skip head)
        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }

        return false;
    }

    draw(ctx) {
        // Draw snake body
        this.body.forEach((segment, index) => {
            // Make head lighter (#2ecc71) than body (#1d8348)
            ctx.fillStyle = index === 0 ? '#2ecc71' : '#1d8348';
            ctx.fillRect(
                segment.x * CELL_SIZE,
                segment.y * CELL_SIZE,
                CELL_SIZE,
                CELL_SIZE
            );
        });
    }

    getHead() {
        return this.body[0];
    }

}
