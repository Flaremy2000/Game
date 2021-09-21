const canvas = document.getElementById('Scene');
const ScoreText = document.getElementById('Score');
const ctx = canvas.getContext('2d');
const back = document.getElementById('back');
const clack = document.getElementById('clack');
const gameover = document.getElementById('gameover');
let circle_x=11;
let circle_y=11;
let circle_SpeedX = 1;
let circle_SpeedY = 1;
let raquetSpeed= 4;
const circle_radius=10;
const RAQUET_WIDTH= 80;
const RAQUET_HEIGHT= 10;
raquet_X= (canvas.width-RAQUET_WIDTH)/2;
const RAQUET_Y= canvas.height-40;
let rightPressed =false;
let leftPressed = false;
let EscapePressed = false;
let Score = 0;
Interval = 0;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 27){
        if(EscapePressed){
            EscapePressed = false;
        }else{
            EscapePressed = true;
        }
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function drawBall(){
    ctx.beginPath();
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.arc(circle_x,circle_y,circle_radius,0,Math.PI*2,false);
    ctx.fill();
    ctx.closePath();
}

function drawRaquet(){
    ctx.beginPath();
    ctx.fillStyle = "rgb(200,0,0";
    ctx.fillRect(raquet_X,RAQUET_Y,RAQUET_WIDTH,RAQUET_HEIGHT);
    ctx.closePath();
}
function click(){
    canvas.addEventListener('click', (e)=>{
        if(e.clientX-canvas.offsetLeft > (canvas.width -250)/2 && e.clientX-canvas.offsetLeft < ((canvas.width -250)/2) + 250){
            if(e.clientY-canvas.offsetTop > (canvas.height)/2 && e.clientY-canvas.offsetTop < ((canvas.height)/2)+ 60){
                document.location.reload();
            }
        }
    });
}
let xbtn= (canvas.width - 250)/2;
let ybtn= canvas.height/2;
function draw(){
    if(EscapePressed){
        ctx.beginPath();
        ctx.fillStyle = "rgb(200,10,220";
        ctx.fillRect(xbtn,ybtn,250,60);
        ctx.font = "bold 24px arial";
        ctx.fillStyle = "rgb(0,0,0)"
        ctx.fillText("Volver a Empezar", xbtn+20, ybtn+40);
        ctx.closePath();        
        click();
    }else{
        back.play();
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.font = "bold 14px arial";
        ctx.fillText("Puntaje: "+ Score, 0, 15);
        ctx.fillText("Velocidad Actual: X: " + circle_SpeedX + " Y: "+ circle_SpeedY, 0, 35);
        ctx.fillText("Velocidad Raqueta: X: " + raquetSpeed, 80, 15);
        drawBall();
        drawRaquet();
        if( circle_x + circle_SpeedX > canvas.width- circle_radius || circle_x + circle_SpeedX < circle_radius){
            circle_SpeedX = -circle_SpeedX;
        }
        if(circle_y + circle_SpeedY < circle_radius){
            circle_SpeedY = -circle_SpeedY;
        }else if(circle_y > RAQUET_Y && circle_x < raquet_X + RAQUET_WIDTH && circle_x > raquet_X){
            if(circle_x >= raquet_X && circle_x <= (raquet_X+RAQUET_WIDTH)/2 && circle_y+ circle_SpeedY > RAQUET_Y ||circle_x >= (raquet_X+RAQUET_WIDTH)/2 && circle_x <= raquet_X+RAQUET_WIDTH && circle_y+ circle_SpeedY > RAQUET_Y){
                Score += 1;
                clack.play();
                circle_SpeedY = -circle_SpeedY;
                if(circle_SpeedX > 0 && circle_SpeedX < 9 && raquetSpeed > 0){
                    raquetSpeed+=1;
                    circle_SpeedX+=1;
                }else{
                    circle_SpeedX-=1;
                }
                if(circle_SpeedY > 0 && circle_SpeedY < 9){
                    circle_SpeedY+=1;
                }else{
                    circle_SpeedY-=1;
                }
            }
        }else if(circle_y + circle_SpeedY > canvas.height-circle_radius && circle_y + circle_SpeedY > RAQUET_Y - RAQUET_HEIGHT){
            ctx.clearRect(0,0, canvas.width, canvas.height);
            ScoreText.innerHTML += Score;
            Score = 0;
            back.pause();
            gameover.play();
            EscapePressed = true;
        }
        if(rightPressed && raquet_X < canvas.width-RAQUET_WIDTH){
            raquet_X += raquetSpeed;
        }else if( leftPressed && raquet_X > 0){
            raquet_X -= raquetSpeed;
        }
        circle_x += circle_SpeedX;
        circle_y += circle_SpeedY;
        }
}
interval = setInterval(draw, 20);