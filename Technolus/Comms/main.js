// // https://www.loginradius.com/blog/async/google-authentication-with-nodejs-and-passportjs/
// <!-- https://stackoverflow.com/questions/36788831/authenticating-socket-io-connections-using-jwt?rq=1 -->
// <!-- https://outline.com/8YRARh -->

// https://www.tutorialspoint.com/expressjs/expressjs_cookies.htm
// https://www.tutorialspoint.com/expressjs/expressjs_sessions.htm

//http://www.passportjs.org/docs/google/

require('dotenv').config();


const express = require('express');
var app = express();
const cors = require('cors')
var ws = require('express-ws')(app);
const session = require('express-session');
var cookieSession = require('cookie-session')
var cookieParser = require('cookie-parser');
const path = require('path');

(async () => {

  /*  EXPRESS */

  app.use(cors({ 
    origin: process.env.URL,
    credentials: true
}));

  // Static files
  app.use(express.static(path.join(__dirname,'Public')));
  // app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'Public', 'ws.html')));

  // ping page route (ping was averaging 133ms)
  app.get('/ping', function(req, res) {
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

  // App setup
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`HTTP server is online! Listening on: ${process.env.URL.replace(/:\d+/g,"")}:${PORT}`));




  /*  PASSPORT SETUP  */
  
  const passport = require('passport');
  let userProfile = null;
  let userCreds = null;


  userCreds = {
    accessToken: 'ya29.a0AfH6SMAhpiUPi5e1sU3n6UPWi3GPz_k0itSdyz9PxDW5TK6OT0GI-2xcGiBKwT9mwiKyClrOA5Nf6LpsDnav8cJESVpz38Cii1GcF3u6L5bwfqFbKOg_gYVIIuwTWyDBxiRTq3yzRZpSLOIFr6B9p1_uxQ_D5kpB4J3RumAkluA',
    refreshToken: '1//03KycQF-C1u4HCgYIARAAGAMSNwF-L9IrM9NQYHfdZbgIPNTpaVqrLO2YXQZQPySnEoHxFTWEr6DwtJ4AAHuJ8pINTEXAEUjx2Mw'
  }

  userProfile = {
    "id": "104997637878661972510",
    "displayName": "Technolus",
    "name": {
      "givenName": "Technolus"
    },
    "emails": [
      {
        "value": "joaoramos540@gmail.com",
        "verified": true
      }
    ],
    "photos": [
      {
        "value": "https://lh3.googleusercontent.com/a-/AOh14GjThQUya9n16Wa0-89d0crtnvHSnB10_pewUfg-Lg=s96-c"
      }
    ],
    "provider": "google",
    "_raw": "{\n  \"sub\": \"104997637878661972510\",\n  \"name\": \"Technolus\",\n  \"given_name\": \"Technolus\",\n  \"picture\": \"https://lh3.googleusercontent.com/a-/AOh14GjThQUya9n16Wa0-89d0crtnvHSnB10_pewUfg-Lg\\u003ds96-c\",\n  \"email\": \"joaoramos540@gmail.com\",\n  \"email_verified\": true,\n  \"locale\": \"en\"\n}",
    "_json": {
      "sub": "104997637878661972510",
      "name": "Technolus",
      "given_name": "Technolus",
      "picture": "https://lh3.googleusercontent.com/a-/AOh14GjThQUya9n16Wa0-89d0crtnvHSnB10_pewUfg-Lg=s96-c",
      "email": "joaoramos540@gmail.com",
      "email_verified": true,
      "locale": "en"
    }
  }

  // app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}))
  // app.use(bodyParser.json({limit: '50mb'}))

  app.use(passport.initialize());
  app.use(passport.session());
  
  app.set('view engine', 'ejs');

  app.use(cookieParser());
  // let sess = {
  //   secret: 'keyboard catniss',
  //   resave: false,
  //   saveUninitialized: true,
  //   cookie: { 
  //     secure: process.env.NODE_ENV == "production" ? true : false ,
  //     maxAge: 1000 * 60 * 60 * 24 * 7
  //    }
  // };
  
  // if (process.env.NODE_ENV == 'production') {
  //   app.set('trust proxy', 1) // trust first proxy
  //   sess.cookie.secure = true // serve secure cookies
  // }
  // app.use(session(sess))

  // app.use(cookieSession({
  //   name: 'session',
  //   keys: ['keyboard catniss'],
  //   secure: process.env.NODE_ENV == "production" ? true : false,
  //   maxAge: 24 * 60 * 60 * 1000 // 24 hours
  // }))

  //custom middleware
  // app.use(function(req,res,next){

  //   res.locals.user = req.user || null;
  //   if(req.session.views){
  //     req.session.views += 1
  //     req.session.save();
  //   }else{
  //     req.session.views = 1
  //     req.session.save();
  //   }
  //   console.log('req.session.views', req.session.views)
  //   next();
  // })


  app.set('views', path.join(__dirname, 'views'));

  app.get('/login', (req, res) =>{

    console.log(req.cookies);
    //console.log(userProfile);

    if (!userProfile) {
      //restoreSession(req);
    }
    if (!userProfile) {
      res.render('pages/auth')
    }else{
      res.redirect('/success')
    }
  });


  app.get('/logout', function(req, res){
    userProfile  = null;
    userCreds  = null;
    res.clearCookie('session');
    req.logout();
    
    res.status(401).redirect('/');

  });
  
  app.get('/success', (req, res) => {
    if (!userProfile) {
      res.redirect('/login')
    }else{
      res.cookie('session', '1', {maxAge: 360000}).render('pages/success', {user: userProfile});//, creds: userCreds});  // {expire: 360000 + Date.now()}); 
    }
  });
  
  app.get('/heartrate', async (req, res) => {
    if (!userProfile) {
      res.redirect('/login')
    }else{
      // Successful authentication, get data.
      await passportAutentication(userCreds);
      //passport.authenticate('google', { failureRedirect: '/error' }); //redirect to login instead '/login' }),
      res.send( await getHeartRate(req.query.window, req.query.points) );
    }
  });
  
  
  app.get('/steps', async (req, res) => {
    if (!userProfile) {
      res.redirect('/login')
    }else{
      // Successful authentication, get data.
      await passportAutentication(userCreds);
      //passport.authenticate('google', { failureRedirect: '/error' }); //redirect to login instead '/login' }),
      res.send( await getStepCount(req.query.window, req.query.points) );
    }
  });

  app.get('/graph_hr', async (req, res) => {
    if (!userProfile) {
      res.redirect('/login')
    }else{
      // Successful authentication, get data.
      await passportAutentication(userCreds);
      res.render('pages/graph_bio', {user: userProfile });
    }
  });
  app.get('/biometrics', async (req, res) => {
    if (!userProfile) {
      res.redirect('/login')
    }else{
      // Successful authentication, get data.
      await passportAutentication(userCreds);
      res.render('pages/graph_bio', {user: userProfile });
    }
  });

  // function restoreSession(req){
  //   userProfile = req.cookies.userProfile;
  //   userCreds = req.cookies.userCreds;
  //   console.log(userCreds);
  // }
  // function saveSession(req){
  //   req.cookies.userProfile = userProfile;
  //   req.cookies.userCreds = userCreds;
  //   console.log(userCreds);
  // }

  app.get('/data', (req, res) => res.send(userProfile));
  app.get('/token', (req, res) => res.send(userCreds));
  app.get('/error', (req, res) => res.send("error logging in"));
  
  passport.serializeUser( (user, cb) => cb(null, user) );
  passport.deserializeUser((obj, cb) => cb(null, obj) );
  
  
  /*  Google AUTH  */

  const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_OAUTH_REDIRECT,

  },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      userCreds = {
        accessToken: accessToken,
        refreshToken: refreshToken,
      }
      return done(null, userProfile);
    }
  )); 
  
  app.get('/auth/google',
    passport.authenticate('google', {
      accessType: 'offline',
      scope: [
        'profile',
        'email',
        'https://www.googleapis.com/auth/drive', //
        'https://www.googleapis.com/auth/spreadsheets', //
        'https://www.googleapis.com/auth/youtube', //
        'https://mail.google.com/',
        'https://www.googleapis.com/auth/androidmanagement',
        'https://mail.google.com/',
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/cloud-billing',
        'https://www.googleapis.com/auth/pubsub',
        'https://www.googleapis.com/auth/cloud-platform',
        'https://www.googleapis.com/auth/analytics',
        'openid',
        'https://www.googleapis.com/auth/webmasters',
        'https://www.googleapis.com/auth/contacts',
        'https://www.googleapis.com/auth/tasks',
        'https://www.googleapis.com/auth/yt-analytics-monetary.readonly',

        'https://www.googleapis.com/auth/fitness.activity.write',
        'https://www.googleapis.com/auth/fitness.body.read',
        'https://www.googleapis.com/auth/fitness.blood_pressure.write', //
        // 'https://www.googleapis.com/auth/fitness.body.write', //
        // 'https://www.googleapis.com/auth/fitness.body_temperature.write', //
        // 'https://www.googleapis.com/auth/fitness.heart_rate.write',
        'https://www.googleapis.com/auth/fitness.location.write', //
        'https://www.googleapis.com/auth/fitness.nutrition.write', //
        'https://www.googleapis.com/auth/fitness.sleep.write',      //
      ]
    }));
  
  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    function (req, res) {
      // Successful authentication, redirect success.
      res.redirect('/success');
  });
  

  ///////////////////////////////////////////////////////////////////////////////////////
  //https://developers.google.com/fit/rest/v1/reference/users/dataSources/datasets/get
  //https://github.com/googleapis/google-api-nodejs-client/blob/master/samples/
  //https://developers.google.com/oauthplayground/
  //https://developers.google.com/fit/scenarios/read-sleep-data#rest
  //https://developers.google.com/fit/datatypes#authorization_scopes
  
  const {google} = require('googleapis');
  const fs = require('fs');


  async function refreshGoogleToken(refreshToken){ /*if needed */
    // let tokenDetails = await fetch("https://accounts.google.com/o/oauth2/token", {
    //   "method": "POST",
    //   "body": JSON.stringify({
    //       "client_id": process.env.GOOGLE_OAUTH_CLIENT_ID,
    //       "client_secret": process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    //       "refresh_token": refreshToken,
    //       "grant_type": "refresh_token",
    //   })
    // });
    // tokenDetails = await tokenDetails.json();
    // console.log("tokenDetails");
    // console.log(JSON.stringify(tokenDetails,null,2));  // => Complete Response
    // const accessToken = tokenDetails.access_token;  // => Store access token
  }

  
  async function passportAutentication(userCreds){
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      process.env.GOOGLE_OAUTH_REDIRECT
    );
    
    oauth2Client.credentials = {
      "access_token": userCreds.accessToken,
      "refresh_token": userCreds.refreshToken,
    };

    google.options({auth: oauth2Client});

    return oauth2Client;
  }


  //dataSourceId: 'raw:com.google.step_count.delta:com.xiaomi.hm.health:',
  async function getHeartRate(deltaHours, points) {//(client)
    // retrieve user profile
    
    deltaHours = deltaHours || 4;
    let deltaMinutes = deltaHours*60;
    let latestNanoSecond = (new Date()).getTime()*1000000;
    let earliestNanoSecond = (new Date()).getTime()*1000000 - deltaMinutes*60*1000000000;
    
    const fitness = google.fitness('v1');
    const res = await fitness.users.dataSources.datasets.get({
      'userId': 'me',
      //'dataSourceId': 'raw:com.google.heart_rate.bpm:com.xiaomi.hm.health:',
      'dataSourceId': 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm',
      //'dataSourceId': 'derived:com.google.heart_minutes:com.google.android.gms:merge_heart_minutes',
      //'dataSourceId': 'derived:com.google.heart_rate.bpm:com.google.android.gms:resting_heart_rate',
      'datasetId': `${earliestNanoSecond}-${latestNanoSecond}`, //'1606619100000000000-1606812543784000000',
      'limit': points || 99999,
    });

    datapoints = [];
    res.data.point.forEach(dp => {
      datapoints.push({
        'T': new Date(dp.startTimeNanos/1000000),
        //'t': new Date(dp.startTimeNanos/1000000).toLocaleString(),
        'f': dp.value[0].fpVal
      });
    });

    datapoints.sort(function(a,b){
      //return new Date(b.t) - new Date(a.t);
      return b.T - a.T;
    });

    return datapoints;
    //return res.data;

  }
  async function getStepCount(deltaHours, points) {
      // retrieve user profile
      
      deltaHours = deltaHours || 4;
      let deltaMinutes = deltaHours*60;
      let latestNanoSecond = (new Date()).getTime()*1000000;
      let earliestNanoSecond = (new Date()).getTime()*1000000 - deltaMinutes*60*1000000000;
      
      const fitness = google.fitness('v1');
      const res = await fitness.users.dataSources.datasets.get({
      'userId': 'me',
      dataSourceId: 'raw:com.google.step_count.delta:com.xiaomi.hm.health:',
      dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps',
      'datasetId': `${earliestNanoSecond}-${latestNanoSecond}`, //'1606619100000000000-1606812543784000000',
      'limit': points || 99999,
    });

    datapoints = [];
    res.data.point.forEach(dp => {
      datapoints.push({
        'T': new Date(dp.startTimeNanos/1000000),
        'T2': new Date(dp.endTimeNanos/1000000),
        //'t': new Date(dp.startTimeNanos/1000000).toLocaleString(),
        'f': dp.value[0].intVal
      });
    });

    datapoints.sort(function(a,b){
      //return new Date(b.t) - new Date(a.t);
      return b.T - a.T;
    });

    return datapoints;
    //return res.data;

  }
  //////////////////////////////////////////////////////////////////////////////////////


  /*  HEROKU KEEP AWAKE (ping) */
  require("./keep-awake.js")

})()




