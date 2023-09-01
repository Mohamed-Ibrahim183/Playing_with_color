let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 1; // Declare level as a variable and initialize it

function startGame() {
  setTimeout(() => {
    if (gamePattern.length == 0) {
      console.log(gamePattern.length);
      let newBtn = nextSequence();
      animateButton(newBtn);
      gamePattern.push(newBtn);
    }
  }, 200);
  if (level === 0) {
    gamePattern.push(nextSequence()); // Start the game on the first keypress
  }
  $("#level-title").text(`Level ${level}`); // Increment and display the level
}
function wrong() {
  level = 1;
  gamePattern = [];
  userClickedPattern = [];
  $("#level-title").text(`Game Over, Press Any Key to Restart`);
  new Audio(`sounds/wrong.mp3`).play();
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
}
function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  $(".level-title").text(`Level ${level}`); // Increment and display the level
  return buttonColors[randomNumber];
}

function animateButton(buttonId) {
  $("#" + buttonId).addClass("flash");
  setTimeout(function () {
    $("#" + buttonId).removeClass("flash");
  }, 300);
}

function checkAnswer(currentLevel) {
  if (checkEach(userClickedPattern)) {
    userClickedPattern = [];
    $("#level-title").text(`Level ${++level}`);
    setTimeout(() => {
      let newBtn = nextSequence();
      animateButton(newBtn);
      gamePattern.push(newBtn);
    }, 500);
    return true;
  } else {
    wrong();
  }
  return false;
}

function checkEach(arr) {
  done = 1;
  index = 0;
  for (ele of arr) {
    if (ele !== gamePattern[index]) done = 0;
    index++;
  }
  if (done == 0) {
    wrong();
    return false;
  } else {
    return true;
  }
}
$(".start").click(startGame);
$(document).keypress(startGame);

$(".btn").on("click", function (e) {
  let buttonId = e.target.id;
  userClickedPattern.push(buttonId);
  new Audio(`sounds/${buttonId}.mp3`).play();
  animateButton(buttonId);
  if (userClickedPattern.length == gamePattern.length) {
    checkAnswer(userClickedPattern.length - 1);
  } else {
    checkEach(userClickedPattern);
  }
});
