import React from 'react';
import './OfferedImages.css';

class OfferedImages extends React.Component {

    constructor(props) {
        super(props);

        this.info = {
            level: this.props.level,
            score: this.props.score,
            numbers: this.props.offeredImagesNumbers
        };

        
        this.images= [];
        
        
        for (let i = 0; i < 5; i++) {
            this.images.push(require("../../../../assets/pictures/level_"
            + this.info.level + "/" + this.info.numbers[i] + ".png"));
        }

        this.imageClicked = this.imageClicked.bind(this);
        
    }

    imageClicked(event) {
        let index = Number(event.target.id[event.target.id.length-1])-1;
        let clickedImageNumber = this.info.numbers[index];
        this.props.onSelectedImage(clickedImageNumber);
    }

    render() {
        return (
            <div id="offeredImagesWrapper">
                <img id="img_offeredImage1" 
                     className="offeredImages" 
                     src={this.images[0]} 
                     alt=""
                     onClick={this.imageClicked} />
                <img id="img_offeredImage2" 
                     className="offeredImages" 
                     src={this.images[1]} 
                     alt=""
                     onClick={this.imageClicked}/>
                <img id="img_offeredImage3" 
                     className="offeredImages" 
                     src={this.images[2]} 
                     alt=""
                     onClick={this.imageClicked}/>
                <img id="img_offeredImage4" 
                     className="offeredImages" 
                     src={this.images[3]} 
                     alt=""
                     onClick={this.imageClicked}/>
                <img id="img_offeredImage5" 
                     className="offeredImages" 
                     src={this.images[4]} 
                     alt=""
                     onClick={this.imageClicked}/>
            
            </div>
        );
    }
}

export default OfferedImages;