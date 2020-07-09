import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends React.Component {

    render() {

        return (
            <div id="header">
                <Link to="/play">
                    <button className="buttons">Play</button>
                </Link>
                <Link to="/login">
                    <button className="buttons">Log in</button>
                </Link>
                <Link to="/register">
                    <button className="buttons">Register</button>
                </Link>
                <Link to="/playerInfo">
                    <button className="buttons">Player info</button>
                </Link>
            </div>
        );
    }
}

export default Header;