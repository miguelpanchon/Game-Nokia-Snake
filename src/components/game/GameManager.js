import { Snake } from './Snake.js';
import { Food } from '../food/food.js';

export class GameManager {
    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.currentGameState = 'menu'; // Initial state
        this.restartGame = this.restartGame.bind(this); // Bind the restart method

        this.score = 0;
    }

    init() {
        // Initialize game components
        this.snake.init();
        this.food.generateFood();
        this.update();
    }

    update() {
        // Update game logic based on the current state
        if (this.currentGameState === 'playing') {
            this.snake.move();
            if (this.snake.checkCollision()) {
                this.gameOver();
            }
        }
        this.render();
    }

    render() {
        // Render the game components
        this.snake.draw();
        this.food.draw();
        // Additional rendering logic
    }

    restartGame() {
        this.score = 0; // Reset score
        this.currentGameState = 'playing'; // Set state to playing
        this.init(); // Reinitialize game components
    }

    gameOver() {

        this.gameSound.pause(); // Stop the game sound immediately
        this.gameOverSound.play(); // Play the game over sound
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
        // Handle game over logic
        alert(`Game Over! Your final score is: ${this.score}. Press SPACE to restart.`);
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                this.restartGame(); // Restart the game on SPACE key press
            }
        });

    }
}
