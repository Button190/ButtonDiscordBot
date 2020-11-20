//const http = require('http');
//const https = require('https');

// npm install follow-redirects
const http = require('follow-redirects').http;
const url = require('url');

export function httpGet(address) {

    return new Promise((resolve, reject) => {
        const link = url.parse(address);
        const data = '';
        const options = {
          host: link.hostname, //if amazon: 'ec2-18-191-89-162.us-east-2.compute.amazonaws.com',
          path: link.path,
          port: link.port, //if amazon: 8000
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36',
            //'Content-Type': 'application/json',
            'Content-Length': data.length
          }
        };

        const req = http.request(options, (res) => {
          //resolve('Success');

          res.setEncoding('utf8');
          let body = '';
          res.on('data', function (chunk) {
            body += chunk;
          } );
          //res.on('end', () => resolve(res.statusCode+' ('+http.STATUS_CODES[res.statusCode]+')'+' ---> '+ body));
          res.on('end', () => resolve(body));
        });

        req.on('error', (e) => {
          reject('error: '+ e.message);
        });
        // send the request
        req.write(data);
        req.end();

      });
  }