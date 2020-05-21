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
        return player.username === username
    }) === undefined) {
        players.push({
            username: username,
            scores: []
        });
        fs.writeFile('players.json', JSON.stringify(players), () => {});
    }
}

function changeScore(username, score) {
    for (let i = 0; i < players.length; i++) {
        if (username === players[i].username) {
            players[i].scores.push(score);
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

app.route('/api/players/:username').get((request, response) => {
    let ret = findPlayer(request.params['username']);
    if (ret === undefined) {
        response.status(404).send(null);
    }
    else {
        response.status(200).send(ret);
    }
});


app.route('/api/players/:username').post((request, response) => {
    addPlayer(request.params['username']);
    response.status(200).send('registered!');
});

app.route('/api/players/:username/:score').put((request, response) => {
    changeScore(request.params['username'], Number(request.params['score']));
    response.status(200).send('updated');
});

app.route('/api/players/:username').delete((request, response) => {
    deleteUser(request.params['username']);
    response.status(200).send('user deleted');
});


app.listen(3000, () => {
    console.log("server is active at: localhost:3000");
});