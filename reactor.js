'use strict';

var requiredImage;
var offeredImages;

var current_level = 1;


//initialize game
function main() {
    
    //set required image
    requiredImage = document.getElementById("requiredImage");

    var random_number = Math.ceil(Math.random()*10);
    var name_of_current_image = String(random_number) + ".png";

    var image = document.createElement("img");
    image.src = "pictures/level_1/" + name_of_current_image;
    image.width = 200;
    image.height = 200;

    requiredImage.appendChild(image);
    image.style.position = "relative";
    image.style.top = "25px";
    image.style.left = "400px";

    //set offered images

    offeredImages = document.getElementById("offeredImages");

    var images = [];

    var indexes = get_different_random_numbers(random_number);

    shuffle(indexes);

    for (var i = 0; i < 5; i++) {
        images[i] = document.createElement("img");
        var name = "pictures/level_1/" + String(indexes[i]) + ".png";
        images[i].src = name;
        images[i].width = 100;
        images[i].height = 100;
        images[i].style.position = "relative";
        images[i].style.top = "25px";
    }

    for (var i = 0; i < 5; i++) {
        images[i].style.left = String((i+3) * 50) + "px";
        offeredImages.appendChild(images[i]);
    }

    
}

function startGame() {

}

function checkIfGameEnded() {

}

function get_different_random_numbers(required) {
    var numbers = [required];

    while (numbers.length != 5) {
        var random_number = Math.ceil(Math.random()*10);

        if (!numbers.includes(random_number)) {
            numbers.push(random_number);
        }
    }

    return numbers;
}

function shuffle(array) {
    var j, x, i;

    for (i = array.length-1; i > 0; i--) {
        j = Math.floor(Math.random()*(i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }

    return array;
}

main();

