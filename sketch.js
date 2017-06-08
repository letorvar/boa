var canvasSize = 500;
var boardSize = 20;
var tileSize = canvasSize / boardSize;
var boaFrank = new Boa();
var meat = new Food();

function setup() {
    createCanvas(canvasSize, canvasSize);
    boaFrank.body.push(createVector(boardSize / 2, boardSize / 2));
    boaFrank.body.push(createVector(boardSize / 2 - 1, boardSize / 2));
    boaFrank.body.push(createVector(boardSize / 2 - 2, boardSize / 2));
    boaFrank.body.push(createVector(boardSize / 2 - 3, boardSize / 2));
    boaFrank.body.push(createVector(boardSize / 2 - 4, boardSize / 2));
    boaFrank.body.push(createVector(boardSize / 2 - 5, boardSize / 2));
}

function Boa() {
    this.body = [];
    this.direction = 'RIGHT';
    this.color = "#E9C46A";
    this.eat = function() {
        var head = this.body[this.body.length - 1];
        var foodDistance = dist(head.x, head.y, meat.x, meat.y);
        console.log(foodDistance);
        if (foodDistance < 1) {
            this.body.push(createVector(meat.x, meat.y));
            meat = new Food();
        }
    }
    this.move = function() {
        var head = this.body[this.body.length - 1];
        for (var i = 0; i < this.body.length - 1; i++) {
            this.body[i] = this.body[i + 1];
        }
        if (this.direction === 'RIGHT') {
            this.body[this.body.length - 1] = createVector((head.x + 1) % boardSize, head.y);
        } else if (this.direction === 'LEFT') {
            this.body[this.body.length - 1] = createVector((head.x - 1 + boardSize) % boardSize, head.y);
        } else if (this.direction === 'UP') {
            this.body[this.body.length - 1] = createVector(head.x, (head.y - 1 + boardSize) % boardSize);
        } else if (this.direction === 'DOWN') {
            this.body[this.body.length - 1] = createVector(head.x, (head.y + 1) % boardSize);
        }
    }
}

function Food() {
    this.x = Math.floor(Math.random() * boardSize);
    this.y = Math.floor(Math.random() * boardSize);
    this.color = "#E76F51";
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        boaFrank.direction = 'LEFT';
    } else if (keyCode === RIGHT_ARROW) {
        boaFrank.direction = 'RIGHT';
    } else if (keyCode === DOWN_ARROW) {
        boaFrank.direction = 'DOWN';
    } else if (keyCode === UP_ARROW) {
        boaFrank.direction = 'UP';
    }
}

function draw() {
    frameRate(5);
    for (var x = 0; x < boardSize; x++) {
        for (var y = 0; y < boardSize; y++) {
            fill("#2A9D8F");
            rect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }

    for (var i = 0; i < boaFrank.body.length; i++) {
        fill(boaFrank.color);
        rect((boaFrank.body[i].x) * tileSize, (boaFrank.body[i].y) * tileSize, tileSize, tileSize);
    }

    boaFrank.move();
    boaFrank.eat(meat);
    fill(meat.color);
    rect(meat.x * tileSize, meat.y * tileSize, tileSize, tileSize);
}