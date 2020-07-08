import React from 'react';
import './OfferedImages.css';

class OfferedImages extends React.Component {

    constructor(props) {
        super(props);
 
        let images= [];
        
        
        for (let i = 0; i < 5; i++) {
            images.push(require("../../../../assets/pictures/level_"
            + this.props.level + "/" + this.props.offeredImagesNumbers[i] + ".png"));
        }

        this.state = {
            level: this.props.level,
            images: images,
            numbers: this.props.offeredImagesNumbers

        };

        this.imageClicked = this.imageClicked.bind(this);
        
    }

    imageClicked(event) {
        let index = Number(event.target.id[event.target.id.length-1])-1;
        let clickedImageNumber = this.state.numbers[index];
        this.props.onSelectedImage(clickedImageNumber);
        
        
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        let images= [];
        
        
        for (let i = 0; i < 5; i++) {
            images.push(require("../../../../assets/pictures/level_"
            + nextProps.level + "/" + nextProps.offeredImagesNumbers[i] + ".png"));
        }

        this.setState({
            level: nextProps.level,
            images: images,
            numbers: nextProps.offeredImagesNumbers
        }, () => {
            
        });
    }

  

    render() {
        return (
            <div id="offeredImagesWrapper">
                <img id="img_offeredImage1" 
                     className="offeredImages" 
                     src={this.state.images[0]} 
                     alt=""
                     onClick={this.imageClicked} />
                <img id="img_offeredImage2" 
                     className="offeredImages" 
                     src={this.state.images[1]} 
                     alt=""
                     onClick={this.imageClicked}/>
                <img id="img_offeredImage3" 
                     className="offeredImages" 
                     src={this.state.images[2]} 
                     alt=""
                     onClick={this.imageClicked}/>
                <img id="img_offeredImage4" 
                     className="offeredImages" 
                     src={this.state.images[3]} 
                     alt=""
                     onClick={this.imageClicked}/>
                <img id="img_offeredImage5" 
                     className="offeredImages" 
                     src={this.state.images[4]} 
                     alt=""
                     onClick={this.imageClicked}/>
            
            </div>
        );
    }
}

export default OfferedImages;