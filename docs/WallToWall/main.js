title = "Wall to Wall";

description = `
[Tap] Change wall color
`;

characters = [];
//Wall variables
let wallColors;
let wallNumber;
let lastWallNumber;
let powerUp;
let parallelUp;
//Ball variables
let ball;
let ballSpeed;
let ballDirection;

options = {
  viewSize: { x: 100, y: 100 },
  theme: "shapeDark",
};

function update() {
  if (!ticks) {
    wallColors = ["white", "white", "white", "white"];
    wallNumber = 0;
    lastWallNumber = 0;
    powerUp = false;
    parallelUp = false;
    // Initialize the ball
    ball = { x: 50, y: 50, radius: 2 };
    ballSpeed = 0.7;
    ballDirection = { x: 0.5, y: 1 }; // Initial direction vector of the ball
  }
  OnClick();
  paintWalls();
  moveBall();
  handleBallCollision();
  paintBall();  

}

function OnClick(){
  //Change wall color
  if (input.isJustPressed) {
    wallColors[wallNumber] = "white";
    wallNumber++;
    if(wallNumber > 3){
      wallNumber = 0;
    }
    wallColors[wallNumber] = "green";
  }
}

function paintWalls(){
  //No Power up.
  if(wallNumber == 0 && powerUp == false && parallelUp == false){
    color(wallColors[0]);
    rect(0, 0, 7, 150);
  }
  else if (wallNumber == 1 && powerUp == false && parallelUp == false){
    color(wallColors[1]);
    rect(0, 0, 100, 7);
  }
  else if (wallNumber == 2 && powerUp == false && parallelUp == false){
    color(wallColors[2]);
    rect(93, 0, 7, 150);
  }
  else if (wallNumber == 3 && powerUp == false && parallelUp == false){
    color(wallColors[3]);
    rect(0, 93, 100, 7);
  }

  //Power up (Right Angle)
  if(wallNumber == 0 && powerUp == true && parallelUp == false){
    color(wallColors[0]);
    rect(0, 0, 7, 150);
    rect(0, 0, 100, 7);
  }
  else if (wallNumber == 1 && powerUp == true && parallelUp == false){
    color(wallColors[1]);
    rect(0, 0, 100, 7);
    rect(93, 0, 7, 150);
  }
  else if (wallNumber == 2 && powerUp == true && parallelUp == false){
    color(wallColors[2]);
    rect(93, 0, 7, 150);
    rect(0, 93, 100, 7);
  }
  else if (wallNumber == 3 && powerUp == true && parallelUp == false){
    color(wallColors[3]);
    rect(0, 93, 100, 7);
    rect(0, 0, 7, 150);
  }

  //Parallel Power up (Parallel)
  if((wallNumber == 0 || wallNumber == 2) && parallelUp == true){
    color("green");
    rect(0, 0, 7, 150);
    rect(93, 0, 7, 150);
  }
  else if((wallNumber == 1 || wallNumber == 3) && parallelUp == true){
    color("green");
    rect(0, 0, 100, 7);
    rect(0, 93, 100, 7);
  }

}

//Creates the ball with specifications
function paintBall(){
  color("black");
  //Draw the ball
  arc(ball.x, ball.y, ball.radius * 0.1);
}
//moves the ball around based on its speed and direction
function moveBall(){
  ball.x += ballSpeed * ballDirection.x;
  ball.y += ballSpeed * ballDirection.y;
}
//Checks if a green wall was hit
function handleBallCollision() {
  // Check collision with the screen boundaries (Lose p much)
  if (ball.x - ball.radius < 0 || ball.x + ball.radius > 100) {
    end();
  }
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > 100) {
    end();
  }

  // Check collision with green walls
  if (wallColors[wallNumber] === "green") {
    if (
      (wallNumber === 0 && ball.x - ball.radius <= 7) ||
      (wallNumber === 2 && ball.x + ball.radius >= 93)
    ) {
      if (lastWallNumber != wallNumber) {
        lastWallNumber = wallNumber;
        increaseScore();
        ballDirection.x *= -1; // Reverse the x-direction
      }
    }
    if (
      (wallNumber === 1 && ball.y - ball.radius <= 7) ||
      (wallNumber === 3 && ball.y + ball.radius >= 93)
    ) {
      if (lastWallNumber != wallNumber) {
        lastWallNumber = wallNumber;
        increaseScore();
        ballDirection.y *= -1; // Reverse the y-direction
      }
    }
  }
}

function increaseScore(){
  score++;
}
