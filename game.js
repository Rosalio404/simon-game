var gamePattern = [];
var userClickedPattern = [];
var randomNumber = 0;
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;


// start game
document.querySelector(".start").addEventListener('click', function () {
	let userClickedButton = event.target.id
	togglePress(userClickedButton);
		if (document.querySelector("h1").innerHTML === "Press Start Button to Start") {
			nextSequence();
		} else if (document.querySelector("h1").innerHTML === "Game Over, Press Start to Restart") {
			gamePattern = [];
			userClickedPattern = [];
			level = [];
			nextSequence();
		}
});

for(i = 0; i < document.querySelectorAll(".btn").length; i++) {
		document.querySelectorAll(".btn")[i].addEventListener('click', function () {

				var userClickedButton = event.target.id;
				userClickedPattern.push(userClickedButton);
				play(userClickedButton);
				togglePress(userClickedButton);

				checkAnswer(userClickedPattern.lastIndexOf(userClickedButton));

				if (userClickedPattern.length === gamePattern.length) {
						nextSequence();
				} else {

				}
		});
}


// functions

// start next sequence of game pattern
function nextSequence() {
		level++
		document.querySelector("h1").innerHTML = "Level " + level;
		randomNumber = Math.floor(Math.random() * 4);
		var randomChosenColor = buttonColors[randomNumber];
		gamePattern.push(randomChosenColor);
		setTimeout(function () {

				play(randomChosenColor);
				flash(randomChosenColor);
		}, 500)
		userClickedPattern = [];
};

// toggle the press class to the div with the class of the clicked color
function togglePress(color) {
		document.querySelector("." + color).classList.toggle("pressed");

setTimeout(function () {
		document.querySelector("." + color).classList.toggle("pressed")}, 150);
}

// toggle the visibility to the div with the id of the clicked color
function flash(color) {
		document.querySelector("." + color).style.visibility = "hidden";

setTimeout(function () {
		document.querySelector("." + color).style.visibility = ""}, 150);
}

// play audio associated with color of button
function play(color) {
	let Sound = new Audio("sounds/" + color + ".mp3");
	Sound.play();
}

// check fail state
function checkAnswer(currentLevel) {
		if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
		} else {
				var wrongSound = new Audio("sounds/wrong.mp3");
				wrongSound.play();

				document.querySelector("body").classList.toggle("game-over");
				setTimeout(function () {
						document.querySelector("body").classList.toggle("game-over")}, 200);

				document.querySelector("h1").innerHTML = "Game Over, Press Start to Restart";
				gamePattern = [];
		}
}
