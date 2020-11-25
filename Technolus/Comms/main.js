// <!-- https://stackoverflow.com/questions/36788831/authenticating-socket-io-connections-using-jwt?rq=1 -->
// <!-- https://outline.com/8YRARh -->
// const express = require("express");
// const socket = require("socket.io");
// const path = require("path");


var path = require('path');
var app = require('express')();
var ws = require('express-ws')(app);
app.get('/', (req, res) => {
  console.error('express connection');
  res.sendFile(path.join(__dirname, 'ws.html'));
});
app.ws('/', (s, req) => {
  console.error('websocket connection');
  for (var t = 0; t < 3; t++)
    setTimeout(() => s.send('message from server', ()=>{}), 1000*t);
});
app.listen(3001, () => console.error('listening on http://localhost:3001/'));
console.error('websocket example');