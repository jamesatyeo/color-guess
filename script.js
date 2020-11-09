"use strict"

let currentColor;
let difficulty;

let patchContainer = document.getElementById("main-container");
let title = document.querySelector("h1");
let titleBackground = document.querySelector("header");
let correct = document.getElementById("correct");
let easyBtn = document.getElementById("easy");
let hardBtn = document.getElementById("hard");
let newBtn = document.getElementById("new");




function reset() {

    correct.style.color = "white";
    titleBackground.style.backgroundColor = "#2C8E99"

    removePatches();

    currentColor = getRandomRGB();

    title.textContent = currentColor;

    let howManyPatches = (difficulty === "hard") ? 6 : 4;

    createPatches(howManyPatches);

    setPatchColor(howManyPatches);

    addPatchEventListeners();
}






function removePatches() {

    while (patchContainer.childElementCount > 0) {

        patchContainer.removeChild(patchContainer.lastChild);
    }
}

function getRandomInt(max) {

    return Math.floor(Math.random() * max).toString();
}

function getRandomRGB() {
    
    let red = getRandomInt(256);
    let green = getRandomInt(256);
    let blue = getRandomInt(256);

    return `rgb(${red}, ${green}, ${blue})`
}

function createPatches(amountToCreate) {

    while (amountToCreate > 0) {

        let div = document.createElement("div");

        div.classList.add("color-patch");

        patchContainer.prepend(div)

        amountToCreate--
    }
}

function setPatchColor(numberOfChoices) {

    let correctAnswerIndex = getRandomInt(numberOfChoices);

    let patches = createPatchArray();
    
    patches.forEach(function(patch,index) {

        if (index == correctAnswerIndex) {

            patch.style.backgroundColor = currentColor;

            patch.classList.add("correct")
        }
        else {
            patch.style.backgroundColor = getRandomRGB();
        }
    });
}

function setPatchColorAll() {

    let patches = createPatchArray();

    patches.forEach(function(patch) {

        patch.style.backgroundColor = currentColor;
    });
}


function colorPatchEvent(e) {

    if (e.target.classList.contains("correct")) {
        
        setPatchColorAll();

        removePatchEventListeners();

        titleBackground.style.backgroundColor = currentColor;

        correct.style.color = "#2C8E99"


    }
    else {
        e.target.style.backgroundColor = "rgb(0, 0, 0)"
    }

}

function createPatchArray() {

    return Array.from(document.querySelectorAll(".color-patch"));
}

function addPatchEventListeners() {

    let patches = createPatchArray();

    patches.forEach( function(patch) {

        patch.addEventListener("click", colorPatchEvent);
    });
}

function removePatchEventListeners() {

    let patches = createPatchArray();

    patches.forEach( function(patch) {

        patch.removeEventListener("click", colorPatchEvent);
    });
}

function difficultyBtnEvent(e) {

    if (e.target.classList.contains("selected")) return;

    difficulty = (difficulty === "hard") ? "easy" : "hard";

    easyBtn.classList.toggle("selected");
    hardBtn.classList.toggle("selected");

    reset();
}

easyBtn.addEventListener("click", difficultyBtnEvent);
hardBtn.addEventListener("click", difficultyBtnEvent);
newBtn.addEventListener("click", reset);
window.addEventListener("load", function() {

    difficulty = "hard"

    reset();
});