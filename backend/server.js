const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const players = require('./players.json');

let corsOptions = {
    origin: '*',
    
    optionsSuccessStatus: 200,
    "Access-Control-Allow-Origin": "*"
};

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));


function findPlayer(username) {
    return players.find(player => {
        return player.username === username
    });
}

function addPlayer(username) {
    if (players.find(player => {
        return player.username === username}) === undefined) {
        players.push({
            username: username,
            scores: []
        });
        fs.writeFile('players.json', JSON.stringify(players), () => {});
        return true;
    }
    return false;

}

function changeScore(username, score) {
    for (let i = 0; i < players.length; i++) {
        if (username === players[i].username) {
            players[i].scores.push(score);
            fs.writeFile('players.json', JSON.stringify(players), () => {});
            return true;
        }
    }
    return false;
}

function deleteUser(username) {
    let player = findPlayer(username);
    if (player !== undefined) {
        let index = players.indexOf(player);
        players.splice(index, 1);
        fs.writeFile('players.json', JSON.stringify(players), () => {});
        return true;
    }
    return false;
}

function getPlayerHighScore(username) {
    let player = findPlayer(username);
    
    if (player === undefined) {
        return null;
    }
    else {
        let max = 0;
        for (let i = 0; i < player.scores.length; i++) {
            if (player.scores[i] > max) {
                max = player.scores[i];
            }
        }
        
        return max;
    }
}

app.route('/api/players').get((request, response) => {
    response.send(players);
});

app.route('/api/players/:username').get((request, response) => {
    let ret = findPlayer(request.params['username']);

    response.send(ret);
});


app.route('/api/players/:username').post((request, response) => {
    response.send(addPlayer(request.params['username']));
});

app.route('/api/players/:username/:score').put((request, response) => {
    response.send(changeScore(request.params['username'], Number(request.params['score'])));
});

app.route('/api/players/:username').delete((request, response) => {
    response.send(deleteUser(request.params['username']));
});

app.route('/api/players/highScore/:username').get((request, response) => {
    let score = getPlayerHighScore(request.params['username']);
    if (score !== null) {
        response.send(score.toString());
    }
    else {
        response.send(score);
    }
});


app.listen(3000, () => {
    console.log("server is active at: localhost:3000");
});