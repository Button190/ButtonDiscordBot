// const { google } = require('googleapis');

// const auth = new google.auth.GoogleAuth({
//   keyFile: '../../GoogleCredentials.json',
//   scopes: [
//     'https://www.googleapis.com/auth/userinfo.email'
    
//     'https://www.googleapis.com/auth/drive',
//     'https://www.googleapis.com/auth/spreadsheets',
    
//     'https://www.googleapis.com/auth/cloud-platform',
    
//     'https://www.googleapis.com/auth/fitness.activity.write',
//     'https://www.googleapis.com/auth/fitness.blood_glucose.write',
//     'https://www.googleapis.com/auth/fitness.blood_pressure.write',
//     'https://www.googleapis.com/auth/fitness.body.write',
//     'https://www.googleapis.com/auth/fitness.body_temperature.write',
//     'https://www.googleapis.com/auth/fitness.heart_rate.write',
//     'https://www.googleapis.com/auth/fitness.location.write',
//     'https://www.googleapis.com/auth/fitness.nutrition.write',
//     'https://www.googleapis.com/auth/fitness.oxygen_saturation.write',
//     'https://www.googleapis.com/auth/fitness.reproductive_health.write',
//     'https://www.googleapis.com/auth/fitness.sleep.write',


//   ],
// });



// const fs = require('fs');

// const drive = google.drive({
//   version: 'v3',
//   auth: oauth2Client
// });

// async function main() {
//   const res = await drive.files.create({
//     requestBody: {
//       name: 'myimage.png',
//       mimeType: 'image/png'
//     },
//     media: {
//       mimeType: 'image/png',
//       body: fs.createReadStream('image.png')
//     }
//   });
//   console.log(res.data);
// }

// main().catch(console.error);