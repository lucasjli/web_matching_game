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


let images = imageUrls.concat(imageUrls);


images = randomImage(images);




function randomImage(images) {
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
            img.src = images[index++];
            img.classList.add("game-tile");
            cell.appendChild(img);
        }
    }
}

createTable();
