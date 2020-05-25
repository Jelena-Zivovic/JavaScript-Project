'use strict';

class Image {
    constructor(imageId, imageSrc) {
        this._imageId = imageId;
        this._imageSrc = imageSrc;
    }

    get imageId() {
        return this._imageId;
    }

    set imageId(id) {
        this._imageId = id;
    }

    get imageSrc() {
        return this._imageSrc;
    }

    set imageSrc(src) {
        this._imageSrc = src;
        document.getElementById(this.imageId).src = src;
    }
}

class RequiredImage {
    constructor(imageId) {
        let randomNumber = Math.ceil(Math.random()*30);
        let imageSrc = "pictures/level_1/" + randomNumber + ".png";
        this._image = new Image(imageId, imageSrc);
    }

    get imageId() {
        return this._image.imageId;
    }

    get imageSrc() {
        return this._image.imageSrc;
    }

    set imageSrc(src) {
        this._image.imageSrc = src;
    }

    setImage() {
        document.getElementById(this.imageId).src = this.imageSrc;
        document.getElementById("requiredImageWrapper").style.display = "block";
    }

    changeImage(currentLevel) {
        let randomNumber = Math.ceil(Math.random()*30);
        
        let oldSrc = this.imageSrc;
        let lastIndexSlash = oldSrc.lastIndexOf("/");
        let levelIndexSlash = oldSrc.substring(0, lastIndexSlash).lastIndexOf("/");

        let newSrc = oldSrc.substring(0, levelIndexSlash) + "/level_" + currentLevel + "/" + randomNumber + ".png";

        this.imageSrc = newSrc;
    }

    getImageNumber() {
        let oldSrc = this.imageSrc;
        let lastIndexSlash = oldSrc.lastIndexOf("/");
        let lastIndexDot = oldSrc.lastIndexOf(".");
        var imageNumber = Number(oldSrc.substring(lastIndexSlash+1, lastIndexDot));
        return imageNumber;
    }   
}

class OfferedImages {
    constructor() {
        this._images = [];
        for (let i = 0; i < 5; i++) {
            this._images[i] = new Image("", "");
            this._indicatorEventListenersAdded = false;
        }
    }

    get images() {
        return this._images;
    }

    get indicatorEventListenersAdded() {
        return this._indicatorEventListenersAdded;
    }

    getDifferentRandomNumbers(required_number) {

        let numbers = [required_number];
    
        while (numbers.length != 5) {
            let random_number = Math.ceil(Math.random()*30);
    
            if (!numbers.includes(random_number)) {
                numbers.push(random_number);
            }
        }
        return numbers;
    }

    shuffle(array) {
        let j, x, i;
    
        for (i = array.length-1; i > 0; i--) {
            j = Math.floor(Math.random()*(i + 1));
            x = array[i];
            array[i] = array[j];
            array[j] = x;
        }
    
        return array;
    }

    setImages(requiredImageNumber) {
        let indexes = this.getDifferentRandomNumbers(requiredImageNumber);
        this.shuffle(indexes);

        for (let i = 0; i < 5; i++) {
            let currentImageSrc = "pictures/level_1/" + indexes[i] + ".png";
            this.images[i].imageId = "img_offeredImage" + String(i+1);
            this.images[i].imageSrc = currentImageSrc;    
        }

        document.getElementById("offeredImagesWrapper").style.display = "block";
    }

    changeImages(currentLevel, requiredImageNumber) {
        let indexes = this.getDifferentRandomNumbers(requiredImageNumber);
        this.shuffle(indexes);

        for (let i = 0; i < 5; i++) {
            let oldSrc = this.images[i].imageSrc;
            let lastIndexSlash = oldSrc.lastIndexOf("/");
            let levelIndexSlash = oldSrc.substring(0, lastIndexSlash).lastIndexOf("/");

            let newSrc = oldSrc.substring(0, levelIndexSlash) + "/level_" + currentLevel + "/" + indexes[i] + ".png";

            this.images[i].imageSrc = newSrc;
        }
    }

