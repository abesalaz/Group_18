title = "Wall to Wall";
description = `[Tap] Next wall`;
options = {
  viewSize: { x: 100, y: 100 },
  theme: "shapeDark",
};

//Wall variables
let powerUp;
let parallelUp;
let slowUp;
let frenzyUp = false;
let upgradeDurationReset = 3; //power up lasts til score goes up by 3
let upgradeDuration = 0;
let balls = [];
let wallNumbers = [];

//Text variables
let upgradeText = "Power Up!";
let textDurationReset = 2 * 60; // 2 second duration
let textDuration = 0;

function update() {
  if (!ticks) {
    powerUp = false;
    parallelUp = false;
    balls = [];
    wallNumbers = [0];
    spawnBall();
  }

  powerUpText();
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
function powerUpText() {
  //Displays text if necessary
  if (textDuration > 0) {
    color('black');
    text(upgradeText, 28, 50);
    textDuration--;
  }
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
  wallNumbers.forEach((wallNumber, index) => {
    let wallColor = "green";

    // Change color to yellow or red when upgradeDuration is 1 or 2
    if ((powerUp || parallelUp) && index > 0 && upgradeDuration <= 2) {
      wallColor = (upgradeDuration === 1) ? "red" : "yellow";
    }

    // Draw the walls based on wallNumber
    if(wallNumber == 0){
      // @ts-ignore
      color(wallColor);
      rect(0, 0, 7, 150);
    }
    else if (wallNumber == 1){
      // @ts-ignore
      color(wallColor);
      rect(0, 0, 100, 7);
    }
    else if (wallNumber == 2){
      // @ts-ignore
      color(wallColor);
      rect(93, 0, 7, 150);
    }
    else if (wallNumber == 3){
      // @ts-ignore
      color(wallColor);
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
    ball.x += ball.speed * normalized_x * (slowUp ? 0.5 : 1);
    ball.y += ball.speed * normalized_y * (slowUp ? 0.5 : 1);
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
  if (score % 2 == 0) {
    spawnBall();
  }

  // see if powerups should be reset
  if (upgradeDuration > 0) {
    upgradeDuration--;
  }
  if (upgradeDuration === 0 && (powerUp || parallelUp || slowUp || frenzyUp)) {
    if (powerUp) {
      powerUp = false;
      wallNumbers.pop();
    }

    if (parallelUp) {
      parallelUp = false;
      wallNumbers.pop();
    }

    if (slowUp) {
      slowUp = false;
    }

    if(frenzyUp){
      frenzyUp = false;
    }
  }

  // power up every 10 points
  if (score % 10 == 0) {
    
    // choose random power up
    let randInt = rndi(1, 4); // random number either 1, 2, or 3
    if (randInt === 1) {
      powerUp = true;
      upgradeText = "Adjacent!";
      let num = wallNumbers[0] + 1;
      if (num > 3) num -= 4; {
        wallNumbers.push(num);
      }
    } 
    else if (randInt === 2) {
      parallelUp = true;
      upgradeText = "Parallel!";
      let num = wallNumbers[0] + 2;
      if (num > 3) num -= 4; {
        wallNumbers.push(num);
      }
    }
    else if(randInt === 3){
      frenzyUp = true;
      upgradeText = "Frenzy!";
      for(let i = 0; i < 5; i++){
        spawnBall();
      }
    }
    else {
      slowUp = true;
      upgradeText = "Slowwwww!";
    }
    // reset text duration to display text for 2 seconds
    textDuration = textDurationReset;
    upgradeDuration = upgradeDurationReset;
  }
}
