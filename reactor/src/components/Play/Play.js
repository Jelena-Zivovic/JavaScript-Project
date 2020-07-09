import React from 'react';
import './Play.css';

import Information from './Information';
import Game from './Game';

class Play extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            level: 1, 
            score: 0,
            didGameStart: false,
            time: "02:50"
        };

        this.timerChanging = null;

        this.sendInformation = this.sendInformation.bind(this);
        this.startGame = this.startGame.bind(this);
        this.changeTime = this.changeTime.bind(this);
        this.gameOver = this.gameOver.bind(this);

        this.imageLoser = require("../../assets/pictures/loser.png");
        this.imageWinner = require("../../assets/pictures/winner.png");

        

    }

    sendInformation(info) {
        
        this.setState({
            level: info.level,
            score: info.score,
            time: info.time,
            didGameStart: this.state.didGameStart
        });

    }

    startGame() {
        document.getElementById("informationWrapper").style.opacity = "100%";
        document.getElementById("requiredImageWrapper").style.opacity = "100%";
        document.getElementById("offeredImagesWrapper").style.opacity = "100%";
        document.getElementById("pictureWinner").style.display = "none";
        document.getElementById("pictureLoser").style.display = "none";


        this.setState({
            level: 1,
            score: 0,
            didGameStart: true,
            time: "02:50"
        });

        this.timerChanging = setInterval(this.changeTime, 10);

    } 

    changeTime() {
        let currentTimeSeconds = Number(this.state.time.substring(0, 2));
        let currentTimeHundredth = Number(this.state.time.substring(3));

        if (currentTimeSeconds === 0 && currentTimeHundredth === 0) {
            this.gameOver();
        }
        else {
            if (currentTimeHundredth === 0) {
                currentTimeSeconds--;
                currentTimeHundredth = 99;
                this.setState({
                    level: this.state.level,
                    time: "0" + currentTimeSeconds + ":" + currentTimeHundredth,
                    score: this.state.score,
                    didGameStart: true
                
                });
            }
            else {
                currentTimeHundredth--;
                if (currentTimeHundredth < 10) {
                    this.setState({
                        level: this.state.level,
                        time: "0" + currentTimeSeconds + ":0" + currentTimeHundredth,
                        score: this.state.score,
                        didGameStart: true
                    });
                }
                else {
                    this.setState({
                        level: this.state.level,
                        time: "0" + currentTimeSeconds + ":" + currentTimeHundredth,
                        score: this.state.score,
                        didGameStart: true
                    
                    });
                }
            }
        }

    }

    gameOver() {

        

        clearInterval(this.timerChanging);
        document.getElementById("informationWrapper").style.opacity = "50%";
        document.getElementById("requiredImageWrapper").style.opacity = "0%";
        document.getElementById("offeredImagesWrapper").style.opacity = "50%";
        if (this.state.score === 44) {
            document.getElementById("pictureWinner").style.display = "block";
        }
        else {
            document.getElementById("pictureLoser").style.display = "block";
        }

        this.setState({
            level: 1,
            score: 0,
            didGameStart: false,
            time: "02:50"
        });
    }

    render() {
        return (
            <div>
                <p id="start" onClick={this.startGame}>Start!</p>
                <div id="pictureLoser">
                    <img src={this.imageLoser} alt=""/>
                </div>
                <div id="pictureWinner">
                    <img src={this.imageWinner} alt=""/>
                </div>
                <Information infoToShow={this.state}/>
                <Game gameInfoChanged={this.sendInformation}
                      onGameOver={this.gameOver}/>
            </div>
        );
    }
}

export default Play;