    addEventListeners() {
        for (let i = 0; i < 5; i++) {
            document.getElementById(this.images[i].imageId).addEventListener("click", function() {
                offeredImageClicked(i);
            });
        }
        this._indicatorEventListenersAdded = true;
    } 
}

class Information {
    constructor() {
        this._timeLeftLevel1 = "Time left: 02:50";
        this._timeLeftLevel2 = "Time left: 02:30";
        this._timeLeftLevel3 = "Time left: 02:00";
        this._level = 1;
        this._time = this._timeLeftLevel1;
        this._score = 0;
    }

    get timeLeftLevel1() {
        return this._timeLeftLevel1;
    }

    get timeLeftLevel2() {
        return this._timeLeftLevel2;
    }

    get timeLeftLevel3() {
        return this._timeLeftLevel3;
    }

    get level() {
        return this._level;
    }

    set level(currentLevel) {
        this._level = currentLevel;
        document.getElementById("level").textContent = "Level: " + currentLevel;
    }

    get time() {
        return this._time;    
    }

    set time(currentTime) {
        this._time = currentTime;
        document.getElementById("time").textContent = currentTime;
    }

    get score() {
        return this._score;
    }

    set score(currentScore) {
        this._score = currentScore;
        document.getElementById("score").textContent = "Score: " + currentScore;
    }

    setInformation() {
        this.level = 1;
        this.time = this.timeLeftLevel1;
        this.score = 0;

        document.getElementById("informationWrapper").style.display = "block";
    }

    increaseScore() {
        this.score = this.score + 1;
        
        if (this.score < 15) {
            this.time = this.timeLeftLevel1;
        }
        else if (this.score >= 15 && this.score < 30) {
            this.level = 2
            this.time = this.timeLeftLevel2;
        }
        else if (this.score >= 30) {
            this.level = 3;
            this.time = this.timeLeftLevel3;
        }   
    }
}

var information;
var requiredImage;
var offeredImages;

var animation = document.getElementById("animation");
var animationPosition = 800;
var timerAnimation;

var indicatorGameStarted = false;
var indicatorGameEnded = false;

var timerChangingImages;

var userInfo = {
    username: "" ,
    maxScore: 0
};

function main() {

    
    updateUserInfo(localStorage.getItem('username'));
    
    logout();

    information = new Information();
    information.setInformation();

    requiredImage = new RequiredImage("img_requiredImage");
    requiredImage.setImage();


    offeredImages = new OfferedImages();
    offeredImages.setImages(requiredImage.getImageNumber());

    document.getElementById("start").addEventListener("click",() => {
        if (isSomeoneLoggedIn()) {
            startGame();
        }
    });

    document.getElementById('register').addEventListener('click', () => {
        document.getElementById('inputUsername').style.display = 'block';
        document.getElementById('buttonRegister').style.display = 'inline';
        document.getElementById('buttonSignIn').style.display = 'none';
    });

    document.getElementById('signIn').addEventListener('click', () => {
        document.getElementById('inputUsername').style.display = 'block';
        document.getElementById('buttonSignIn').style.display = 'inline';
        document.getElementById('buttonRegister').style.display = 'none';
    });

    document.getElementById('buttonRegister').addEventListener('click', () => {
        let username = document.getElementById('inputUsername').value;

        getAllPlayers().then(
            (result) => {
                
                if(checkIfUsernameIsUnique(username, JSON.parse(result))) {
                    registerPlayer(username);
                }
                else {
                    alert('username is not unique');
                }
            },
            (error) => {console.log(error);}
        );
        
        
    });

    document.getElementById('buttonSignIn').addEventListener('click', () => {
        let username = document.getElementById('inputUsername').value;
        getPlayer(username).then(
            (result) => {
                if (result === "") {
                    alert('user is not registered');
                }
                else {
                    signIn(username);
                }
            },
            (error) => {
                console.log(error);
            }
        );
    
    });

    document.getElementById('logout').addEventListener('click', () => {
        logout();
        
    });
    
    
    
}

