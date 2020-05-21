const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const players = require('./players.json');

const app = express();
app.use(bodyParser.json());

function findPlayer(username) {
    return players.find(player => {
        return player.username === username
    });
}

function addPlayer(username, score) {
    if (players.find(player => {
        return player.username === username
    }) === undefined) {
        players.push({
            username: username,
            score: score
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
        players = players.splice(index, 1);
        fs.writeFile('players.json', JSON.stringify(players), () => {});
    }
}

app.route('/api/players').get((request, response) => {
    response.send(players);
});

app.route('/api/players/:username').get((request, response) => {
    response.send(findPlayer(request.params['username']));
});

app.route('/api/players/:username').post((request, response) => {
    addPlayer(request.params['username'], request.body);
    response.status(200);
});

app.route('/api/players/:username').put((request, response) => {
    changeScore(request.params['username'], request.body);
    response.status(200);
});

app.route('/api/players/:username').delete((request, response) => {
    deleteUser(username);
    response.status(200);
});


app.listen(8888, () => {
    console.log("server is active at: localhost:8888");
});