require('dotenv').config();


//ping heroku to keep awake
const request = require('request');
const ping = () => request( process.env.URL + "/ping" , (error, response, body) => {
    if (error) console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print body of response received
});
setInterval(ping, 20*60*1000); // I have set to 20 mins interval
setTimeout(ping, 2*1000); // ping it after a couple seconds to avoid a trip to the browser.