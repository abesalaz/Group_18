title = "One Button";
options = {
  viewSize: { x: 100, y: 100 },
  theme: "shapeDark"
};

const maxDist = 4.5;
const radius = 30;
const speed_inc = 0.002;
var speed;
var dir;
var angle_player;
var angle_goal;
var nearGoal;

function update() {

  // setup
  if (!ticks) {
    speed = 0.02;
    dir = 1;
    angle_player = 0;
    moveGoal();
  }

  // draw goal
  var x_goal = 50 + radius * Math.cos(angle_goal);
  var y_goal = 50 + radius * Math.sin(angle_goal);
  color("blue");
  rect(x_goal, y_goal, 6, 6);

  // draw player
  var x_player = 50 + radius * Math.cos(angle_player);
  var y_player = 50 + radius * Math.sin(angle_player);
  color("green");
  rect(x_player, y_player, 6, 6);

  var dist = Math.sqrt(Math.pow(x_goal - x_player, 2) + Math.pow(y_goal - y_player, 2));

   // check if player is near, or past goal
   // I know I could have done without the nearGoal variable but that would have taken more brain power
   if (!nearGoal) {
    if (dist <= maxDist) {
      nearGoal = true;
    }
  } else {
    if (dist >= maxDist) {
      end();
    }
  }
  
  angle_player += (speed * dir);

  // on button press, if payer is near goal
  if (input.isJustPressed && dist <= maxDist) {
    moveGoal();
    dir *= -1;
    score += 1;
    speed += speed_inc;
  }

}

function moveGoal() {
  var minDegrees = 90;
  var maxDegrees = 270;
  var randomDegrees = Math.random() * (maxDegrees - minDegrees) + minDegrees;
  angle_goal = angle_player + (randomDegrees * (Math.PI / 180));
  nearGoal = false;
}