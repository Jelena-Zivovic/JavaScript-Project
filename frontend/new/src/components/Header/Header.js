import React from 'react';
import './Header.css';

class Header extends React.Component {
    header = (
        <div id="headerInfo">
            <div id="start">Start!</div>
            <div id="playerInfo">
                <p id="username"></p>
                <p id="highScore"></p>
                <button id="logout" className="buttons">Log out</button>
            </div>
        </div>
    );

    render() {
        return this.header;
    }
}

export default Header;