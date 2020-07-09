import React from 'react';
import './Login.css';
import UserInfo from './UserInfo';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: ''
        };

        this.dataToSend = {
            username: '',
            scores: []
        };

        this.promiseUser = null;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {

        this.setState({username: event.target.value});
    }

    handleSubmit(event) {

        let promise = new Promise((resolve, reject) => {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    if (this.responseText === "undefined") {
                        reject(null);
                    }
                    else {
                        resolve(this.response);
                    }
                }
            }

            xhttp.open("GET", "http://localhost:8888/api/players/" + this.state.username, true);
            xhttp.send();
        });

        promise.then(result => {
            if (result === "") {
                alert("user is not registered");
            }
            else {
                this.dataToSend = {
                    username: this.state.username,
                    scores: result.scores
                };
                this.setState({
                    username: result.username
                });
            }
        })
       

        

        event.preventDefault();


    }

    render() {
        return (
            <div id="formContaniner1">
                <form onSubmit={this.handleSubmit}>
                    <label>Username:</label><br/><br/>
                    <input type="text" value={this.state.username} onChange={this.handleChange} />
                    <br/><br/>
                    <button type="submit" className="buttons">Log in</button>
                </form>
                <br/><hr/><br/><br/>
                <UserInfo info={this.dataToSend}/>
            </div>
        );
    }
}

export default Login;