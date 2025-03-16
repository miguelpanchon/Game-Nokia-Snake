import { Snake } from './Snake.js';
import { Food } from '../food/food.js';

export class GameManager {
    constructor() {
        this.snake = new Snake();
        this.food = new Food(); // Initialize food object
        this.specialFood = null; // Placeholder for special food

        this.currentGameState = 'menu'; // Initial state
        this.restartGame = this.restartGame.bind(this); // Bind the restart method

        this.score = 0;
        this.highScore = localStorage.getItem('snakeHighScore') || 0;
        this.comboCounter = 0;
        this.lastFoodTime = Date.now();
        this.canvas = document.getElementById('gameCanvas');
        this.isPaused = false; // Initialize pause state
    }

    init() {
        // Initialize game components
        this.snake.init();
        this.food.generateFood();
        this.update();
        this.addEventListeners(); // Add event listeners for controls
    }

    update() {
        // Update game logic based on the current state
        if (this.currentGameState === 'playing' && !this.isPaused) {
            this.snake.move();

            // Check if snake eats food
            const head = this.snake.getHead();
            if (head.x === this.food.position.x && head.y === this.food.position.y) {
                this.handleFoodCollection();
            }

            if (this.snake.checkCollision()) {
                this.gameOver();
            }
        }
        this.render();
    }

    render() {
        // Render the game components
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.snake.draw(ctx);
        this.food.draw(ctx);

        // Draw score and combo
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px Arial';
        ctx.fillText(`Score: ${this.score}`, 10, 20);
        ctx.fillText(`High Score: ${this.highScore}`, 10, 40);
        if (this.comboCounter > 1) {
            ctx.fillStyle = '#ffcc00';
            ctx.fillText(`Combo x${this.comboCounter}!`, 10, 60);
        }

        // Display paused overlay
        if (this.isPaused) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.fillStyle = '#ffffff';
            ctx.font = '30px Arial';
            ctx.fillText('Paused', this.canvas.width / 2 - 50, this.canvas.height / 2);
        }
    }

    togglePause() {
        this.isPaused = !this.isPaused; // Toggle pause state
    }

    addEventListeners() {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                this.restartGame(); // Restart the game on SPACE key press
            }
            if (event.code === 'KeyP') {
                this.togglePause(); // Toggle pause on "P" key press
            }
        });
    }

    restartGame() {
        this.score = 0;
        this.comboCounter = 0;
        this.currentGameState = 'playing';
        this.init();
    }

    handleFoodCollection() { // Handle food collection and scoring
        const head = this.snake.getHead(); // Get the snake's head position

        // Check if special food should be generated
        if (Math.random() < 0.1) { // 10% chance to generate special food
            this.specialFood = { type: 'special', position: { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) } };
        }

        // Calculate points based on food type and combo
        const basePoints = this.food.type === 'special' ? 20 : 10; // Points for regular food
        if (this.specialFood && head.x === this.specialFood.position.x && head.y === this.specialFood.position.y) {
            this.score += 50; // Extra points for special food
            this.specialFood = null; // Reset special food after collection
        }

        if (this.specialFood && head.x === this.specialFood.position.x && head.y === this.specialFood.position.y) {
            this.score += 50; // Extra points for special food
            this.specialFood = null; // Reset special food after collection
        }

        const comboMultiplier = Math.min(5, 1 + this.comboCounter * 0.2); // Max 2x multiplier
        const points = Math.round(basePoints * comboMultiplier);

        this.score += points;
        this.snake.grow();
        this.food.generateFood(this.snake.body);

        // Update combo counter
        const currentTime = Date.now();
        if (currentTime - this.lastFoodTime < 2000) { // 2 second combo window
            this.comboCounter++;
        } else {
            this.comboCounter = 1;
        }
        this.lastFoodTime = currentTime;
    }

    gameOver() {
        this.gameSound?.pause(); // Stop the game sound immediately
        this.gameOverSound?.play(); // Play the game over sound
        this.gameOverSound.volume = 1; // Reset volume for the next game

        // Declare fadeOutInterval only once
        let fadeOutInterval = setInterval(() => {
            if (this.gameOverSound.volume > 0) {
                this.gameOverSound.volume -= 0.1; // Decrease volume
            } else {
                clearInterval(fadeOutInterval); // Stop fading out
                this.gameOverSound.pause(); // Stop the game over sound
            }
        }, 1000); // Decrease volume every second

        this.currentGameState = 'gameover';

        // Update high score if needed
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('snakeHighScore', this.highScore);
        }

        alert(`Game Over!\nFinal Score: ${this.score}\nHigh Score: ${this.highScore}\nPress SPACE to restart.`);
    }
}
