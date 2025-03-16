// src/components/food/food.js
import { GRID_SIZE, CELL_SIZE } from '../../config/constants.js';

export class Food {
    constructor() {
        this.type = 'normal'; // New property to define food type

        this.position = { x: 0, y: 0 };
        this.generateFood(); // Generate initial position
        this.type = this.randomFoodType(); // Set random food type
    }

    generateFood(snakeBody = []) {
        let newPosition; // Initialize newPosition before the loop
        do {
            newPosition = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE)
            };

            // Ensure food does not spawn in the score area
            if (newPosition.x < 10 && newPosition.y < 30) {
                continue; // Skip this position
            }
        } while (this.isOnSnake(newPosition, snakeBody));

        this.position = newPosition;
    }

    isOnSnake(position, snakeBody) {
        return snakeBody.some(segment =>
            segment.x === position.x && segment.y === position.y
        );
    }

    randomFoodType() { // New method to randomly select food type
        const types = ['normal', 'special'];
        return types[Math.floor(Math.random() * types.length)];
    }

    spawn(snakeBody = []) { // New method to spawn food
        this.generateFood(snakeBody);
    }

    draw(ctx) {
        // Set color based on food type
        ctx.fillStyle = this.type === 'special' ? '#f39c12' : '#e74c3c'; // Different colors for different types

        ctx.fillRect(
            this.position.x * CELL_SIZE,
            this.position.y * CELL_SIZE,
            CELL_SIZE - 1,
            CELL_SIZE - 1
        );
    }
}
