//Extreme Pong

//Setup canvas and graphics context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 1000;
cnv.height = 600;

//Global Variables
let y = 250;
let botY = 250;
let gameOn = false;
let playerY = 80;

//Speed
let ySpeed = 0;
let botSpeed = 0;
let ballYSpeed = 8;
let ballXSpeed = 8;
let botMiddle = 40

//Ball
let ballX = 500;
let ballY = 300;
let ballRadius = 10;

//Points
let pointPlayer = 0;
let pointBot = 0;

requestAnimationFrame(mainMenu);

// Animation
function mainMenu() {

    //Clear Frame
    ctx.clearRect(0, 0, cnv.width, cnv.height);

    //Title 
    ctx.font = "40px 'Black Ops One', cursive";
    ctx.fillStyle = "white";
    ctx.fillText("Welcome to Extreme Pong", 225, 50);

    //Instructions
    ctx.font = "30px 'Black Ops One', cursive";
    ctx.fillStyle = "white";
    ctx.fillText("Instructions:", 394, 130);

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Press Space to Play Singleplayer", 280, 180);

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Up Arrow to Move Up", 350, 230);

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Down Arrow to move Down", 320, 280);

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Escape to go back to Menu", 320, 330);

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("First to 7 points wins", 360, 380);

    //Multiplayer
    ctx.font = "30px 'Black Ops One', cursive";
    ctx.fillStyle = "white";
    ctx.fillText("Multiplayer", 400, 430);

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Press M to Play Multiplayer", 320, 480);

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("W & Up Arrow to move up", 320, 530);

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("S & Down Arrow to move down", 290, 580);

    requestAnimationFrame(mainMenu);
}

console.log("Game Run");
console.log(singlePlayer);

