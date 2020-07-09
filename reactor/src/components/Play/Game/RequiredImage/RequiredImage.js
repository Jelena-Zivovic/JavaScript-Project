import React from 'react';
import './RequiredImage.css';

class RequiredImage extends React.Component {

    constructor(props) {
        super(props);
        
        
        let image = require("../../../../assets/pictures/level_" + 
                            this.props.level + "/" + this.props.requiredImageNumber + ".png");
        
        this.state = {
            level: this.props.level,
            image: image,
            number: this.props.requiredImageNumber
        };

                    
        
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.level === 0) {
            return;
        }


        let image = require("../../../../assets/pictures/level_" + 
            nextProps.level + "/" + nextProps.requiredImageNumber + ".png");

        this.setState({
            level: nextProps.level,
            image: image,
            number: nextProps.requiredImageNumber
        }, () => {

        });
    }

    render() {
        return (
            <div id="requiredImageWrapper">
                <img id="img_requiredImage" src={this.state.image} alt=""/>
            </div>
        );
    }
}

export default RequiredImage;