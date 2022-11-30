let colors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let playerPattern = [];
let level = 0;
let title = $("#level-title");

function nextSequence() {
    playerPattern = [];
    // Update level
    level++;
    title.text("Level " + level);
    // Get Random Color
    let r = Math.floor(Math.random() * 4);
    let color = colors[r];
    gamePattern.push(color);
    // Animation
    $("#" + color).fadeOut(100).fadeIn(100);
    // Sound
    playSound(color);
}

function playSound(name) {
    let sound = new Audio("sounds/" + name + ".mp3");
    sound.volume = 0.1;
    sound.play();
}

function animatePress(color) {
    let btn = $("#" + color);
    btn.addClass("pressed");
    setTimeout(function() { btn.removeClass("pressed"); }, 100);
}

function checkAnswer(index) {
    if (gamePattern[index] === playerPattern[index]) {
        if (gamePattern.length === playerPattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    // Reset
    level = 0;
    gamePattern = [];
    title.html("Game Over!<br>Press A to restart");
    // Animation
    $("body").addClass("game-over");
    setTimeout(function() { $("body").removeClass("game-over"); }, 200);
    // Sound
    playSound("wrong");
}

$(document).keypress(function(event) {
    if (level === 0 && event.key === "a") nextSequence();
})

$(".btn").click(function() {
    // Get player input
    let selected = $(this).attr("id");
    playerPattern.push(selected);
    // Animation
    animatePress(selected);
    // Sound
    playSound(selected);
    // Check answer
    checkAnswer(playerPattern.length - 1);
});