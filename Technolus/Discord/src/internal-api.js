// @ts-nocheck
require('dotenv').config();
const fetch = require('node-fetch');
var moment = require('moment-timezone');

module.exports = {
  getHeartRate: async (params) => {
    // average heartbeat over last n_avg entries / last 5 minutes to make it smoother and more accurate.
    let bpm_avg = 0;
    let n_avg = 3;

    const response = await fetch(`${process.env.URL.replace(/\/$/g, '')}/heartrate?points=${n_avg+1}`);
    const data = JSON.parse(await response.text());

    //console.log(data);


    if (data.length > n_avg) {

      for (let i = 0; i < n_avg; i++) {
        bpm_avg += data[i].f;
        //console.log(data[i].f);
      }

      bpm_avg = Math.round(bpm_avg / n_avg);

    }

    let timestamp = moment(data[0].T);
    let format = ' `YYYY-MM-DD hh:mma (z)`'; // [[]Z[]]
    let msg = `Last seen alive:
  ${timestamp.tz('Europe/Lisbon').format(format)}
  ${timestamp.tz('America/New_York').format(format)}
  ${timestamp.tz('America/Los_Angeles').format(format)}
  ${timestamp.tz('Israel').format(format)}
  ${timestamp.tz('Australia/Sydney').format(format)}

:heartbeat: **${bpm_avg}** _bpm_`;//data[0].f

    //console.log(msg);

    return msg;

  }
}

//console.log( module.exports.getHeartRate());
