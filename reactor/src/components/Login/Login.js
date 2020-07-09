import React from 'react';
import './Login.css';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            scores: []
        };

        this.promiseUser = null;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateStateUser = this.updateStateUser.bind(this);
    }

    handleChange(event) {

        this.setState({username: event.target.value, scores: []});
        
        
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

        if (promise === null) {
            alert("user is not registered!");
            
        }
        else {
            this.updateStateUser(promise);
        }

        

        event.preventDefault();


    }

    updateStateUser(promise) {
        promise.then(result => {
            if (result === "") {
                this.setState({
                    username: "",
                    scores: []
                });
                alert("User is not registered!");
                
            }
            else {
                this.setState({
                    username: result.username,
                    scores: result.scores
                });
            }
        });
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
            </div>
        );
    }
}

export default Login;