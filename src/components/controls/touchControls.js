export class TouchControls {
    constructor(gameManager) {
        this.gameManager = gameManager;
        this.createButtons();
        this.loadUserPreference();
    }

    createButtons() {
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('touch-controls');

        const directions = ['up', 'down', 'left', 'right'];
        directions.forEach(direction => {
            const button = document.createElement('button');
            button.innerText = direction.charAt(0).toUpperCase() + direction.slice(1);
            button.addEventListener('click', () => {
                console.log(`Button pressed: ${direction}`); // Debugging log
                this.handleButtonPress(direction);
            });

            buttonContainer.appendChild(button);
        });

        document.body.appendChild(buttonContainer);
    }

    handleButtonPress(direction) {
        if (this.gameManager.currentGameState === 'playing') {
            this.gameManager.snake.setDirection(direction);
        }
    }

    loadUserPreference() {
        const controlMethod = localStorage.getItem('controlMethod');
        if (controlMethod === 'touch') {
            this.createButtons();
        }
    }

    saveUserPreference(method) {
        localStorage.setItem('controlMethod', method);
    }
}
