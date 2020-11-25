
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const path = require("path");

// Static files
app.use(require('express').static(path.join(__dirname,"public")));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// set the home page route
app.get('/ping', function(req, res) {

    //return an answer just to make it visible on the front end.
    res.statusCode = 200
    res.json({
        status: '200',
        message: 'pong',
        host: process.env.URL,
        local: process.env.LOCAL
    })

});


io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(8989, () => {
  console.log('listening on *:8989');
});




require("./keep-awake.js")