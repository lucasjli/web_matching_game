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

let images = imageUrls.concat(imageUrls); // Combine imageUrls[], return a new images[] that has double elements


images = randomImages(images);  // Randomly shuffle the elements in the images[] array

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
    let table = document.getElementById("game-board");  // Get table by id "game-board"
    let index = 0;
    for (let i = 0; i < 4; i++) {
        let row = table.insertRow();  // Insert row <tr> in <table>
        for (let j = 0; j < 4; j++) {
            let cell = row.insertCell();  // Insert <td> in <tr>
            let img = document.createElement("img");  // Create <img> tag
            // img.src = images[index++];
            img.src = questionUrl;  // Set all images are "?" at the beginning
            img.id = "img" + index;  //  Add ids for every images
            img.setAttribute("index", String(index++));  // Set "index" attribute and translate to String type
            img.classList.add("game-tile");  // Add "game-tile" CSS class
            img.addEventListener("click", clickHandler)  // Bind a click event so that when the user clicks on an image, the clickHandler function is called
            cell.appendChild(img);  //  Add the <img> as a child element to the <td>
        }
    }
}

createTable();

let firstClick = null; // The first image that click
let secondClick = null; // The second image that click
let lockBoard = false; // Prevent consecutive clicks
// let waitingForContinue = false; // Waiting for click "Continue"
function clickHandler() {
    if (lockBoard) return; // If locking or waiting for "Continue", the click does not respond
    if (this === firstClick) return; // Prevent clicking on the same page

    let index = this.getAttribute("index"); // Get current image's index
    this.src = images[index]; // Display image

    if (!firstClick) {
        firstClick = this;
    } else {
        secondClick = this;
        lockBoard = true; // Prevent consecutive clicks
        // waitingForContinue = true; // Waiting for click "Continue" button
        let button = document.getElementById("continueButton");
        button.disabled = !button.disabled;
    }
}

function continueHandler() {
    if (lockBoard && firstClick && secondClick) { // If the images are not match
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
    button.disabled = !button.disabled;
    firstClick = null;
    secondClick = null;
    lockBoard = false;
    // waitingForContinue = false;
}

// Bind a click event listener to the Continue button
document.getElementById("continueButton").addEventListener("click", continueHandler);