function checkIfUsernameIsUnique(username, players) {
    for (let i = 0; i < players.length; i++) {
        if (username === players[i].username) {
            return false;
        }
    }
    return true;
}

function logout() {
    document.getElementById('playerInfo').style.display = 'none';
    localStorage.clear();
    displayHeader();
    
}


function displayHeader() {
    document.getElementById('start').style.opacity = isSomeoneLoggedIn() ? '100%' : '50%';
    document.getElementById('registerSignIn').style.display = isSomeoneLoggedIn() ? 'none' : 'block';
    document.getElementById('playerInfo').style.display = isSomeoneLoggedIn() ? 'inline' : 'none';
    document.getElementById('buttonRegister').style.display = 'none';
    document.getElementById('buttonSignIn').style.display = 'none';
    document.getElementById('inputUsername').style.display = 'none';

}

function isSomeoneLoggedIn() {
    if (localStorage.length === 0) {
        return false;
    }
    return true;
}

function startGame() {

    updateUserInfo(localStorage.getItem('username'));
    showUserInfo();

    if (!indicatorGameStarted) {
        if (!offeredImages.indicatorEventListenersAdded)
            offeredImages.addEventListeners();        
        indicatorGameStarted = true;
        timerChangingImages = setInterval(changeTime, 10);
    }
}

function changeTime() {
    let currentTime = information.time;
    let currentTimeSeconds = Number(currentTime[12]);
    let currentTimeHundredth = Number(currentTime.substring(14, 16));

    if (currentTimeSeconds == 0 && currentTimeHundredth == 0) {
        clearInterval(timerChangingImages);
        gameOver();
    }
    else {
        if (currentTimeHundredth == 0) {
            currentTimeSeconds--;
            currentTimeHundredth = 99;
            information.time = "Time left: 0" + currentTimeSeconds + ":" + currentTimeHundredth;

        }
        else {
            currentTimeHundredth--;
            if (currentTimeHundredth < 10) {
                information.time = "Time left: 0" + currentTimeSeconds + ":0" + currentTimeHundredth;
            }
            else {
                information.time = "Time left: 0" + currentTimeSeconds + ":" + currentTimeHundredth;
            }
        }
    }
}

function offeredImageClicked(imageNumber) {
    if (!indicatorGameEnded) {
        let requiredImageSrc = requiredImage.imageSrc;
        let clickedImageSrc = offeredImages.images[imageNumber].imageSrc;

        if (requiredImageSrc === clickedImageSrc) {
            information.increaseScore();
            if (information.score == 45) {
                gameOver();
                return;
            }
            requiredImage.changeImage(information.level);
            offeredImages.changeImages(information.level, requiredImage.getImageNumber());
        }
        else {
            gameOver();
        }
    }
}

function gameOver() {

    indicatorGameEnded = true;

    updateUserScore(localStorage.getItem('username')).then(
        (result) => {
            console.log(result);
        },
        (error) => {
            console.log(error);
        }
    );

    updateUserInfo(localStorage.getItem('username'));
    showUserInfo();

    document.getElementById("start").style.opacity = "50%";
    document.getElementById("informationWrapper").style.opacity = "50%";
    document.getElementById("requiredImageWrapper").style.opacity = "50%";
    document.getElementById("offeredImagesWrapper").style.opacity = "50%";

    clearInterval(timerChangingImages);

    animation.style.display = "block"; 

    if (information.score == 45) { 
        animation.style.backgroundImage = "url('pictures/winner.png')";
        timerAnimation = setInterval(move, 3);
    }
    else {
        animation.style.backgroundImage = "url('pictures/loser.png')";
        timerAnimation = setInterval(move, 3);
    }
}