function singlePlayer() {

    let randDirect = Math.random();
    console.log(gameOn);

    //Speed
    ballY = ballY + ballYSpeed;
    ballX = ballX + ballXSpeed;
    y += ySpeed;
    botY += botSpeed;

    //Clear Frame
    ctx.clearRect(0, 0, cnv.width, cnv.height);

    ctx.font = "15px 'Black Ops One', cursive";
    ctx.fillStyle = "white";
    ctx.fillText("ESC to Exit", 10, 590);

    //Key Input
    document.addEventListener("keydown", keydownHandler);
    document.addEventListener("keyup", keyupHandler);

    function keydownHandler(event) {
        if (event.code == "ArrowUp") {
            ySpeed = -6;
        } else if (event.code == "ArrowDown") {
            ySpeed = +6;
        }
    }

    function keyupHandler(event) {
        ySpeed = 0;
    }

    //Half Line
    for (let y = 0; y <= cnv.height; y = y + 105) {
        ctx.fillStyle = "rgb(38, 255, 0)";
        ctx.fillRect(495, y, 10, 80);
    }

    //Player Paddle
    ctx.fillStyle = "rgb(38, 255, 0)";
    ctx.fillRect(35, y, 15, playerY);

    //Bot Paddle
    ctx.fillStyle = "rgb(38, 255, 0)";
    ctx.fillRect(950, botY, 15, 80);

    //Ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();

    //Bot Movement
    if (ballY < botY - 50) {
        botSpeed = -7;
    } else if (ballY > botY + botMiddle) {
        botSpeed = +6.4;
    }

    if (ballY > botY + 50) {
        botSpeed = +7;
    } else if (ballY < botY + botMiddle) {
        botSpeed = -6.4;
    }

    //Ball Bounce
    if (ballY + ballRadius > cnv.height) {
        ballYSpeed = -8;
    } else if (ballY - ballRadius < 0) {
        ballYSpeed = +8;
    } else if (ballX - ballRadius < 0) {
        ballXSpeed = +8;
    } else if (ballX + ballRadius > cnv.width) {
        ballXSpeed = -8;
    }

    //Ball Bounce off Paddles
    //Ball Hits Top
    if (ballX > 940 && ballX < 950 && ballY + ballRadius <= botY + botMiddle && ballY >= botY - ballRadius) {
        ballXSpeed = -8;
        ballYSpeed = -8;
        //Ball Hits Bottom
    } else if (ballX > 940 && ballX < 950 && ballY - ballRadius >= botY + botMiddle - 1 && ballY <= botY + 80 + ballRadius) {
        ballXSpeed = -8;
        ballYSpeed = +8;
        //Ball Hits Top
    } else if (ballX > 50 && ballX < 65 && ballY + ballRadius <= y + botMiddle && ballY >= y - ballRadius) {
        ballXSpeed = +8;
        ballYSpeed = -8;
        //Ball Hits Bottom
    } else if (ballX > 50 && ballX < 65 && ballY - ballRadius >= y + botMiddle - 1 && ballY <= y + 80 + ballRadius) {
        ballXSpeed = +8;
        ballYSpeed = +8;
        //Hits Center
    } else if (ballX > 50 && ballX < 65 && ballY >= y && ballY <= y + 80) {
        ballXSpeed = +8;
        ballYSpeed = +8;
    } else if (ballX > 940 && ballX < 950 && ballY >= botY && ballY <= botY + 80) {
        ballXSpeed = -8;
        ballYSpeed = -8;
    }

    //Player Stop
    if (y > cnv.height - 80) {
        y = cnv.height - 80;
    } else if (y < 0) {
        y = 0;
    }

    //Bot Stop
    if (botY > cnv.height - 80) {
        botY = cnv.height - 80;
    } else if (botY < 0) {
        botY = 0;
    }

    //Points and Ball Respawn
    if (ballX > 985 && randDirect >= 0 && randDirect < 0.25) {
        ballXSpeed = -ballXSpeed;
        ballYSpeed = ballYSpeed;
        pointPlayer++;
        ballX = 500;
        ballY = 150;
        document.getElementById("playerScore").innerHTML = pointPlayer;
    } else if (ballX > 985 && randDirect >= 0.25 && randDirect < 0.5) {
        ballXSpeed = -ballXSpeed;
        ballYSpeed = ballYSpeed;
        pointPlayer++;
        ballX = 500;
        ballY = 300;
        document.getElementById("playerScore").innerHTML = pointPlayer;
    } else if (ballX > 985 && randDirect >= 0.5 && randDirect < 0.75) {
        ballXSpeed = -ballXSpeed;
        ballYSpeed = ballYSpeed;
        pointPlayer++;
        ballX = 500;
        ballY = 450;
        document.getElementById("playerScore").innerHTML = pointPlayer;
    } else if (ballX > 985 && randDirect >= 0.75 && randDirect < 1) {
        ballXSpeed = -ballXSpeed;
        ballYSpeed = ballYSpeed;
        pointPlayer++;
        ballX = 500;
        ballY = 600;
        document.getElementById("playerScore").innerHTML = pointPlayer;
    } else if (ballX < 15 && randDirect >= 0 && randDirect < 0.25) {
        pointBot++;
        ballX = 500;
        ballY = 150;
        ballXSpeed = -ballXSpeed;
        ballYSpeed = -ballYSpeed;
        document.getElementById("botScore").innerHTML = pointBot;
    } else if (ballX < 15 && randDirect >= 0.25 && randDirect < 0.5) {
        pointBot++;
        ballX = 500;
        ballY = 300;
        ballXSpeed = -ballXSpeed;
        ballYSpeed = -ballYSpeed;
        document.getElementById("botScore").innerHTML = pointBot;
    } else if (ballX < 15 && randDirect >= 0.5 && randDirect < 0.75) {
        pointBot++;
        ballX = 500;
        ballY = 450;;
        ballXSpeed = -ballXSpeed
        ballYSpeed = ballYSpeed;
        document.getElementById("botScore").innerHTML = pointBot;
    } else if (ballX < 15 && randDirect >= 0.75 && randDirect < 1) {
        pointBot++;
        ballX = 500;
        ballY = 600;
        ballXSpeed = -ballXSpeed;
        ballYSpeed = ballYSpeed;
        document.getElementById("botScore").innerHTML = pointBot;
    }

    if (pointBot >= 7) {
        ctx.font = "100px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Game Over", 235, 300);

        ctx.font = "50px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Bot Wins!", 390, 380);

        ballXSpeed = 0;
        ballYSpeed = 0;

        time = setInterval(pageRefresh, 4000);
    } else if (pointPlayer >= 7) {
        ctx.font = "100px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Game Over", 235, 300);

        ctx.font = "50px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Player Wins!", 365, 380);

        ballXSpeed = 0;
        ballYSpeed = 0;

        time = setInterval(pageRefresh, 4000);
    }

    function pageRefresh() {
        location.reload();
        gameOn = false;
    }

    //Update Frame
    requestAnimationFrame(singlePlayer);
}

