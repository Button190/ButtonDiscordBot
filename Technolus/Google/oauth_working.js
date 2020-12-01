//https://github.com/googleapis/google-api-nodejs-client/blob/master/samples/

//https://developers.google.com/oauthplayground/


// Copyright 2012 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const opn = require('open');
const destroyer = require('server-destroy');

const {google} = require('googleapis');

/**
 * To use OAuth2 authentication, we need access to a a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI.  To get these credentials for your application, visit https://console.cloud.google.com/apis/credentials.
 */

// const TOKEN_PATH = '../../google.token.json';
// const CREDS_PATH = '../../google.credentials.json';
// //const keyPath = path.join(__dirname, 'oauth2.keys.json');
// const keyPath = path.join(__dirname, CREDS_PATH);
// console.log(keyPath);
// let keys = {redirect_uris: ['']};
// if (fs.existsSync(keyPath)) {
//   keys = require(keyPath).web;
// }
let keys = {
  'client_id':process.env.GOOGLE_OAUTH_CLIENT_ID,
  'client_secret':process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  'redirect_uris':[process.env.GOOGLE_OAUTH_REDIRECT]
};

/**
 * Create a new OAuth2 client with the configured keys.
 */
const oauth2Client = new google.auth.OAuth2(
  keys.client_id,
  keys.client_secret,
  keys.redirect_uris[0]
);

/**
 * This is one of the many ways you can configure googleapis to use authentication credentials.  In this method, we're setting a global reference for all APIs.  Any other API you use here, like google.drive('v3'), will now use this auth client. You can also override the auth client at the service and method call levels.
 */
google.options({auth: oauth2Client});

/**
 * Open an http server to accept the oauth callback. In this simple example, the only request to our webserver is to /callback?code=<code>
 */
async function authenticate(scopes) {
  return new Promise((resolve, reject) => {
    // grab the url that will be used for authorization
    const authorizeUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes.join(' '),
    });
    const server = http
      .createServer(async (req, res) => {
        try {
          if (req.url.indexOf('/auth/google/callback') > -1) {
            const qs = new url.URL(req.url, keys.redirect_uris[0]) // 'http://localhost:8080/oauth2callback' // 'http://localhost:8080/auth/google/callback'
              .searchParams;
            res.end('Authentication successful! Please return to the console.');
            server.destroy();
            console.log(qs.get('code'));
            console.log(await oauth2Client.getToken(qs.get('code')) );
            const {tokens} = await oauth2Client.getToken(qs.get('code'));
            console.log(tokens);
            oauth2Client.credentials = tokens; // eslint-disable-line require-atomic-updates
            resolve(oauth2Client);
          }
        } catch (e) {
          reject(e);
        }
      })
      .listen(8080, () => {
        // open the browser to the authorize url to start the workflow
        opn(authorizeUrl, {wait: false}).then(cp => cp.unref());
        
      });
    
    destroyer(server);
  });
}

function refreshGoogleToken(refreshToken){
  // let tokenDetails = await fetch("https://accounts.google.com/o/oauth2/token", {
  //   "method": "POST",
  //   "body": JSON.stringify({
  //       "client_id": process.env.GOOGLE_OAUTH_CLIENT_ID,
  //       "client_secret": process.env.GOOGLE_OAUTH_CLIENT_ID,
  //       "refresh_token": refreshToken,
  //       "grant_type": "refresh_token",
  //   })
  // });
  // tokenDetails = await tokenDetails.json();
  // console.log("tokenDetails");
  // console.log(JSON.stringify(tokenDetails,null,2));  // => Complete Response
  // const accessToken = tokenDetails.access_token;  // => Store access token
}

// async function runSample() {
//   // retrieve user profile
//   const plus = google.plus('v1');
//   const res = await plus.people.get({userId: 'me'});
//   console.log(res.data);
// }


async function runSample() {

}


async function runActual(client) {
  // retrieve user profile
  const fitness = google.fitness('v1');
  //const res = await fitness.users.dataSources.list({userId: 'me'});
  //const res = await fitness.users.dataSources.get({userId: 'me', dataSourceId: 'raw:com.google.heart_rate.bpm:com.xiaomi.hm.health:'});
  const res = await fitness.users.dataSources.dataPointChanges.list({
    userId: 'me', dataSourceId: 'raw:com.google.heart_rate.bpm:com.xiaomi.hm.health:'
  });
  // const res = await fitness.users.dataSources.dataPointChanges.list({
  //   userId: 'me', dataSourceId: 'raw:com.google.heart_rate.bpm:com.xiaomi.hm.health:'
  // }).datasets();
  
  fs.writeFile('heartrate.json', JSON.stringify(res.data), function (err) {
    if (err) return console.log(err);
  });
  fs.writeFile('client.json', JSON.stringify(client), function (err) {
    if (err) return console.log(err);
  });
  //console.log(res.data);
}

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  // 'https://www.googleapis.com/auth/plus.me',
  // 'https://www.googleapis.com/auth/admin.directory.user',
  
  // 'https://www.googleapis.com/auth/drive',
  // 'https://www.googleapis.com/auth/spreadsheets',
  
  // 'https://www.googleapis.com/auth/cloud-platform',
  
  'https://www.googleapis.com/auth/fitness.activity.write',
  // 'https://www.googleapis.com/auth/fitness.blood_glucose.write',
  // 'https://www.googleapis.com/auth/fitness.blood_pressure.write',
  // 'https://www.googleapis.com/auth/fitness.body.write',
  // 'https://www.googleapis.com/auth/fitness.body_temperature.write',
  'https://www.googleapis.com/auth/fitness.heart_rate.write',
  // 'https://www.googleapis.com/auth/fitness.location.write',
  // 'https://www.googleapis.com/auth/fitness.nutrition.write',
  // 'https://www.googleapis.com/auth/fitness.oxygen_saturation.write',
  // 'https://www.googleapis.com/auth/fitness.reproductive_health.write',
  // 'https://www.googleapis.com/auth/fitness.sleep.write',
];

authenticate(scopes)
  .then(client => runSample(client))
  .catch(console.error);


  // fs.writeFile('client.json', JSON.stringify(client), function (err) {
  //   if (err) return console.log(err);
  // });