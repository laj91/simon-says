let userClickedPattern = [];
let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let started = false;
let level = 0;


//Starts the game on load, inserts level text, calls nextSequence
$(document).on("keydown", function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence()
    started = true;
  }
})

//Finds random color and inserts into gamePattern array - Plays animation and sound
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

//Starts the games over
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//Saves the button clicked by the user into array and passes it to animtaion, sound and checkAnswer
$(".btn").on("click", function() {

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});

// Responsible for playing sounds
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}

//Responsible for animations
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
        let wrongSound = new Audio("sounds/wrong.mp3")
        $("body").addClass("game-over");
        setTimeout(function() {
          $("body").removeClass("game-over");
        }, 200)
        $("h1").text("Game over, Press any key to continue")
        startOver();
    }
}
