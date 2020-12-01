require('dotenv').config();
const fetch = require('node-fetch');
var moment = require('moment-timezone');

module.exports = {
  getHeartRate: async (params) => {
    const response = await fetch(`${process.env.URL.replace(/\/$/g, '')}/heartrate`);
    const data = JSON.parse(await response.text());

    //console.log(data);

    // average heartbeat over last n_avg entries / last 5 minutes to make it smoother and more accurate.
    let bpm_avg = 0;
    let n_avg = 3;

    if (data.length > n_avg) {

      for (let i = 0; i < n_avg; i++) {
        bpm_avg += data[n_avg].f
      }

      bpm_avg = bpm_avg / n_avg;

    }

    let timestamp = moment(data[0].T);
    let format = ' `YYYY-MM-DD hh:mma (z)`'; // [[]Z[]]
    let msg = `Last seen alive:
  ${timestamp.tz('Europe/Lisbon').format(format)}
  ${timestamp.tz('America/New_York').format(format)}
  ${timestamp.tz('America/Los_Angeles').format(format)}
  ${timestamp.tz('Israel').format(format)}
  ${timestamp.tz('Australia/Sydney').format(format)}

:heartbeat: **${data[0].f}** _bpm_`;

    //console.log(msg);

    return msg;

  }
}

//console.log( module.exports.getHeartRate());
