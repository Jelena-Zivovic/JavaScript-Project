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
        }
    }

    get images() {
        return this._images;
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

    changeInformation(currentLevel, currentTime, currentScore) {
        this.level = "Level: " + currentLevel;
        this.time = currentTime;
        this.score = "Score: " + currentScore;
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

var indicatorGameStarted = false;
var indicatorGameEnded = false;
var timerChangingImages;

function main() {

    information = new Information();
    information.setInformation();

    requiredImage = new RequiredImage("img_requiredImage");
    requiredImage.setImage();


    offeredImages = new OfferedImages();
    offeredImages.setImages(requiredImage.getImageNumber());

    document.getElementById("start").addEventListener("click", startGame);
    
}

function startGame() {
    if (!indicatorGameStarted) {
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
            console.log("that's roght");
            information.increaseScore();
            requiredImage.changeImage(information.level);
            offeredImages.changeImages(information.level, requiredImage.getImageNumber());
        }
        else {
            gameOver();
        }
    }
}

function gameOver() {
    console.log("game over");
    indicatorGameEnded = true;
}

main();
