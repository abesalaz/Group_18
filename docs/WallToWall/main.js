title = "Wall to Wall";

description = `
[Tap] Change wall color
`;

characters = [];
let wallColors;
let wallNumber;
let powerUp;
let parallelUp;

options = {
  viewSize: { x: 100, y: 100 },
  theme: "shapeDark",
};

function update() {
  if (!ticks) {
    wallColors = ["white", "white", "white", "white"];
    wallNumber = 0;
    powerUp = false;
    parallelUp = true;
  }
  OnClick();
  paintWalls();  

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

  //Option 2.
  // color(wallColors[0]);
  // rect(0, 0, 7, 150);
  // //Top wall
  // color(wallColors[1]);
  // rect(0, 0, 100, 7);
  // //Right wall
  // color(wallColors[2]);
  // rect(93, 0, 7, 150);
  // //Bottom wall
  // color(wallColors[3]);
  // rect(0, 93, 100, 7);

}
