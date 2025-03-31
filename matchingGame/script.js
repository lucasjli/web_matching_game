const imageUrls = [
    "../images/icons8-butterfly-filled-100.png",
    "../images/icons8-chicken-filled-100.png",
    "../images/icons8-crab-filled-100.png",
    "../images/icons8-dog-filled-100.png",
    "../images/icons8-dolphin-filled-100.png",
    "../images/icons8-dove-filled-100.png",
    "../images/icons8-elephant-filled-100.png",
    "../images/icons8-horse-filled-100.png"
];

const questionUrl = "../assert/question.svg";

let images = imageUrls.concat(imageUrls);


images = randomImages(images);

function randomImages(images) {
    for (let i = images.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = images[i];
        images[i] = images[j];
        images[j] = temp;
    }
    return images;
}

function createTable() {
    let table = document.getElementById("game-board");
    let index = 0;
    for (let i = 0; i < 4; i++) {
        let row = table.insertRow();
        for (let j = 0; j < 4; j++) {
            let cell = row.insertCell();
            let img = document.createElement("img");
            // img.src = images[index++];
            img.src = questionUrl;
            img.setAttribute("index", String(index++));
            img.classList.add("game-tile");
            img.addEventListener("click", clickHandler)
            cell.appendChild(img);
        }
    }
}

createTable();

let firstClick = null; // The first image that click
let secondClick = null; // The second image that click
let lockBoard = false; // Prevent consecutive clicks
let waitingForContinue = false; // Waiting for click "Continue"
function clickHandler() {
    if (lockBoard || waitingForContinue) return; // If locking or waiting for "Continue", the click does not respond
    if (this === firstClick) return; // Prevent clicking on the same page

    let index = this.getAttribute("index"); // Get current image's index
    this.src = images[index]; // Display image

    if (!firstClick) {
        firstClick = this;
    } else {
        secondClick = this;
        lockBoard = true; // Prevent consecutive clicks
        waitingForContinue = true; // Waiting for click "Continue" button
        let button = document.getElementById("continueButton");
        button.disabled = false;
    }
}

function continueHandler() {
    if (waitingForContinue && firstClick && secondClick) { // If the images are not match
        if (firstClick.src === secondClick.src) { // If the images are same
            $(firstClick).hide(); // Hide image
            $(secondClick).hide();// Hide image
        } else {
            firstClick.src = questionUrl; // Set the image as "?"
            secondClick.src = questionUrl;// Set the image as "?"
        }
        resetBoard();
    }
}

function resetBoard() {
    let button = document.getElementById("continueButton");
    button.disabled = true;
    firstClick = null;
    secondClick = null;
    lockBoard = false;
    waitingForContinue = false;
}

// Bind a click event listener to the Continue button
document.getElementById("continueButton").addEventListener("click", continueHandler);
