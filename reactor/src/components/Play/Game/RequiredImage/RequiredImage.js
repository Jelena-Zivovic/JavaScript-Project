import React from 'react';
import './RequiredImage.css';

class RequiredImage extends React.Component {

    constructor(props) {
        super(props);
        let randomNumber = Math.ceil(Math.random()*30);
        let imageSrc = "JavaScript-Project/reactor/src/assets/pictures/level_1/" + randomNumber + ".png";
        console.log(imageSrc);
        this.state = {imageSrc: imageSrc}
    }

    render() {
        return (
            <div id="requiredImageWrapper">
                <img id="img_requiredImage" src={this.state.imageSrc} alt=""/>
            </div>
        );
    }
}

export default RequiredImage;