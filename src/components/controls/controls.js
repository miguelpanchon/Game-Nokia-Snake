// src/components/controls/controls.js

export class Controls {
    constructor(game) {
        this.game = game;
        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener('keydown', (event) => {
            this.handleKeyPress(event);
        });
    }

    handleKeyPress(event) {
        const keyDirections = {
            'ArrowUp': 'up',
            'ArrowDown': 'down',
            'ArrowLeft': 'left',
            'ArrowRight': 'right',
            'Space': 'pause'
        };

        if (keyDirections[event.code]) {
            if (event.code === 'Space') {
                this.game.togglePause(); // Toggle pause
            } else {
                this.game.snake.setDirection(keyDirections[event.code]); // Change direction
            }
        }
    }
}
