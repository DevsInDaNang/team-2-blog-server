'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var config = require('./config/configuration');
var event = require('./utils/listenEvent');
var app = new express();

//  mongodb
mongoose.Promise = global.Promise;
mongoose.connect(config.db_url);

//  middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  api
require('./api/routes/index')(app);
require('./api/routes/game')(app);
require('./api/routes/gametype')(app);

/*
var GameType = require('./api/controllers/gametype');
GameType.insertGameType('headshot', 'bap headshot', 0.1);
GameType.insertGameType('sumo', 'bap sumo', 0.2);
GameType.insertGameType('football', 'bap football', 0.25);
*/

app.listen(config.port, function(err) {
    if (err) {
        console.log('Start server error');
    } else {
        console.log('App listening on port: ' + config.port);
    }
});