var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("h1").text("Level " + level);
  console.log(gamePattern[gamePattern.length - 1]);
  level++;
  userClickedPattern = [];
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(this);
  checkAnswer(userClickedPattern.length - 1);

});


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $(currentColour).addClass("pressed");
  setTimeout(function() {
    $(currentColour).removeClass("pressed");
  }, 100);

}

$(document).one("keypress", function() {
  nextSequence();
});


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success");
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart")
    $(document).one("keypress", function() {
      starOver();
    })
  }
}


function starOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  nextSequence();

}
