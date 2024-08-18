let canvas = document.getElementById("game");
let ctx = canvas.getContext('2d');
let ballRadius = 9;
let x = canvas.width / Math.floor(Math.random() * Math.random() * 10) + 3;
let y = canvas.height - 40;
let dx = 2;
let dy = -2;

let paddleHeight = 12;
let paddleWidth = 72;

// paddle start position
let paddleX = (canvas.width - paddleWidth) / 2;

// bricks
let rowCount = 5;
let columnCount = 9;

let brickHeight = 18;
let brickWidth = 54;
let brickPadding = 12;

let topOffset = 40;
let leftOffset = 33;
let score = 0;

// bricks array
let bricks = [];
for (let c = 0; c < columnCount; c++){
    bricks[c] = [];
    for(let r = 0; r < rowCount; r++){
        // set position of bricks
        bricks[c][r] = {x: 0, y: 0, status: 1}
    }
}

// Mouse moving eventListener and function
document.addEventListener("mousemove", mouseMoveHandler, false)

// move paddle with mouse
function mouseMoveHandler(e){
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleWidth / 2;
    }
}

// draw paddle
function drawPaddle(){
    ctx.beginPath();
    ctx.roundRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight );
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}

// draw ball
function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2,  );
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}

// draw bricks
function drawBricks(){
    for (let c = 0; c < columnCount; c++){
        for(let r = 0; r < rowCount; r++){
            if(bricks[c][r].status === 1){
                let brickX = ( c * (brickWidth + brickPadding)) + leftOffset;
                let brickY = ( r * (brickHeight + brickPadding)) + topOffset;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 30);
                ctx.fillStyle = '#333';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// track score
function trackScore(){
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#333';
    ctx.fillText("Score: " + score, 8, 24)
}

// check ball hit bricks
function hitDetection(){
    for (let c = 0; c < columnCount; c++){
        for(let r = 0; r < rowCount; r++){
            let b =  bricks[c][r];
            if(b.status === 1){
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                    dy = -dy;
                    b.status = 0;
                    score++;
                    // check win
                    if(score === rowCount * columnCount){
                        alert("You completed the game!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// main func
function init(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trackScore();
    drawBricks();
    drawBall();
    drawPaddle();
    hitDetection();

    // detect left and right walls
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius){
        dx = -dx;

    }
    if(y + dy < ballRadius){
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius ){
        // Detect paddle hits
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;

        } else {
            // If ball don't hit paddle
            alert("You missed! Game Over.")
            document.location.reload();
        }
    }

    // bottom wall
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius){
        dy = -dy;
    }

    // move ball
    x += dx;
    y += dy;
}

setInterval(init, 10);


