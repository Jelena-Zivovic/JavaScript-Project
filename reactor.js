'use strict';

var requiredImage;
var offeredImages;
var information;
var start;

var current_level = 1;
var current_score = 0;

//initialize game
function main() {

    //set information
    information = document.getElementById("information");

    //set starting level
    set_level();

    //set score 
    set_score();
    
    //set required image
    requiredImage = document.getElementById("requiredImage");

    set_required_image();

    //set offered images

    offeredImages = document.getElementById("offeredImages");

    set_offered_images();

    start = document.getElementById("start");
    start.style.cursor = "grab";

    start.addEventListener("click", startGame);
    
}

function startGame() {
    
}

function checkIfGameEnded() {

}

//this function returns array of 5 different numbers including required_number
function get_different_random_numbers(required_number) {
    var numbers = [required_number];

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

function set_level() {
    var paragraphLevel = document.createElement("p");
    var textLevel = document.createTextNode("Level: " + String(current_level));
    paragraphLevel.appendChild(textLevel);
    paragraphLevel.style.fontFamily = "lobster";
    paragraphLevel.style.color = "darkolivegreen";
    paragraphLevel.style.textAlign = "left";
    paragraphLevel.style.fontSize = "40px";
    paragraphLevel.style.overflow = "hidden";

    var level = document.getElementById("level");
    level.appendChild(paragraphLevel); 

    
}

function set_score() {
    var paragraphScore = document.createElement("p");
    var textScore = document.createTextNode("Score: " + String(current_score));
    paragraphScore.appendChild(textScore);
    paragraphScore.style.fontFamily = "lobster";
    paragraphScore.style.color = "darkolivegreen";
    paragraphScore.style.textAlign = "right";
    paragraphScore.style.fontSize = "40px";
    paragraphScore.style.overflow = "hidden";

    var score = document.getElementById("score");
    score.appendChild(paragraphScore);
}

function set_required_image() {
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
}

function set_offered_images() {
    var images = [];

    var last_index_slash = requiredImage.children[0].src.lastIndexOf("/");
    var last_index_dot = requiredImage.children[0].src.lastIndexOf(".");
    var number = Number(requiredImage.children[0].src.substring(last_index_slash+1, last_index_dot));

    var indexes = get_different_random_numbers(number);

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

main();

