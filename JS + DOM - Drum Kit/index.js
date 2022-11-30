let tom1 = "sounds/tom-1.mp3";
let tom2 = "sounds/tom-2.mp3";
let tom3 = "sounds/tom-3.mp3";
let tom4 = "sounds/tom-4.mp3";
let crash = "sounds/crash.mp3";
let kickBass = "sounds/kick-bass.mp3";
let snare = "sounds/snare.mp3";

document.addEventListener('keydown', (event) => {
    playAudio(event.key);
    btnAnimation(event.key);
});

function playAudio(key) {
    let path = "";
    switch(key) {
        case "z" : path = tom1; break;
        case "q" : path = tom2; break;
        case "s" : path = tom3; break;
        case "d" : path = tom4; break;
        case "j" : path = crash; break;
        case "k" : path = kickBass; break;
        case "l" : path = snare; break;
    }
    let sound = new Audio(path);
    sound.play();
}

function btnAnimation(key) {
    let btn = document.querySelector("." + key);
    btn.classList.add("pressed");
    setTimeout(function() { btn.classList.remove("pressed"); }, 100);
}