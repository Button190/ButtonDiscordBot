const fs = require('fs');

module.exports={

  get: (filePath) => {
    var data = fs.readFileSync(filePath,'utf8'); // read file
    var cleanData = data.replace(/^(?:[\t ]*(?:\r?\n|\r))+/gm, '').replace(/\n$/, ''); //no blank lines
    return cleanData; // random from splitted lines
  }

}

//console.log( module.exports.getRandomPhrase("./settings/hostname.md"));