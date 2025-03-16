export class InputHandler { // Class to handle user input

    constructor(gameManager) { // Constructor to initialize InputHandler

        this.gameManager = gameManager;
        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener('keydown', (event) => {
            if (event.code === this.specialAbilityKey) { // Check for special ability key
                this.triggerSpecialAbility(); // Trigger special ability
                return;
            } else if (event.code === 'Space') {

                if (this.gameManager.currentGameState === 'menu' || this.gameManager.currentGameState === 'gameover') {
                    this.gameManager.currentGameState = 'playing';
                    this.gameManager.snake.init();
                    this.gameManager.food.generateFood();
                    this.gameManager.update();
                }
                return;
            }

            if (this.gameManager.currentGameState !== 'playing') return;

            switch (event.key) {
                case 'ArrowUp':
                    if (this.gameManager.snake.direction !== 'down') this.gameManager.snake.direction = 'up';
                    break;
                case 'ArrowDown':
                    if (this.gameManager.snake.direction !== 'up') this.gameManager.snake.direction = 'down';
                    break;
                case 'ArrowLeft':
                    if (this.gameManager.snake.direction !== 'right') this.gameManager.snake.direction = 'left';
                    break;
                case 'ArrowRight':
                    if (this.gameManager.snake.direction !== 'left') this.gameManager.snake.direction = 'right';
                    break;
            }
        });
    }
}
