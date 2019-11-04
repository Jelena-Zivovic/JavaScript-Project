'use strict';

var requiredImage;
var offeredImages;
var information;
var animation;
var question;
var start;

var timer_changing_images;
var timer_animation;

//this indicator exists because you can start the game just once
var indicator_start_click = false;

var indicator_game_ended = false;

//indicator that shows if event listeners are added on required and offered images
var indicator_event_listeners_added = false;

var current_level = 1;
var current_score = 0;

var time_left_level_1 = "Time left: 02:50";
var time_left_level_2 = "Time left: 02:20";
var time_left_level_3 = "Time left: 02:00";

var number_of_images = 30;
//starting position of animation at the end of the game
var position_animation = 800;

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

    //set starting time
    var paragraphTime = document.createElement("p");
    paragraphTime.id = "p_time";
    var textTime = document.createTextNode(time_left_level_1);
    paragraphTime.appendChild(textTime);
    paragraphTime.style.fontFamily = "lobster";
    paragraphTime.style.color = "darkolivegreen";
    paragraphTime.style.textAlign = "center";
    paragraphTime.style.fontSize = "40px";
    paragraphTime.style.overflow = "hidden";

    var time = document.getElementById("time");
    time.appendChild(paragraphTime);

    //set starting score 
    var paragraphScore = document.createElement("p");
    paragraphScore.id = "p_score";
    var textScore = document.createTextNode("Score: 0");
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

    var random_number = Math.ceil(Math.random()*number_of_images);
    var name_of_current_image = String(random_number) + ".png";

    var image = document.createElement("img");
    image.id = "img_requiredImage"
    image.src = "pictures/level_1/" + name_of_current_image;
    image.width = 200;
    image.height = 200;

    requiredImage.appendChild(image);
    image.style.position = "relative";
    image.style.top = "25px";
    image.style.left = "400px";
    image.style.borderRadius = "20px";

    //set offered images

    offeredImages = document.getElementById("offeredImages");

    var images = [];

    //one of the offered images must be required image
    var last_index_slash = requiredImage.children[0].src.lastIndexOf("/");
    var last_index_dot = requiredImage.children[0].src.lastIndexOf(".");
    var number = Number(requiredImage.children[0].src.substring(last_index_slash+1, last_index_dot));

    var indexes = get_different_random_numbers(number);

    shuffle(indexes);

    for (var i = 0; i < 5; i++) {
        images[i] = document.createElement("img");
        images[i].className = "img_offeredImages";
        var name = "pictures/level_1/" + String(indexes[i]) + ".png";
        images[i].src = name;
        images[i].width = 100;
        images[i].height = 100;
        images[i].style.position = "relative";
        images[i].style.top = "25px";
        images[i].style.left = String((i+3)*50) + "px";
        images[i].style.borderRadius = "20px";
        offeredImages.appendChild(images[i]);
    }

    animation = document.getElementById("animation");

    question = document.getElementById("question");
    
    start = document.getElementById("start");
    start.style.cursor = "pointer";

    //when start is clicked, game starts
    start.addEventListener("click", startGame);   
}
function startGame() {

    if (!indicator_start_click) {
        add_click_events_offered_images();

        indicator_event_listeners_added = true;
        indicator_start_click = true;
        
        timer_changing_images = setInterval(change_time_left, 10);
    }
}

function change_time_left() {

    var time_text = document.getElementById("p_time").textContent;
    var time_left_seconds = Number(time_text[12]);
    var time_left_hundredth = Number(time_text.substring(14, 16));
    if (time_left_seconds == 0 && time_left_hundredth == 0) {
        clearInterval(timer_changing_images);
        game_over();
    }
    else {
       if (time_left_hundredth == 0) {
           time_left_seconds--;
           time_left_hundredth = 99;
           document.getElementById("p_time").textContent = "Time left: 0" + String(time_left_seconds) + ":" + String(time_left_hundredth);
       }
       else {
           time_left_hundredth--;
           if (time_left_hundredth < 10) {
               document.getElementById("p_time").textContent = "Time left: 0" + String(time_left_seconds) + ":0" + String(time_left_hundredth);
           }
           else {
                document.getElementById("p_time").textContent = "Time left: 0" + String(time_left_seconds) + ":" + String(time_left_hundredth);
           }
       }    
    }
}

