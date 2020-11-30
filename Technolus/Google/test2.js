// Load client secrets from a local file.
const credentials = await JSON.parse(fs.readFileSync("cred.json"));

// Get authorization using your credentials.
authorize(credentials, listUsers);


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oauth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  return getNewToken(oauth2Client, callback);
}

/**
 * Get new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oauth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oauth2Client.credentials = token;
      callback(oauth2Client);
    });
  });
}


/**
 * Lists users in the domain.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listUsers(auth) {
  const service = google.admin({version: 'directory_v1', auth});
  const {data} = await service.users.list({
    customer: 'my_customer'
    });
}
