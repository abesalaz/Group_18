title = "Wall to Wall";
description = `[Tap] Next wall`;
options = {
  viewSize: { x: 100, y: 100 },
  theme: "shapeDark",
};

//Wall variables
let powerUp;
let parallelUp;
let balls = [];
let wallNumbers = [];

function update() {
  if (!ticks) {
    powerUp = false;
    parallelUp = false;
    balls = [];
    wallNumbers = [0];
    spawnBall();
  }
  OnClick();
  paintWalls();
  moveBall();
  handleBallCollision();
  paintBall();  
}

function spawnBall() {
  balls.push({ 
    x: 50,
    y: 50,
    radius: 2,
    speed: 0.7,
    direction: { x: Math.random(), y: Math.random() },
    lastWallNumber: -1
  });
}

function OnClick(){

  //Change wall color
  if (input.isJustPressed) {

    let newNums = [];
    wallNumbers.forEach((wallNumber) => {
      wallNumber++;
      if(wallNumber > 3) wallNumber = 0;
      newNums.push(wallNumber);
    });

    wallNumbers = newNums;
  }

}

function paintWalls(){
  wallNumbers.forEach((wallNumber) => {

    if(wallNumber == 0){
      color("green");
      rect(0, 0, 7, 150);
    }
    else if (wallNumber == 1){
      color("green");
      rect(0, 0, 100, 7);
    }
    else if (wallNumber == 2){
      color("green");
      rect(93, 0, 7, 150);
    }
    else if (wallNumber == 3){
      color("green");
      rect(0, 93, 100, 7);
    }

  });

}

//Creates the ball with specifications
function paintBall(){
  color("black");

  //Draw the balls
  balls.forEach((ball) => {
    arc(ball.x, ball.y, ball.radius * 0.1);
  });
}

//moves the ball around based on its speed and direction
function moveBall() {
  balls.forEach((ball) => {
    let magnitude = Math.sqrt(ball.direction.x**2 + ball.direction.y**2);
    if (magnitude == 0) return;

    let normalized_x = ball.direction.x / magnitude;
    let normalized_y = ball.direction.y / magnitude;
    ball.x += ball.speed * normalized_x;
    ball.y += ball.speed * normalized_y;
  });
}
//Checks if a green wall was hit
function handleBallCollision() {

  balls.forEach((ball) => {

    // Check collision with the screen boundaries (Lose p much)
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > 100 || ball.y - ball.radius < 0 || ball.y + ball.radius > 100) {
      const index = balls.indexOf(ball);
      if (index > -1) {
        balls.splice(index, 1);
      }

      if (balls.length == 0) {
        end();
      }

    }

    // Check collision with green walls
    wallNumbers.forEach((wallNumber) => {
      if ((wallNumber === 0 && ball.x - ball.radius <= 7) || (wallNumber === 2 && ball.x + ball.radius >= 93)) {
        if (ball.lastWallNumber != wallNumber) {
          ball.lastWallNumber = wallNumber;
          increaseScore();
          ball.direction.x *= -1; // Reverse the x-direction
        }
      }

      if ((wallNumber === 1 && ball.y - ball.radius <= 7) || (wallNumber === 3 && ball.y + ball.radius >= 93)) {
        if (ball.lastWallNumber != wallNumber) {
          ball.lastWallNumber = wallNumber;
          increaseScore();
          ball.direction.y *= -1; // Reverse the y-direction
        }
      }
    });
    
  });
}

function increaseScore(){
  score++;

  // spawn new ball every 2 points
  if(score % 2 == 0) {
    spawnBall();
  }

  // reset powerups
  if (powerUp || parallelUp) {
    parallelUp = false;
    powerUp = false;
    wallNumbers.pop();
  }

  // power up every 5 points
  if(score % 5 == 0){
    
    // choose random power up
    if(Math.random() < 0.5){
      powerUp = true;
    } else {
      parallelUp = true;
    }
    
  }

  // apply powerups
  if (powerUp) {
    let num = wallNumbers[0] + 1;
    if (num > 3) num -= 4;
    wallNumbers.push(num);
  }

  if (parallelUp) {
    let num = wallNumbers[0] + 2;
    if (num > 3) num -= 4;
    wallNumbers.push(num);
  }

}
