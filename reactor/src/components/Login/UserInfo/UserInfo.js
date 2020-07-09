import React from 'react';
import './UserInfo.css';

class UserInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            scores: [],
            highScore: 0
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        let high = 0;

        if (nextProps.info.scores !== undefined) {
            let scores = nextProps.info.scores;
        
            for (let i = 0; i < scores.length; i++) {
                if (scores[i] > high) {
                    high = scores[i];
                }
            }
            
            
        }

        this.setState({
            username: nextProps.info.username,
            scores: nextProps.info.scores,
            highScore: high
        });
        
    }

    render() {
        return (
            <div style={{fontSize: 30}}>
        {  (this.state.username !== "") &&       <p>User info:</p> }
        {  (this.state.username !== "") &&        <hr/> }
        {  (this.state.username !== "") && <p>Username: {this.state.username}</p> }
        {  (this.state.username !== "") && <p>High score: {this.state.highScore}</p>  }
            </div>
        )
    }
}

export default UserInfo;