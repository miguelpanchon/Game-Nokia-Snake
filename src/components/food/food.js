// src/components/food/food.js
import { GRID_SIZE, CELL_SIZE } from '../../config/constants.js';

export class Food {
    constructor() {
        this.type = 'normal'; // New property to define food type
        this.position = { x: 0, y: 0 };
        this.generateFood(); // Generate initial position
    }

    generateFood(snakeBody = [], snakeLength) {
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

        this.position = newPosition; // Update food position
        this.type = this.randomFoodType(snakeLength); // Set random food type based on snake length
    }

    isOnSnake(position, snakeBody) {
        return snakeBody.some(segment =>
            segment.x === position.x && segment.y === position.y
        );
    }

    randomFoodType(snakeLength) { // New method to randomly select food type based on snake length
        if (snakeLength < 20) {
            const types = ['red', 'orange', 'yellow']; // Food types for shorter snake
            return types[Math.floor(Math.random() * types.length)];
        } else {
            const types = ['yellow', 'orange', 'red']; // Food types for longer snake
            return types[Math.floor(Math.random() * types.length)];
        }
    }

    spawn(snakeBody = [], snakeLength) { // New method to spawn food
        this.generateFood(snakeBody, snakeLength);
    }

    draw(ctx) {
        // Set color based on food type
        ctx.fillStyle = this.type === 'red' ? '#e74c3c' : this.type === 'orange' ? '#f39c12' : '#f1c40f'; // Different colors for different types

        ctx.fillRect(
            this.position.x * CELL_SIZE,
            this.position.y * CELL_SIZE,
            CELL_SIZE - 1,
            CELL_SIZE - 1
        );
    }
}
