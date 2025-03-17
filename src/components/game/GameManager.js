import { TouchControls } from '../controls/touchControls.js';

export class GameManager {
    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.currentGameState = 'menu';
        this.touchControls = new TouchControls(this);
        this.loadUserPreference();
    }

    loadUserPreference() {
        const controlMethod = localStorage.getItem('controlMethod');
        if (controlMethod === 'touch') {
            this.touchControls.createButtons();
        }
    }

    // Other existing methods for managing game state, updating, etc.
    // ...
}
