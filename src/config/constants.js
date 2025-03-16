// src/config/constants.js
export const GRID_SIZE = 30;
export const CELL_SIZE = 12;

export const GAME_SPEED = 100;
export const CANVAS_SIZE = GRID_SIZE * CELL_SIZE;
export const INITIAL_SNAKE_LENGTH = 3;

export const DIRECTIONS = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right'
};

export const GAME_STATES = {
    MENU: 'menu',
    PLAYING: 'playing',
    PAUSED: 'paused',
    GAME_OVER: 'gameOver'
};
