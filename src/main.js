// src/main.js
import { Game } from './components/game/game.js';

document.addEventListener('DOMContentLoaded', () => {
    // Create wrapper
    const gameWrapper = document.createElement('div');
    gameWrapper.className = 'game-wrapper';
    gameWrapper.style.textAlign = 'center';

    // Create title
    const gameTitle = document.createElement('h1');
    gameTitle.textContent = 'Snake Game';
    gameTitle.style.color = '#fff';
    gameTitle.style.marginBottom = '20px';

    // Create score display
    const scoreDisplay = document.createElement('div');
    scoreDisplay.id = 'scoreDisplay';
    scoreDisplay.textContent = 'Score: 0';
    scoreDisplay.style.color = '#fff';
    scoreDisplay.style.marginBottom = '20px';
    scoreDisplay.style.fontSize = '20px';

    // Add canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'gameCanvas';
    canvas.style.border = '2px solid #fff';

    // Add start button
    const startButton = document.createElement('button');
    startButton.textContent = 'Start Game';
    startButton.style.marginTop = '20px';
    startButton.style.padding = '10px 20px';
    startButton.style.fontSize = '16px';
    startButton.style.cursor = 'pointer';
    startButton.style.backgroundColor = '#2ecc71';
    startButton.style.border = 'none';
    startButton.style.color = '#fff';
    startButton.style.borderRadius = '5px';

    // Create controls info
    const controlsInfo = document.createElement('div');
    controlsInfo.style.color = '#fff';
    controlsInfo.style.marginTop = '20px';
    controlsInfo.innerHTML = `
        <p>Controls:</p>
        <p>Arrow Keys to move</p>
        <p>Space to pause</p>
    `;

    // Append all elements to wrapper
    gameWrapper.appendChild(gameTitle);
    gameWrapper.appendChild(scoreDisplay);
    gameWrapper.appendChild(canvas);
    gameWrapper.appendChild(startButton);
    gameWrapper.appendChild(controlsInfo);
    document.body.appendChild(gameWrapper);

    // Initialize game
    const game = new Game('gameCanvas');

    // Bind start button
    startButton.addEventListener('click', () => {
        if (game.isPaused) {
            game.isPaused = false;
            startButton.textContent = 'Pause Game';
            game.gameLoop();
        } else {
            game.isPaused = true;
            startButton.textContent = 'Resume Game';
        }
        startButton.blur(); // Remove focus from button
    });

    // Start the game
    game.start();

    // Update score display
    setInterval(() => {
        scoreDisplay.textContent = `Score: ${game.score}`;
    }, 100);
});
