import React from 'react';
import './Information.css';

class Information extends React.Component {

    render() {
        return (
            <div id="informationWrapper">
                <div id="levelWrapper" class="informationDivs">
                    <p id="level" class="informationParagraphs">
                        Level
                    </p>
                </div>
                <div id="timeWrapper" class="informationDivs">
                    <p id="time" class="informationParagraphs">
                        Time
                    </p>
                </div>
                <div id="scoreWrapper" class="informationDivs">
                    <p id="score" class="informationParagraphs">
                        Score
                    </p>
                </div>
            </div>
        );
    }
}

export default Information;