// <!-- https://stackoverflow.com/questions/36788831/authenticating-socket-io-connections-using-jwt?rq=1 -->
// <!-- https://outline.com/8YRARh -->

require('dotenv').config();


const express = require("express");
var app = require('express')();
var ws = require('express-ws')(app);
const path = require("path");

(async () => {

  // App setup
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`HTTP server is online! Listening on: ${process.env.URL.replace(/:\d+/g,"")}:${PORT}`));


  // Static files
  app.use(express.static(path.join(__dirname,"public")));

  //
  // app.get('/', (req, res) => {
  //   console.error('express connection');
  //   res.sendFile(path.join(__dirname, 'public', 'ws.html'));
  // });

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


  app.ws('/', (s, req) => {
    console.error('websocket connection');
    for (var t = 0; t < 3; t++)
      setTimeout(() => s.send('message from server', ()=>{}), 1000*t);
  });

})()


require("./keep-awake.js")




