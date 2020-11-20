// const EventEmitter = require('events');

// module.exports = new EventEmitter();

// // Do some work, and after some time emit
// // the 'ready' event from the module itself.
// setTimeout(() => {
//   module.exports.emit('ready');
// }, 1000);


// //Then in another file we could do:
// const a = require('./main.js');
// a.on('ready', () => {
//   console.log('module "a" is ready');
// });