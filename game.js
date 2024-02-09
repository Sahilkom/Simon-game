var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
$(document).on("keypress", function (event) {
  var code = event.keycode || event.which;
  if (!started && code == 13) {
    $("h1").html("Level " + level);
    nextSequence();
    started = true;
  } else {
    alert("Wrong key press !");
  }
});

$(".btn").click(function () {
  var selectedColor = $(this).attr("id");
  userClickedPattern.push(selectedColor);
  playSound(selectedColor);
  animatePress(selectedColor);
  checkAnswer(userClickedPattern.length - 1);
});
function checkAnswer(index) {
  if (userClickedPattern[index] === gamePattern[index]) {
    $("h1").html("Level " + level);
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("h1").html("'Game Over'<p>Press 'Enter' to Restart</p>");
    var s1 = new Audio("sounds/wrong.mp3");
    s1.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    resetGame();
  }
}
function resetGame() {
  level = 0;
  gamePattern = [];
  started = false;
}
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}
function playSound(name) {
  var path = "sounds/" + name + ".mp3";
  var audio = new Audio(path);
  audio.play();
}
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
