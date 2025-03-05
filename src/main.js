// Game constants
const CANVAS_SIZE = 400;
const GRID_SIZE = 20;
const CELL_SIZE = CANVAS_SIZE / GRID_SIZE;
const NOKIA_GREEN = '#84A676';
const NOKIA_BG = '#9CA594';
const SNAKE_COLOR = '#2D3B2D';

// Game states
const GAME_STATES = {
    MENU: 'menu',
    PLAYING: 'playing',
    GAMEOVER: 'gameover'
};

// Game variables
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = 'right';
let gameLoop;
let score = 0;
let currentGameState = GAME_STATES.MENU;

// Setup canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// Game functions
function drawSnake() {
    ctx.fillStyle = SNAKE_COLOR;
    snake.forEach(segment => {
        ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
    });
}

function drawFood() {
    ctx.fillStyle = SNAKE_COLOR;
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
}

function drawScore() {
    ctx.fillStyle = SNAKE_COLOR;
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function drawBorder() {
    ctx.strokeStyle = SNAKE_COLOR;
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
    };
    // Prevent food from spawning on snake
    while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        food = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };
    }
}

function checkCollision() {
    const head = snake[0];

    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        return true;
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function drawMenu() {
    ctx.fillStyle = SNAKE_COLOR;
    ctx.font = '30px Arial';
    ctx.fillText('SNAKE GAME', CANVAS_SIZE / 4, CANVAS_SIZE / 2);
    ctx.font = '20px Arial';
    ctx.fillText('Press SPACE to Start', CANVAS_SIZE / 4, CANVAS_SIZE / 2 + 40);
}

function gameOver() {
    currentGameState = GAME_STATES.GAMEOVER;
    clearInterval(gameLoop);
    ctx.fillStyle = SNAKE_COLOR;
    ctx.font = '30px Arial';
    ctx.fillText('Game Over!', CANVAS_SIZE / 4, CANVAS_SIZE / 2);
    ctx.font = '20px Arial';
    ctx.fillText(`Final Score: ${score}`, CANVAS_SIZE / 4, CANVAS_SIZE / 2 + 40);
    ctx.fillText('Press SPACE to Restart', CANVAS_SIZE / 4, CANVAS_SIZE / 2 + 80);
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = 'right';
    score = 0;
    generateFood();
}

function update() {
    ctx.fillStyle = NOKIA_BG;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    switch (currentGameState) {
        case GAME_STATES.MENU:
            drawMenu();
            break;
        case GAME_STATES.PLAYING:
            moveSnake();
            if (checkCollision()) {
                gameOver();
                return;
            }
            drawFood();
            drawSnake();
            drawScore();
            break;
        case GAME_STATES.GAMEOVER:
            drawFood();
            drawSnake();
            drawScore();
            break;
    }
    drawBorder();
}

// Controls
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if (currentGameState === GAME_STATES.MENU ||
            currentGameState === GAME_STATES.GAMEOVER) {
            currentGameState = GAME_STATES.PLAYING;
            resetGame();
            clearInterval(gameLoop);
            gameLoop = setInterval(update, 100);
        }
        return;
    }

    if (currentGameState !== GAME_STATES.PLAYING) return;

    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});

// Start game loop
update();
