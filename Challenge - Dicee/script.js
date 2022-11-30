var r1 = Math.floor(Math.random() * 6 + 1);
var r2 = Math.floor(Math.random() * 6 + 1);

var images = document.querySelectorAll(".dice img");
images[0].setAttribute("src", "images/dice" + r1 + ".png");
images[1].setAttribute("src", "images/dice" + r2 + ".png");

var title = document.querySelector("h1");
if (r1 === r2)
    title.innerText = "Draw!";
else
    title.innerText = "Player " + (r1 > r2 ? "1" : "2") + " Wins!";