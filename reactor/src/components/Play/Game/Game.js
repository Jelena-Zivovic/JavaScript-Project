import React from 'react';
import './Game.css';

import RequiredImage from './RequiredImage';
import OfferedImages from './OfferedImages';

class Game extends React.Component {

    render() {
        return (
            <div>
                <RequiredImage />
                <OfferedImages />
            </div>
        );
    }
}

export default Game;