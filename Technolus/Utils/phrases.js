const fs = require('fs');
const path = require('path');

module.exports={

  getRandomPhrase: (phrasesFilePath) => {
    var data = fs.readFileSync(phrasesFilePath,'utf8'); // read file
    var cleanData = data.replace(/^(?:[\t ]*(?:\r?\n|\r))+/gm, '').replace(/\n$/, ''); //no blank lines
    var lines = cleanData.split('\n'); // split by end of line
    return lines[Math.floor(Math.random()*lines.length)].replace(/\\n/g,"\n"); // random from splitted lines
  }

}

//console.log( module.exports.getRandomPhrase("./content/phrases.md"));