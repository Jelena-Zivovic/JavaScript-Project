const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const players = require('./players.json');

let corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
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
        return player.username === username
    }) === undefined) {
        players.push({
            username: username,
            score: 0
        });
        fs.writeFile('players.json', JSON.stringify(players), () => {});
    }
}

function changeScore(username, score) {
    for (let i = 0; i < players.length; i++) {
        if (username === players[i].username) {
            players[i].score = score;
            fs.writeFile('players.json', JSON.stringify(players), () => {});
            return;
        }
    }
}

function deleteUser(username) {
    let player = findPlayer(username);
    if (player !== undefined) {
        let index = players.indexOf(player);
        players.splice(index, 1);
        fs.writeFile('players.json', JSON.stringify(players), () => {});
    }
}

app.route('/api/players').get((request, response) => {
    response.send(players);
});

app.route('/api/players/:username').post((request, response) => {
    addPlayer(request.params['username']);
    response.status(200);
});

app.route('/api/players/:username/:score').put((request, response) => {
    changeScore(request.params['username'], Number(request.params['score']));
    response.status(200);
});

app.route('/api/players/:username').delete((request, response) => {
    deleteUser(request.params['username']);
    response.status(200);
});


app.listen(8888, () => {
    console.log("server is active at: localhost:8888");
});