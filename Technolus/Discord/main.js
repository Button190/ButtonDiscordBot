/*
Official documentation:
https://discord.js.org/#/docs/main/stable/

Create bot:
https://discord.com/developers/
https://discordapi.com/permissions.html#281600

// pre built link to add bot to server (with proper permissions to post messages):
https://discord.com/oauth2/authorize?client_id=778437294058111016&scope=bot&permissions=281600

*/

//require('dotenv').config();
const Settings = require('./src/fetchSettings.js');
const Bot = require('./src/discord.js');

var express = require('express');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the home page route
app.get('/', function(req, res) {

        //initialize discord bot's events
        Bot.start();

        //return an answer just to make it visible on the front end.
        res.statusCode = 200
        res.json({
            status: '200',
            message: 'Discord bot is online!',
            host: process.env.URL,
            local: process.env.LOCAL
        })

});

app.listen(port, function() {
    console.log('Our app is running on: ' + process.env.URL );
});


