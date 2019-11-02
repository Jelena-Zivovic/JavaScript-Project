'use strict';

var requiredImage;
var offeredImages;
var information;
var start;

//this indicator exists because you can start the game just once
var indicator_start_click = false;

var current_level = 1;
var current_score = 0;

//initialize game
function main() {

    //set information
    information = document.getElementById("information");

    //set starting level
    var paragraphLevel = document.createElement("p");
    paragraphLevel.id = "p_level";
    var textLevel = document.createTextNode("Level: " + String(current_level));
    paragraphLevel.appendChild(textLevel);
    paragraphLevel.style.fontFamily = "lobster";
    paragraphLevel.style.color = "darkolivegreen";
    paragraphLevel.style.textAlign = "left";
    paragraphLevel.style.fontSize = "40px";
    paragraphLevel.style.overflow = "hidden";

    var level = document.getElementById("level");
    level.appendChild(paragraphLevel);

    //set score 
    var paragraphScore = document.createElement("p");
    paragraphScore.id = "p_score";
    var textScore = document.createTextNode("Score: " + String(current_score));
    paragraphScore.appendChild(textScore);
    paragraphScore.style.fontFamily = "lobster";
    paragraphScore.style.color = "darkolivegreen";
    paragraphScore.style.textAlign = "right";
    paragraphScore.style.fontSize = "40px";
    paragraphScore.style.overflow = "hidden";

    var score = document.getElementById("score");
    score.appendChild(paragraphScore);
    
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

    start = document.getElementById("start");
    start.style.cursor = "grab";

    start.addEventListener("click", startGame);
    
}

function startGame() {
    if (!indicator_start_click) {
        add_click_events_offered_images();
        indicator_start_click = true;
    }
}

function add_click_events_offered_images() {
    offeredImages.children[0].addEventListener("click", function() {
        offered_image_clicked(0);
    });
    offeredImages.children[1].addEventListener("click", function() {
        offered_image_clicked(1);
    });
    offeredImages.children[2].addEventListener("click", function() {
        offered_image_clicked(2);
    });
    offeredImages.children[3].addEventListener("click", function() {
        offered_image_clicked(3);
    });
    offeredImages.children[4].addEventListener("click", function() {
        offered_image_clicked(4);
    });
}



function offered_image_clicked(image_number) {
    if (requiredImage.children[0].src == offeredImages.children[image_number].src) {
        current_score += 1;
        document.getElementById("p_score").innerHTML = "Score: " + String(current_score);
        change_required_image();
        change_offered_images();
    }
    else {
        game_over();
    }
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

function change_required_image() {

    var old_src = requiredImage.children[0].src;
    var last_index_slash = old_src.lastIndexOf("/");
    var level_index_slash = old_src.substring(0, last_index_slash).lastIndexOf("/");

    var random_number = Math.ceil(Math.random()*10);

    var new_src = old_src.substring(0, level_index_slash) + "/level_" + String(current_level) + "/" + String(random_number) + ".png";

    requiredImage.children[0].src = new_src;


}

function change_offered_images() {

    var last_index_slash = requiredImage.children[0].src.lastIndexOf("/");
    var last_index_dot = requiredImage.children[0].src.lastIndexOf(".");
    var number = Number(requiredImage.children[0].src.substring(last_index_slash+1, last_index_dot));


    var indexes = get_different_random_numbers(number);

    shuffle(indexes);

    for (var i = 0; i < 5; i++) {
        var old_src = offeredImages.children[i].src;
        var last_index_slash = old_src.lastIndexOf("/");
        var level_index_slash = old_src.substring(0, last_index_slash).lastIndexOf("/");


        var new_src = old_src.substring(0, level_index_slash) + "/level_" + String(current_level) + "/" + String(indexes[i]) + ".png";

        offeredImages.children[i].src = new_src;
    }
}

function game_over() {
    window.alert("Game over!");
}

main();

