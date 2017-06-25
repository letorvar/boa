function Boa() {
    this.body = [];
    this.direction = 'RIGHT';
    this.color = "#E9C46A";
    this.points = 10;
    this.hasMoved = false;

    this.eat = function(food) {
        var head = this.body[this.body.length - 1];
        if (food.x === head.x && food.y === head.y) {
            this.body.push(createVector(food.x, food.y));
            food.newFood(this);
            this.points += 10;
        }
    }
    this.getHead = function() {
        return this.body[this.body.length - 1];
    }
    this.move = function(boardSize) {
        var head = this.getHead();
        for (var i = 0; i < this.body.length - 1; i++) {
            this.body[i] = this.body[i + 1];
        }
        this.body[this.body.length - 1] = this.nextStep(head.x, head.y, this.direction, boardSize);
        if (this.checkIfBite()) {
            game.isGameRunning = false;
        }
        boaFrank.hasMoved = false;
    }
    this.checkIfBite = function() {
        var head = this.getHead();
        for (var i = 0; i < this.body.length - 1; i++) {
            var snakeElement = this.body[i];
            if (snakeElement.x === head.x && snakeElement.y === head.y) {
                return true;
            }
        }
        return false;
    }

    this.nextStep = function(x, y, direction, boardSize) {
        if (direction === 'RIGHT') {
            return createVector((x + 1) % boardSize, y);
        } else if (direction === 'LEFT') {
            return createVector((x - 1 + boardSize) % boardSize, y);
        } else if (direction === 'UP') {
            return createVector(x, (y - 1 + boardSize) % boardSize);
        } else if (direction === 'DOWN') {
            return createVector(x, (y + 1) % boardSize);
        }
    }
    this.newSnake = function(boardSize) {
        this.body = [];
        this.body.push(createVector(boardSize / 2, boardSize / 2));
        this.points = 10;
        
    }
}