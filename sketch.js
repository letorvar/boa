var canvasSize = 500;
var boardSize = 50;
var tileSize = canvasSize / boardSize;
var boaFrank = new Boa();
var meat = new Food(boaFrank);
var bg;
var hasMoved = false;

function setup() {
    var canvas = createCanvas(canvasSize, canvasSize);
    canvas.parent('sketch-holder');
    boaFrank.newGame();
    meat.newFood();
}

function Boa() {
    this.body = [];
    this.direction = 'RIGHT';
    this.color = "#E9C46A";

    this.eat = function() {
        var head = this.body[this.body.length - 1];
        if (meat.x === head.x && meat.y === head.y) {
            this.body.push(createVector(meat.x, meat.y));
            meat.newFood();
        }
    }
    this.getHead = function() {
        return this.body[this.body.length - 1];
    }
    this.move = function() {
        var head = this.getHead();
        for (var i = 0; i < this.body.length - 1; i++) {
            this.body[i] = this.body[i + 1];
        }
        this.body[this.body.length - 1] = this.nextStep(head.x, head.y, this.direction, boardSize);
        if (this.checkIfBite()) {
            this.newGame();
            meat.newFood();
        }
        hasMoved = false;
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
    this.newGame = function() {
        this.body = [];
        this.body.push(createVector(boardSize / 2, boardSize / 2));
    }
}

function Food() {
    this.x = Math.floor(Math.random() * boardSize);
    this.y = Math.floor(Math.random() * boardSize);
    this.color = "#E76F51";
    this.newFood = function() {
        while (this.isFoodInConflictWithBoa()) {
            this.x = Math.floor(Math.random() * boardSize);
            this.y = Math.floor(Math.random() * boardSize);
        }
    }


    this.isFoodInConflictWithBoa = function() {
        for (var i = 0; i < boaFrank.body.length; i++) {
            var partOfSnake = boaFrank.body[i];
            if (partOfSnake.x === this.x, partOfSnake.y === this.y) {
                return true;
            }
        }
        return false;
    }

}

function keyPressed() {
    if (!hasMoved) {
        if (keyCode === LEFT_ARROW && boaFrank.direction !== 'RIGHT') {
            boaFrank.direction = 'LEFT';
        } else if (keyCode === RIGHT_ARROW && boaFrank.direction !== 'LEFT') {
            boaFrank.direction = 'RIGHT';
        } else if (keyCode === DOWN_ARROW && boaFrank.direction !== 'UP') {
            boaFrank.direction = 'DOWN';
        } else if (keyCode === UP_ARROW && boaFrank.direction !== 'DOWN') {
            boaFrank.direction = 'UP';
        }
    }
    hasMoved = true;
}

function draw() {
    frameRate(5 + boaFrank.body.length);
    noStroke();
    for (var x = 0; x < boardSize; x++) {
        for (var y = 0; y < boardSize; y++) {
            fill(42, 157, 142, 100);
            rect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }

    for (var i = 0; i < boaFrank.body.length; i++) {
        fill(boaFrank.color);
        rect((boaFrank.body[i].x) * tileSize, (boaFrank.body[i].y) * tileSize, tileSize, tileSize);
    }

    boaFrank.eat();
    boaFrank.move();
    fill(meat.color);
    rect(meat.x * tileSize, meat.y * tileSize, tileSize, tileSize);
}