function multiPlayer() {

    let randDirect = Math.random();
    console.log(gameOn);

    //Speed
    ballY = ballY + ballYSpeed;
    ballX = ballX + ballXSpeed;
    y += ySpeed;
    botY += botSpeed;

    //Clear Frame
    ctx.clearRect(0, 0, cnv.width, cnv.height);

    ctx.font = "15px 'Black Ops One', cursive";
    ctx.fillStyle = "white";
    ctx.fillText("ESC to Exit", 10, 590);

    document.getElementById("player").innerHTML = "Player 1:  "
    document.getElementById("cpu").innerHTML = "| Player 2:  "

    //Key Input
    document.addEventListener("keydown", keydownHandler);
    document.addEventListener("keyup", keyupHandler);
    document.addEventListener("keydown", keydownHandler2);
    document.addEventListener("keyup", keyupHandler2);

    function keydownHandler(event) {
        if (event.code == "KeyW") {
            ySpeed = -7;
        } else if (event.code == "KeyS") {
            ySpeed = +7;
        }
    }

    function keydownHandler2(event) {
        if (event.code == "ArrowUp") {
            botSpeed = -7;
        } else if (event.code == "ArrowDown") {
            botSpeed = +7;
        }
    }

    function keyupHandler(event) {
        if (event.code == "KeyW") {
            ySpeed = 0;
        } else if (event.code == "KeyS") {
            ySpeed = 0;
        }
    }

    function keyupHandler2(event) {
        if (event.code == "ArrowUp") {
            botSpeed = 0;
        } else if (event.code == "ArrowDown") {
            botSpeed = 0;
        }
    }

    //Half Line
    for (let y = 0; y <= cnv.height; y = y + 105) {
        ctx.fillStyle = "rgb(38, 255, 0)";
        ctx.fillRect(495, y, 10, 80);
    }

    //Player Paddle
    ctx.fillStyle = "rgb(38, 255, 0)";
    ctx.fillRect(35, y, 15, playerY);

    //Bot Paddle
    ctx.fillStyle = "rgb(38, 255, 0)";
    ctx.fillRect(950, botY, 15, 80);

    //Ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();

    //Ball Bounce
    if (ballY + ballRadius > cnv.height) {
        ballYSpeed = -8;
    } else if (ballY - ballRadius < 0) {
        ballYSpeed = +8;
    } else if (ballX - ballRadius < 0) {
        ballXSpeed = +8;
    } else if (ballX + ballRadius > cnv.width) {
        ballXSpeed = -8;
    }

    //Ball Bounce off Paddles
    //Ball Hits Top
    if (ballX > 940 && ballX < 950 && ballY + ballRadius <= botY + botMiddle && ballY >= botY - ballRadius) {
        ballXSpeed = -8;
        ballYSpeed = -8;
        //Ball Hits Bottom
    } else if (ballX > 940 && ballX < 950 && ballY - ballRadius >= botY + botMiddle - 1 && ballY <= botY + 80 + ballRadius) {
        ballXSpeed = -8;
        ballYSpeed = +8;
        //Ball Hits Top
    } else if (ballX > 50 && ballX < 65 && ballY + ballRadius <= y + botMiddle && ballY >= y - ballRadius) {
        ballXSpeed = +8;
        ballYSpeed = -8;
        //Ball Hits Bottom
    } else if (ballX > 50 && ballX < 65 && ballY - ballRadius >= y + botMiddle - 1 && ballY <= y + 80 + ballRadius) {
        ballXSpeed = +8;
        ballYSpeed = +8;
        //Hits Center
    } else if (ballX > 50 && ballX < 65 && ballY >= y && ballY <= y + 80) {
        ballXSpeed = +8;
        ballYSpeed = +8;
    } else if (ballX > 940 && ballX < 950 && ballY >= botY && ballY <= botY + 80) {
        ballXSpeed = -8;
        ballYSpeed = -8;
    }

    //Player Stop
    if (y > cnv.height - 80) {
        y = cnv.height - 80;
    } else if (y < 0) {
        y = 0;
    }

    //Bot Stop
    if (botY > cnv.height - 80) {
        botY = cnv.height - 80;
    } else if (botY < 0) {
        botY = 0;
    }

    //Points and Ball Respawn
    if (ballX > 985 && randDirect >= 0 && randDirect < 0.25) {
        ballXSpeed = -ballXSpeed;
        ballYSpeed = ballYSpeed;
        pointPlayer++;
        ballX = 500;
        ballY = 150;
        document.getElementById("playerScore").innerHTML = pointPlayer;
    } else if (ballX > 985 && randDirect >= 0.25 && randDirect < 0.5) {
        ballXSpeed = -ballXSpeed;
        ballYSpeed = ballYSpeed;
        pointPlayer++;
        ballX = 500;
        ballY = 300;
        document.getElementById("playerScore").innerHTML = pointPlayer;
    } else if (ballX > 985 && randDirect >= 0.5 && randDirect < 0.75) {
        ballXSpeed = -ballXSpeed;
        ballYSpeed = ballYSpeed;
        pointPlayer++;
        ballX = 500;
        ballY = 450;
        document.getElementById("playerScore").innerHTML = pointPlayer;
    } else if (ballX > 985 && randDirect >= 0.75 && randDirect < 1) {
        ballXSpeed = -ballXSpeed;
        ballYSpeed = ballYSpeed;
        pointPlayer++;
        ballX = 500;
        ballY = 600;
        document.getElementById("playerScore").innerHTML = pointPlayer;
    } else if (ballX < 15 && randDirect >= 0 && randDirect < 0.25) {
        pointBot++;
        ballX = 500;
        ballY = 150;
        ballXSpeed = -ballXSpeed;
        ballYSpeed = -ballYSpeed;
        document.getElementById("botScore").innerHTML = pointBot;
    } else if (ballX < 15 && randDirect >= 0.25 && randDirect < 0.5) {
        pointBot++;
        ballX = 500;
        ballY = 300;
        ballXSpeed = -ballXSpeed;
        ballYSpeed = -ballYSpeed;
        document.getElementById("botScore").innerHTML = pointBot;
    } else if (ballX < 15 && randDirect >= 0.5 && randDirect < 0.75) {
        pointBot++;
        ballX = 500;
        ballY = 450;
        ballXSpeed = -ballXSpeed;
        ballYSpeed = ballYSpeed;
        document.getElementById("botScore").innerHTML = pointBot;
    } else if (ballX < 15 && randDirect >= 0.75 && randDirect < 1) {
        pointBot++;
        ballX = 500;
        ballY = 600;
        ballXSpeed = -ballXSpeed;
        ballYSpeed = ballYSpeed;
        document.getElementById("botScore").innerHTML = pointBot;
    }

    if (pointBot >= 7) {
        ctx.font = "100px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Game Over", 235, 300);

        ctx.font = "50px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Player2 Wins!", 340, 380);

        ballXSpeed = 0;
        ballYSpeed = 0;

        time = setInterval(pageRefresh, 4000);
    } else if (pointPlayer >= 7) {
        ctx.font = "100px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Game Over", 235, 300);

        ctx.font = "50px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Player1 Wins!", 340, 380);

        ballXSpeed = 0;
        ballYSpeed = 0;

        time = setInterval(pageRefresh, 4000);
    }

    function pageRefresh() {
        location.reload();
        gameOn = false;
    }

    //Update Frame
    requestAnimationFrame(multiPlayer);
}

//Key Inputs
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(event) {
    if (event.code == "Space" && gameOn == false) {
        singlePlayer();
        gameOn = true;
    } else if (event.code == "KeyM" && gameOn == false) {
        multiPlayer();
        gameOn = true;
    }
}

function keyupHandler(event) {
    if (event.code == "Escape") {
        location.reload();
        gameOn = false;
    }
}