function add_click_events_offered_images() {

    if (!indicator_event_listeners_added) {
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
}

function offered_image_clicked(image_number) {

    if (!indicator_game_ended) {
        if (requiredImage.children[0].src == offeredImages.children[image_number].src) {
            current_score += 1;
            if (current_score == 15) {
                current_level = 2;
                document.getElementById("p_level").textContent = "Level: 2";    
            }
            else if (current_score == 30) {
                current_level = 3;
                document.getElementById("p_level").innerHTML = "Level: 3";
            }
            else if (current_score == 45) {
                game_over();
            }
            document.getElementById("p_score").innerHTML = "Score: " + String(current_score);
            change_required_image();
            change_offered_images();

            if (current_level == 1) {
                document.getElementById("p_time").textContent = time_left_level_1;
            }
            else if (current_level == 2) {
                document.getElementById("p_time").textContent = time_left_level_2;
            }
            else if (current_level == 3) {
                document.getElementById("p_time").textContent = time_left_level_3;
            }
        }
        else {
            //wrong image is clicked
            game_over();
        }
    }
}

//this function returns array of 5 different numbers including required_number
function get_different_random_numbers(required_number) {

    var numbers = [required_number];

    while (numbers.length != 5) {
        var random_number = Math.ceil(Math.random()*number_of_images);

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

    var random_number = Math.ceil(Math.random()*number_of_images);

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

    indicator_game_ended = true;

    clearInterval(timer_changing_images);

    requiredImage.style.opacity = "50%";
    information.style.opacity = "50%";
    offeredImages.style.opacity = "50%";
    start.style.opacity = "50%";

    animation.style.display = "block";

    if (current_score == 45) {
        animation.style.backgroundImage = "url('pictures/winner.png')";
        timer_animation = setInterval(move, 2);
    }
    else { 
        animation.style.backgroundImage = "url('pictures/loser.png')";
        timer_animation = setInterval(move, 2);
    }
}

function move() {
   position_animation--;
   if(position_animation == 350) {
        clearInterval(timer_animation);
        document.getElementById("p_time").textContent = "";
        check_if_player_wants_to_play_again();

        question.style.display = "block";
   }
   else {
       animation.style.left = position_animation + "px";
   }
}

function check_if_player_wants_to_play_again() {

    var textQuestion = document.createTextNode("Do you want to play again?");
    var paragraphQuestion = document.createElement("p");
    paragraphQuestion.appendChild(textQuestion);
    paragraphQuestion.style.textAlign = "center";
    paragraphQuestion.style.fontFamily = "lobster";
    paragraphQuestion.style.color = "darkolivegreen";
    paragraphQuestion.style.fontSize = "20px";
    question.appendChild(paragraphQuestion);

    //creating "yes" button
    var buttonYes = document.createElement("button");
    buttonYes.id = "buttonYes";
    buttonYes.textContent = "YES";
    buttonYes.style.fontFamily = "lobster";
    buttonYes.style.position = "relative";
    buttonYes.style.left = "100px";
    buttonYes.style.color = "darkolivegreen";
    buttonYes.style.width = "100px";
    buttonYes.style.backgroundColor = "papayawhip";
    buttonYes.style.border = "2px solid gray";
    buttonYes.addEventListener("mousemove", function() {
        buttonYes.style.backgroundColor = "gray";
    });
    buttonYes.addEventListener("mouseout", function() {
        buttonYes.style.backgroundColor = "papayawhip";
    });
    buttonYes.addEventListener("click", play_again);
    question.appendChild(buttonYes);     
        
    //creating "no" button
    var buttonNo = document.createElement("button");
    buttonNo.textContent = "NO";
    buttonNo.style.fontFamily = "lobster";
    buttonNo.style.position = "relative";
    buttonNo.style.left = "200px";
    buttonNo.style.width = "100px";
    buttonNo.style.color = "darkolivegreen";
    buttonNo.style.backgroundColor = "papayawhip";
    buttonNo.style.border = "2px solid gray";
    buttonNo.addEventListener("mousemove", function() {
        buttonNo.style.backgroundColor = "gray";
    });
    buttonNo.addEventListener("mouseout", function() {
        buttonNo.style.backgroundColor = "papayawhip";
    });
    buttonNo.addEventListener("click", end_game);
    question.appendChild(buttonNo);  
}

function play_again() {
    indicator_game_ended = false;
    indicator_start_click = false;
    current_level = 1;
    current_score = 0;
    position_animation = 800;
    animation.style.display = "none";
    question.style.display = "none";
    document.getElementById("p_time").textContent = time_left_level_1;
    requiredImage.style.opacity = "100%";
    information.style.opacity = "100%";
    offeredImages.style.opacity = "100%";
    start.style.opacity = "100%";
    change_required_image();
    change_offered_images();
    startGame();   
}

function end_game() {
    animation.style.backgroundImage = "url('pictures/sad.png')";
    document.getElementById("p_time").textContent = "";
    question.style.display = "none";
}

main();



