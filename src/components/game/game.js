import { Snake } from '../snake/snake.js';
import { Food } from '../food/food.js';
import { GRID_SIZE, CELL_SIZE } from '../../config/constants.js';

export class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        // Set canvas size based on grid
        this.canvas.width = GRID_SIZE * CELL_SIZE;
        this.canvas.height = GRID_SIZE * CELL_SIZE;

        this.snake = new Snake();
        this.food = new Food();
        this.score = 0;
        this.isGameOver = false;
        this.isPaused = true;
        this.isNightMode = localStorage.getItem('nightMode') === 'true' || false; // Track current mode

        // Load sounds
        this.gameSound = new Audio('/assets/sounds/playing-game-clip.mp3'); // Sound for gameplay
        this.eatingSound = new Audio('/assets/sounds/munching-clip.mp3'); // Sound for eating
        this.gameSound.loop = true; // Enable looping for gameplay sound

        this.gameOverSound = new Audio('/assets/sounds/game_over-clip.mp3'); // Sound for game over
        this.pauseSound = new Audio('/assets/sounds/silence-clip.mp3'); // Sound for pause

        // Bind methods
        this.handleKeyPress = this.handleKeyPress.bind(this);

        // Add event listeners
        document.addEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress(event) {
        if (event.code === 'F1') {
            this.toggleNightMode(); // Toggle night/light mode
        }

        if (this.isGameOver) {
            if (event.code === 'Space') {
                this.restart(); // Restart the game
            }
            return;
        }

        if (event.code === 'Space') {
            this.isPaused = !this.isPaused; // Toggle pause
            if (!this.isPaused) {
                this.gameLoop(); // Start the game loop if unpaused
                this.gameSound.play().catch(error => console.log("Audio play error:", error)); // Play gameplay sound
                this.gameSound.currentTime = 0; // Reset playback to start
                this.pauseSound.pause(); // Stop the silent sound
                this.pauseSound.currentTime = 0; // Reset playback to start
            } else {
                this.gameSound.pause(); // Stop the game sound when paused
                this.gameSound.currentTime = 0; // Reset playback to start
                this.pauseSound.play().catch(error => console.log("Audio play error:", error)); // Play silent sound when paused
            }
            return;
        }

        if (this.isPaused) {
            return; // Prevent direction change when paused
        }

        const keyDirections = { // Map key codes to directions
            'ArrowUp': 'up',
            'ArrowDown': 'down',
            'ArrowLeft': 'left',
            'ArrowRight': 'right'
        };

        if (keyDirections[event.code]) { // Change direction based on key press
            this.snake.setDirection(keyDirections[event.code]);
        }
    }

    toggleNightMode() {
        this.isNightMode = !this.isNightMode; // Toggle the mode
    }

    update() {
        this.spawnPowerUps(); // Call to spawn power-ups
        this.checkForObstacles(); // Call to check for obstacles

        if (this.isGameOver || this.isPaused) return;

        this.snake.move();

        // Check for collisions
        if (this.snake.checkCollision()) {
            this.isGameOver = true;
            this.gameSound.pause(); // Stop the gameplay sound
            this.gameOverSound.play().catch(error => console.log("Audio play error:", error)); // Play game over sound

            return;
        }

        // Check for food collision
        const head = this.snake.body[0];
        if (head.x === this.food.position.x && head.y === this.food.position.y) {
            this.score += this.food.type === 'special' ? 20 : 10; // Different points for food types

            this.snake.grow();
            this.eatingSound.play().catch(error => console.log("Audio play error:", error)); // Play eating sound

            this.food.spawn(this.snake.body);
        }
    }

    spawnPowerUps() {
        // Logic to spawn power-ups after reaching a score of 150
        if (this.score >= 150) {
            // Example: spawn a power-up at a random position
            const powerUp = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };
        }
    }

    checkForObstacles() {
        // Logic to introduce obstacles after reaching a score of 150
        if (this.score >= 150) {
            const obstacle = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };
        }
    }

    draw() {
        this.ctx.fillStyle = this.isNightMode ? '#2c3e50' : '#ecf0f1'; // Night mode vs light mode
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.food.draw(this.ctx);
        this.snake.draw(this.ctx);

        this.ctx.fillStyle = this.isNightMode ? '#ecf0f1' : '#2c3e50'; // Change text color based on mode
        this.ctx.font = '20px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`Score: ${this.score}`, 10, 30);

        if (this.isGameOver) {
            this.drawOverlay(
                'Game Over!',
                `Final Score: ${this.score} - Press SPACE to restart\nUse the arrows to control the snake`
            );
        } else if (this.isPaused) {
            const bestScores = this.getBestScores();
            this.drawOverlay(
                'Snake Game',
                `Your best 3 scores are: ${bestScores.join(', ')}\n\nPress F1 to toggle night/light mode`
            );
        }
    }

    drawOverlay(mainText, subText) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#fff';
        this.ctx.font = '32px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(mainText, this.canvas.width / 2, this.canvas.height / 2 - 20);

        if (subText) {
            this.ctx.font = '16px Arial';
            const maxWidth = this.canvas.width - 40;
            const words = subText.split(' ');
            let lines = [];
            let currentLine = words[0];

            for (let i = 1; i < words.length; i++) {
                const testLine = currentLine + ' ' + words[i];
                const metrics = this.ctx.measureText(testLine);

                if (metrics.width > maxWidth) {
                    lines.push(currentLine);
                    currentLine = words[i];
                } else {
                    currentLine = testLine;
                }
            }
            lines.push(currentLine);

            lines.forEach((line, index) => {
                this.ctx.fillText(
                    line,
                    this.canvas.width / 2,
                    this.canvas.height / 2 + 20 + (index * 20)
                );
            });
        }
    }

    speed = 100; // Speed of the game in milliseconds

    gameLoop() {
        if (!this.isPaused) {
            this.update();
            this.draw();
            setTimeout(() => this.gameLoop(), this.speed); // Control the game loop speed
        }
    }

    saveScore() {
        const scores = JSON.parse(localStorage.getItem('bestScores')) || [];
        scores.push(this.score);
        scores.sort((a, b) => b - a); // Sort scores in descending order
        localStorage.setItem('bestScores', JSON.stringify(scores.slice(0, 3))); // Keep only top 3 scores
    }

    restart() {
        this.saveScore(); // Save the score to local storage
        this.snake = new Snake();
        this.food = new Food();
        this.score = 0;
        this.isGameOver = false;
        this.isPaused = true;
        this.draw();
    }

    getBestScores() {
        const scores = JSON.parse(localStorage.getItem('bestScores')) || [];
        return scores.slice(0, 3); // Return top 3 scores
    }

    start() {
        const bestScores = this.getBestScores();
        this.drawOverlay(
            'Snake Game',
            `Your best 3 scores are: ${bestScores.join(', ')}`
        );
        this.draw();
    }
}
