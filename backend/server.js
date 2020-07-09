'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/database';

mongoClient.connect(url, (error, db) => {
    if (error) {
        
    }
    
    var dbo = db.db();
    dbo.createCollection('players', (err, res) => {
        if (err) {
            
        }
        dbo.collection('players').createIndex({"username" : 1}, {unique: true});
        console.log('collection created');
        db.close();
    });

   
});

let corsOptions = {
    origin: '*',
    
    optionsSuccessStatus: 200,
    "Access-Control-Allow-Origin": "*"
};

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));


app.route('/api/players').get((request, response) => {
    mongoClient.connect(url, (error, db) => {
        if (error) {
            response.send(null);
            
        }

        var dbo = db.db();
        dbo.collection('players').find({}, {projection: {_id: 0, username: 1, scores: 1}}).toArray((err, res) => {
            if (err) {
                response.send(null);
              
            }

            response.send(res);
            db.close();
        });
    });
});

app.route('/api/players/:username').get((request, response) => {
    
    mongoClient.connect(url, (error, db) => {
        if (error) {
            
        }
        
        var dbo = db.db();
        let query = {username: request.params['username']};
        dbo.collection('players').find(query).toArray((err, res) => {
            if (err) {
               
            }
            
            if (res.length === 0) {
                response.send(null);
            }
            else {
                response.send({username: res[0].username, scores: res[0].scores});
            }
            db.close();
            
            
        });
    });
});


app.route('/api/players/:username').post((request, response) => {
    mongoClient.connect(url, (error, db) => {
        if (error) {
            response.send(false);
            
        }
        
        var dbo = db.db();

        dbo.collection('players').insertOne({username: request.params['username'], scores: []}, (err, res) => {
            if (err) {
                response.send(false);
                return;
            }
            response.send(true);

            db.close(); 
        });
    });
});

app.route('/api/players/:username/:score').put((request, response) => {
    mongoClient.connect(url, (error, db) => {
        if (error) {
            response.send(false);
            
        }

        var dbo = db.db();
        var query = {username: request.params['username']};
        var newValue = {$push : {scores: Number(request.params['score'])}};
        dbo.collection('players').update(query, newValue, (err, res) => {
            if (err) {
                response.send(false);
               
            }
            else {
                response.send(true);
            }

            db.close();
        });
    });
});

app.route('/api/players/:username').delete((request, response) => {
    mongoClient.connect(url, (error, db) => {
        if (error) {
            response.send(false);
           
        }
        
        var dbo = db.db();
        dbo.collection('players').deleteOne({username: request.params['username']}, (err, res) => {
            if (err) {
                response.send(false);
                
            }
            response.send(true);

            db.close(); 
        });
    });
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


app.listen(8888, () => {
    console.log("server is active at: localhost:8888");
});
