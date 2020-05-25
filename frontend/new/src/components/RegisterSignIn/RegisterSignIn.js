import React from 'react';
import './RegisterSignIn.css';

class RegisterSignIn extends React.Component {

    register = (
        <div id="registerSignIn">
            <button className="buttonsHome" id="register">Register</button>
            <button className="buttonsHome" id="signIn">Sign in</button>
            <input type="text" id="inputUsername"/>
            <button className="buttonsEnter" id="buttonRegister">Register</button>
            <button className="buttonsEnter" id="buttonSignIn">Sign in</button>
        </div>
    )

    render() {
        return this.register;
    }

}

export default RegisterSignIn;