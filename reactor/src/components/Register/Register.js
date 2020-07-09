import React from 'react';
import './Register.css';

class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {  
        
        let promise = new Promise((resolve, reject) => {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    if (this.responseText === 'true') {
                        resolve('user is registered');
                    }
                    else {
                        reject('user is already registered');
                    }
                }
            }

            xhttp.open('POST', 'http://localhost:8888/api/players/' + this.state.username, true);
            xhttp.send();
        });

        promise.then((result) => {console.log(result)}, (error) => {alert(error)});

        event.preventDefault(); 

    }

    handleChange(event) {
        this.setState({username: event.target.value});
    }

    render() {
        return (
            <div id="formContaniner">
                <form onSubmit={this.handleSubmit}>
                    <label>Username:</label><br/><br/>
                    <input type="text" value={this.state.username} onChange={this.handleChange} />
                    <br/><br/>
                    <button type="submit" className="buttons">Register</button>
                </form>
            </div>
        );
    }
}

export default Register;