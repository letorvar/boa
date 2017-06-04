var canvasSize = 500;
var boardSize = 20;
var tileSize = canvasSize / boardSize;
var boaFrank = new Boa();

function setup() {
    createCanvas(canvasSize, canvasSize);

}

function Boa() {
    this.x = boardSize / 2;
    this.y = boardSize / 2;
    this.direction = 'RIGHT';
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
    frameRate(2);
    for (var x = 0; x < boardSize; x++) {
        for (var y = 0; y < boardSize; y++) {
            fill("#2A9D8F");
            rect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }
    fill("#E9C46A");
    rect(boaFrank.x * tileSize, boaFrank.y * tileSize, tileSize, tileSize);
    console.log(boaFrank.direction);
    if (boaFrank.direction === 'RIGHT') {
        boaFrank.x = (boaFrank.x + 1) % boardSize;
    } else if (boaFrank.direction === 'LEFT') {
        boaFrank.x = (boaFrank.x + boardSize - 1) % boardSize;
    } else if (boaFrank.direction === 'UP') {
        boaFrank.y = (boaFrank.y + boardSize - 1) % boardSize;
    } else if (boaFrank.direction === 'DOWN') {
        boaFrank.y = (boaFrank.y + boardSize + 1) % boardSize;
    }

}