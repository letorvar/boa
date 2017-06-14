var canvasSize = 500;
var boardSize = 20;
var tileSize = canvasSize / boardSize;
var boaFrank = new Boa();
var meat = new Food();
var bg;

function setup() {
    createCanvas(canvasSize, canvasSize);
    boaFrank.body.push(createVector(boardSize / 2, boardSize / 2));
    boaFrank.body.push(createVector(boardSize / 2 - 1, boardSize / 2));
    boaFrank.body.push(createVector(boardSize / 2 - 2, boardSize / 2));
    boaFrank.body.push(createVector(boardSize / 2 - 3, boardSize / 2));
    boaFrank.body.push(createVector(boardSize / 2 - 4, boardSize / 2));
    boaFrank.body.push(createVector(boardSize / 2 - 5, boardSize / 2));

    bg = loadImage('img/background.jpg');
}

function Boa() {
    this.body = [];
    this.direction = 'RIGHT';
    this.color = "#E9C46A";
    this.eat = function() {
        var head = this.body[this.body.length - 1];
        var foodDistance = dist(head.x, head.y, meat.x, meat.y);
        if(meat.x === head.x && meat.y === head.y) {
            this.body.push(createVector(meat.x, meat.y));
            meat = new Food();
        }
    }
    this.move = function() {
        var head = this.body[this.body.length - 1];
        for (var i = 0; i < this.body.length - 1; i++) {
            this.body[i] = this.body[i + 1];
        }
        this.body[this.body.length - 1] = this.nextStep(head.x, head.y, this.direction, boardSize);
    }
    this.nextStep = function(x,y, direction, boardSize){
        if (direction === 'RIGHT') {
            return createVector((x + 1) % boardSize,y);
        } else if (direction === 'LEFT') {
            return createVector((x - 1 + boardSize) % boardSize,y);
        } else if (direction === 'UP') {
            return createVector(x, (y - 1 + boardSize) % boardSize);
        } else if (direction === 'DOWN') {
            return createVector(x, (y + 1) % boardSize);
        }
    }
}

function Food() {
    this.x = Math.floor(Math.random() * boardSize);
    this.y = Math.floor(Math.random() * boardSize);
    this.color = "#E76F51";
}

function keyPressed() {
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

function draw() {
    frameRate(5);
    noStroke();
    background(bg);
    // for (var x = 0; x < boardSize; x++) {
    //     for (var y = 0; y < boardSize; y++) {
    //         fill(42,157,142, 100);
    //         rect(x * tileSize, y * tileSize, tileSize, tileSize);
    //     }
    // }

    for (var i = 0; i < boaFrank.body.length; i++) {
        fill(boaFrank.color);
        rect((boaFrank.body[i].x) * tileSize, (boaFrank.body[i].y) * tileSize, tileSize, tileSize);
    }

    boaFrank.eat(meat);
    boaFrank.move();
    fill(meat.color);
    rect(meat.x * tileSize, meat.y * tileSize, tileSize, tileSize);
}