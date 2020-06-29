import React from 'react';
import './RequiredImage.css';

class RequiredImage extends React.Component {

    constructor(props) {
        super(props);
        this.info = {
            level: this.props.level,
            score: this.props.score,
            number: this.props.requiredImageNumber
        };
        
        this.image = require("../../../../assets/pictures/level_" + 
                            this.info.level + "/" + this.info.number + ".png")
        
    }

    render() {

        
        return (
            <div id="requiredImageWrapper">
                <img id="img_requiredImage" src={this.image} alt=""/>
            </div>
        );
    }
}

export default RequiredImage;