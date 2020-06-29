import React from 'react';
import './Information.css';

class Information extends React.Component {

    render() {
        return (
            <div id="informationWrapper">
                <div id="levelWrapper" className="informationDivs">
                    <p id="level" className="informationParagraphs">
                        Level
                    </p>
                </div>
                <div id="timeWrapper" className="informationDivs">
                    <p id="time" className="informationParagraphs">
                        Time
                    </p>
                </div>
                <div id="scoreWrapper" className="informationDivs">
                    <p id="score" className="informationParagraphs">
                        Score
                    </p>
                </div>
            </div>
        );
    }
}

export default Information;