// const express = require("express");
// const socket = require("socket.io");
// const path = require("path");


// // App setup
// const PORT = process.env.PORT | 8080;
// //const PORT = 8080;
// const app = express();
// var http = require('http').createServer(app);
// // Static files
// app.use(express.static(path.join(__dirname,"public")));

// // set the home page route
// app.get('/ping', function(req, res) {

//     //return an answer just to make it visible on the front end.
//     res.statusCode = 200
//     res.json({
//         status: '200',
//         message: 'pong',
//         host: process.env.URL,
//         local: process.env.LOCAL
//     })

// });

// // const server = app.listen(PORT, function () {
// //     console.log(`http://localhost:${PORT}`);
// // });
// http.listen(3000, () => {
//     console.log('listening on *:3000');
//   });

// // Socket setup
// const io = socket(server);
// //const activeUsers = new Set();

// io.on("connection", function (socket) {
//     console.log("Made socket connection");
    
//     // socket.on("new user", function (data) {
//     //     socket.userId = data;
//     //     activeUsers.add(data);
//     //     io.emit("new user", [...activeUsers]);
//     // });

//     // socket.on("disconnect", () => {
//     //     activeUsers.delete(socket.userId);
//     //     io.emit("user disconnected", socket.userId);
//     // });

//     // socket.on("chat message", function (data) {
//     //     io.emit("chat message", data);
//     // });
    
//     // socket.on("typing", function (data) {
//     //     socket.broadcast.emit("typing", data);
//     // });
// });





// require("./keep-awake.js")