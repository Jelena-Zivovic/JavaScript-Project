import React from 'react';
import './Information.css';

class Information extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            level: 1,
            time: "02:50",
            score: 0
        };

       

    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        this.setState({
            level: nextProps.infoToShow.level,
            time: nextProps.infoToShow.time,
            score: nextProps.infoToShow.score
        });

      
    }

    render() {
        return (
            <div id="informationWrapper">
                <div id="levelWrapper" className="informationDivs">
                    <p id="level" className="informationParagraphs">
                        Level: {this.state.level}
                    </p>
                </div>
                <div id="timeWrapper" className="informationDivs">
                    <p id="time" className="informationParagraphs">
                        Time: {this.state.time}
                    </p>
                </div>
                <div id="scoreWrapper" className="informationDivs">
                    <p id="score" className="informationParagraphs">
                        Score: {this.state.score}
                    </p>
                </div>
            </div>
        );
    }
}

export default Information;