function move() {
    animationPosition--;
    if (animationPosition == 350) {
        clearInterval(timerAnimation);
        information.time = "";
        checkIfPlayerWantsToPlayAgain();
    }
    else {
        animation.style.left = animationPosition + "px";
    }
}

function checkIfPlayerWantsToPlayAgain() {
    document.getElementById("questionWrapper").style.display = "block";

    document.getElementById("buttonYes").addEventListener("click", function playAgain() {
        indicatorGameEnded = false;
        indicatorGameStarted = false;
        information.level = 1;
        information.score = 0;
        information.time = information.timeLeftLevel1;
        animationPosition = 800;
        animation.style.display = "none";
        document.getElementById("questionWrapper").style.display = "none";
        document.getElementById("start").style.opacity = "100%";
        document.getElementById("informationWrapper").style.opacity = "100%";
        document.getElementById("requiredImageWrapper").style.opacity = "100%";
        document.getElementById("offeredImagesWrapper").style.opacity = "100%";

        requiredImage.changeImage(information.level);
        offeredImages.changeImages(information.level, requiredImage.getImageNumber());
        startGame();
    });
    document.getElementById("buttonNo").addEventListener("click", function endGame() {
        animation.style.backgroundImage = "url('pictures/sad.png')";
        information.time = "";
        document.getElementById("questionWrapper").style.display = "none";
    });
}


function deletePlayer(username) {
    
    let promise = new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                if (this.responseText === 'text') {
                    resolve('player is deleted');
                }
                else {
                    resolve('error while deleting player');
                }
            }
        }
        xhttp.open("DELETE", 'http://localhost:3000/api/players/' + username, true);
        xhttp.send();
    });

    promise.then(
        (result) => {console.log(result);},
        (error) => {console.log(error);}
    );



}

function getPlayer(username) {

    let promise = new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                if (this.responseText === 'undefined') {
                    reject(null);
                }
                else {
                    resolve(this.response);
                }
            }
        }

        xhttp.open("GET", 'http://localhost:3000/api/players/' + username, true);
        xhttp.send();
    });

    return promise;

}


function getAllPlayers() {
    let promise = new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                if (this.response !== null) {
                    resolve(this.response);
                }
                else {
                    reject(null);
                }
            }

        }

        xhttp.open("GET", 'http://localhost:3000/api/players', true);
        xhttp.send();
        
    });

    return promise;
    
    
}

function registerPlayer(username) {

    let promise = new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                if (this.responseText === 'true') {
                    resolve('user is registered');
                }
                else {
                    reject('user is already registered');
                }
            } 
        }

        xhttp.open("POST", 'http://localhost:3000/api/players/' + username, true);
        xhttp.send();

    });

    promise.then((result) => {console.log(result)}, (error) => {alert(error)});
}


function updateUserInfo(username) {

    userInfo.username =  username;
    getPlayer(username).then(
        (result) => {
            let data = JSON.parse(result);
            let max = 0;
            for (let i = 0; i < data.scores.length; i++) {
                if (data.scores[i] > max) {
                    max = data.scores[i];
                }
            }
            
            userInfo.maxScore = max;
            
            
        },
        (error) => {
            console.log(error);
        }
    );

   

}

function showUserInfo() {
    console.log(userInfo);
    document.getElementById('username').textContent = 'Username: ' + userInfo.username;
    document.getElementById('highScore').textContent = 'High score: ' + userInfo.maxScore;

    document.getElementById('playerInfo').style.display = 'inline';

}

function signIn(username) {
    

    localStorage.setItem('username', username);
    updateUserInfo(username);
    showUserInfo();
    displayHeader();
}

function updateUserScore(username) {
    let promise = new Promise((resolve, reject)  => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                if (this.responseText === 'true') {
                    resolve('score updated');
                }
                else {
                    reject('error while updating score');
                }
            }
        }

        xhttp.open("PUT", 'http://localhost:3000/api/players/' + username + '/' + information.score, true);
        xhttp.send();
    });

    return promise;
} 

main();
