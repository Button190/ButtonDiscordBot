require('dotenv').config();
const fetch = require('node-fetch');
var moment = require('moment-timezone');

module.exports = {
    getHeartRate: async (params) => {
        const response = await fetch(`${process.env.URL.replace(/\/$/g,'')}/heartrate`);
        const data = JSON.parse(await response.text());

        //console.log(data);

        let timestamp = moment(data[0].T);

        let format = ' `YYYY-MM-DD hh:mma (z)`'; // [[]Z[]]
        let msg = `Last Seen Alive:
  ${ timestamp.tz('Europe/Lisbon').format(format) }
  ${ timestamp.tz('America/New_York').format(format) }
  ${ timestamp.tz('America/Los_Angeles').format(format) }
  ${ timestamp.tz('Israel').format(format) }
  ${ timestamp.tz('Australia/Sydney').format(format) }

:heartbeat: **${data[0].f}** _bpm_`;

        //console.log(msg);

        return msg;
        
    }
}

//console.log( module.exports.getHeartRate());
