import React from 'react';
import './Game.css';

import RequiredImage from './RequiredImage';
import OfferedImages from './OfferedImages';

class Game extends React.Component {

    constructor(props) {

        super(props);

        this.shuffle = this.shuffle.bind(this);
        this.getDifferentRandomNumbers = this.getDifferentRandomNumbers.bind(this);
        this.check = this.check.bind(this);
        
        let level = 1;
        let score = 0;
        let requiredImage = Math.ceil(Math.random()*30);
        let offeredImages = this.shuffle(this.getDifferentRandomNumbers(requiredImage));

        this.state = {
            level: level,
            score: score,
            requiredImage: requiredImage,
            offeredImages: offeredImages,
            time: "02:50"
        };
        
    }

    getDifferentRandomNumbers(required_number) {

        let numbers = [required_number];
    
        while (numbers.length !== 5) {
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

    check(clickedImageNumber) {
        if (clickedImageNumber === this.state.requiredImage) {
            
            let requiredImage = Math.ceil(Math.random()*30);
            let offeredImages = this.shuffle(this.getDifferentRandomNumbers(requiredImage));
            
            let score = this.state.score + 1;

            let level = 0;
            let time = this.state.time;

            if (score < 15) {
                level = 1;
                time = "02:50";
            }
            else if (score >= 15 && score < 30) {
                level = 2;
                time = "02:30";
            }
            else if (score >= 30 && score < 45){
                level = 3;
                time = "02:00";
            } else if (score === 45) {
                let requiredImage = Math.ceil(Math.random()*30);
                let offeredImages = this.shuffle(this.getDifferentRandomNumbers(requiredImage));

                this.setState({
                    level: 1,
                    score: 0,
                    requiredImage: requiredImage,
                    offeredImages: offeredImages,
                    time: "02:50"
                });
                this.props.onGameOver();
            }

            this.props.gameInfoChanged({level: level, score: score, time: time});

            this.setState({
                level: level,
                score: score,
                requiredImage: requiredImage,
                offeredImages: offeredImages,
                time: time
            });
            

            
            
        }
        else {

            let requiredImage = Math.ceil(Math.random()*30);
            let offeredImages = this.shuffle(this.getDifferentRandomNumbers(requiredImage));

            this.setState({
                level: 1,
                score: 0,
                requiredImage: requiredImage,
                offeredImages: offeredImages,
                time: "02:50"
            });
            this.props.onGameOver();
        }

        
        
    }

   

    render() {
        
        return (
            <div>
                <RequiredImage level={this.state.level}
                               score={this.state.score}
                               requiredImageNumber={this.state.requiredImage}/>
                <OfferedImages level={this.state.level} 
                               score={this.state.score}
                               offeredImagesNumbers={this.state.offeredImages}
                               onSelectedImage={this.check} />
            </div>
        );
    }
}

export default Game;