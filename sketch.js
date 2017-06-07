var canvasSize = 500;
var boardSize = 20;
var tileSize = canvasSize / boardSize;
var boaFrank = new Boa();
var meat = new Food();

function setup() {
    createCanvas(canvasSize, canvasSize);
    boaFrank.body.push(createVector(10, 10));
}

function Boa() {
    //this.x = boardSize / 2;
    //this.y = boardSize / 2;
    this.body = [];

    // this.body.push({ x: (boardSize / 2) - 1, y: boardSize / 2 });
    // this.body.push({ x: (boardSize / 2) - 2, y: boardSize / 2 });
    // this.body.push({ x: (boardSize / 2) - 3, y: boardSize / 2 });
    console.log(this.body);
    this.direction = 'RIGHT';
    this.color = "#E9C46A";
    this.move = function() {
        var head = this.body[length - 1];
        for (var i = 0; i < this.body.length - 1; i++) {
            this.body[i] = this.body[i + 1];
        }
        this.body[this.body.length - 1] = createVector(head.x + 1, head.y);
        // var head = this.body[this.body.length - 1];
        // var tail = this.body.pop();
        //     var i = this.body.length - 1;
        //     while (i >= 0) {
        //         console.log('Iteracja : ' + i);
        //         if (i === 0) {
        //             if (this.direction === 'RIGHT') {
        //                 this.body[i].x = (this.body[i].x + 1) % boardSize;
        //             } else if (this.direction === 'LEFT') {
        //                 this.body[i].x = (this.body[i].x + boardSize - 1) % boardSize;
        //             } else if (this.direction === 'UP') {
        //                 this.body[i].y = (this.body[i].y + boardSize - 1) % boardSize;
        //             } else if (this.direction === 'DOWN') {
        //                 this.body[i].y = (this.body[i].y + boardSize + 1) % boardSize;
        //             }
        //         } else {
        //             // var current = this.body[i];
        //             var next = this.body[i - 1];
        //             console.log('Przesuwam : ' + this.body[i].x + '-' + this.body[i].y + ' na ' + next.x + '-' + next.y);
        //             this.body[i] = next;
        //         }
        //         i--;
        //     }
        //     // this.body.unshift(tail);
    }
}

function Food() {
    this.x = Math.floor(Math.random() * boardSize);
    this.y = Math.floor(Math.random() * boardSize);
    console.log('x : ' + this.x);
    console.log('y : ' + this.y);
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
    frameRate(0.2);
    for (var x = 0; x < boardSize; x++) {
        for (var y = 0; y < boardSize; y++) {
            fill("#2A9D8F");
            rect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }

    for (var i = 0; i < boaFrank.body.length; i++) {
        fill(boaFrank.color);
        //console.log(i + ' : ' + boaFrank.body[i].x + ' ' + boaFrank.body[i].y);
        rect((boaFrank.body[i].x) * tileSize, (boaFrank.body[i].y) * tileSize, tileSize, tileSize);
    }

    boaFrank.move();

    fill(meat.color);
    rect(meat.x * tileSize, meat.y * tileSize, tileSize, tileSize);
}