var game = new Game();
var boaFrank = new Boa();
var meat = new Food();

function setup() {
    var canvas = createCanvas(game.canvasSize, game.canvasSize);
    canvas.parent('sketch-holder');
    boaFrank.newSnake(game.boardSize);
    meat.newFood(boaFrank);
}

function keyPressed() { 
    if (keyCode === ENTER && !game.isGameRunning){
        boaFrank.newSnake(game.boardSize);
        meat.newFood(boaFrank);
        game.isGameRunning = true; 
    }
    if (!boaFrank.hasMoved) {
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
    boaFrank.hasMoved = true;
}

function draw() {
    frameRate(5 + boaFrank.body.length);
    noStroke();
    for (var x = 0; x < game.boardSize; x++) {
        for (var y = 0; y < game.boardSize; y++) {
            fill(42, 157, 142, 100);
            rect(x * game.tileSize, y * game.tileSize, game.tileSize, game.tileSize);
        }
    }

    for (var i = 0; i < boaFrank.body.length; i++) {
        fill(boaFrank.color);
        rect((boaFrank.body[i].x) * game.tileSize, (boaFrank.body[i].y) * game.tileSize, game.tileSize, game.tileSize);
    }
    fill(meat.color);
    rect(meat.x * game.tileSize, meat.y * game.tileSize, game.tileSize, game.tileSize);
    if (game.isGameRunning){
        boaFrank.eat(meat);
        boaFrank.move(game.boardSize);
    } else { 
        game.showLooserInfo(boaFrank.points);
    }
}

