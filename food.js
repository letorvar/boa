function Food() {
    this.x = Math.floor(Math.random() * game.boardSize);
    this.y = Math.floor(Math.random() * game.boardSize);
    this.color = "#E76F51";
    this.newFood = function(snake) {
        while (this.isFoodInConflictWithBoa(snake)) {
            this.x = Math.floor(Math.random() * game.boardSize);
            this.y = Math.floor(Math.random() * game.boardSize);
        }
    }

    this.isFoodInConflictWithBoa = function(snake) {
        for (var i = 0; i < snake.body.length; i++) {
            var partOfSnake = snake.body[i];
            if (partOfSnake.x === this.x, partOfSnake.y === this.y) {
                return true;
            }
        }
        return false;
    }

}