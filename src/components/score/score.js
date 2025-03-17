// src/components/score/score.js

export class Score {
    constructor() {
        this.score = 0;
        this.highScore = localStorage.getItem('snakeHighScore') || 0;
    }

    addPoints(points) {
        this.score += points;
        this.updateHighScore();
    }

    updateHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('snakeHighScore', this.highScore);
        }
    }

    reset() {
        this.score = 0;
    }

    display(ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px Arial';
        ctx.fillText(`Score: ${this.score}`, 10, 20);
        ctx.fillText(`High Score: ${this.highScore}`, 10, 40);
    }
}
