//bræt
let pieceSize = 25;
let rows = 20;
let columns = 20;
let board;
let ctx; 

//slange
let slangeX = pieceSize * 5;
let slangeY = pieceSize * 5;

let velocityX = 0;
let velocityY = 0;

let slangeKrop = [];

//mad
let madX;
let madY;

let gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * pieceSize;
    board.width = columns * pieceSize;
    ctx = board.getContext("2d"); // bræt tegning

    placeFood();
    document.addEventListener("keyup", changeDirection);
    
    setInterval(update, 1000/10); //100 millisekunder
}

function update() {
    if (gameOver) {
        return;
    }

    ctx.fillStyle="black";
    ctx.fillRect(0, 0, board.width, board.height);

    ctx.fillStyle="red";
    ctx.fillRect(madX, madY, pieceSize, pieceSize);

    if (slangeX == madX && slangeY == madY) {
        slangeKrop.push([madX, madY]);
        placeFood();
    }

    for (let i = slangeKrop.length-1; i > 0; i--) {
        slangeKrop[i] = slangeKrop[i-1];
    }
    if (slangeKrop.length) {
        slangeKrop[0] = [slangeX, slangeY];
    }

    ctx.fillStyle="blue";
    slangeX += velocityX * pieceSize;
    slangeY += velocityY * pieceSize;
    ctx.fillRect(slangeX, slangeY, pieceSize, pieceSize);
    for (let i = 0; i < slangeKrop.length; i++) {
        ctx.fillRect(slangeKrop[i][0], slangeKrop[i][1], pieceSize, pieceSize);
    }

    //slut
    if (slangeX < 0 || slangeX > columns*pieceSize || slangeY < 0 || slangeY > rows*pieceSize) {
        gameOver = true;
        alert(" Spil slut - du er død.");
    }

    for (let i = 0; i < slangeKrop.length; i++) {
        if (slangeX == slangeKrop[i][0] && slangeY == slangeKrop[i][1]) {
            gameOver = true;
            alert("Spil slut - du er død.");
        }
    }
}
// slangens retning
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


function placeFood() {
    
    madX = Math.floor(Math.random() * columns) * pieceSize;
    madY = Math.floor(Math.random() * rows) * pieceSize;
}