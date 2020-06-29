import React from 'react';
import './Play.css';

import Information from './Information';
import Game from './Game';

class Play extends React.Component {

    render() {
        return (
            <div>
                <p id="start">Start!</p>
                <Information />
                <Game />
            </div>
        );
    }
}

export default Play;