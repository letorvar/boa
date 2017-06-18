function Game() {
    this.canvasSize = 500,
        this.boardSize = 36,
        this.tileSize = this.canvasSize / this.boardSize,
        this.isGameRunning = true

    this.showLooserInfo = function(points) {
        textSize(30);
        fill(0);
        text("YOUR SCORE: " + points, game.canvasSize / 2 - 190, game.canvasSize / 2);
        text("Press ENTER to start new game", game.canvasSize / 2 - 190, game.canvasSize / 2 + 55);
    }
}