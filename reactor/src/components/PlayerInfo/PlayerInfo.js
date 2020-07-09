import React from 'react';
import './PlayerInfo.css';

class PlayerInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            condition: localStorage.length === 0,
            username: localStorage.length === 0  ? "" : localStorage.getItem("username"),
            highScore: localStorage.length === 0 ? "" : localStorage.getItem("score")
        };

  

        this.logout = this.logout.bind(this);
        this.deleteAcount = this.deleteAcount.bind(this);
    }

    logout() {
        localStorage.clear();
        this.setState({
            condition: true,
            username: "",
            highScore: 0
        });
    }

    deleteAcount() {

        let promise = new Promise((resolve, reject) => {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    if (this.responseText === "true") {
                        resolve("player is deleted");
                    }
                    else {
                        reject("error while deleting player");
                    }
                }
            }
            xhttp.open("DELETE", "http://localhost:8888/api/players/" + this.state.username, true);
            xhttp.send();
        });

        promise.then(
            (result) => {console.log(result); this.logout()},
            (error) => {console.log(error);}
        );
    }

    render() {
        return (
           <div id="playerInfoContainer">
               { this.state.condition && 
                    <div>
                        <p style={{fontSize: 40}}>You have to log in or register first.</p>
                    </div>
               }
               { !this.state.condition && 
                    <div id="userInfoContainer">
                        <p>Username: {this.state.username} </p>
                        <p>High score: {this.state.highScore} </p>
                        <button className="buttons" onClick={this.deleteAcount}>Delete</button>
                        <button className="buttons" onClick={this.logout}>Log out</button>
                    </div>
                
               }
           </div>
        );
    }
}

export default PlayerInfo;