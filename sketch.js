var canvasSize = 500;
var boardSize = 20;
var tileSize = canvasSize / boardSize;
var boa;

function setup() {
    createCanvas(canvasSize, canvasSize);
    boa = {
        x: boardSize / 2,
        y: boardSize / 2
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
    rect(boa.x * tileSize, boa.y * tileSize, tileSize, tileSize);
    boa.x = (boa.x + 1) % boardSize;
}