const path = require('path');
const fs = require('fs');
const Phrases = require('./phrases.js');

const customPath = '../custom/';

let files;

function init() {
    //joining path of directory 
    const directoryPath = path.join(__dirname, customPath);

    //get all files in directory
    files = fs.readdirSync(directoryPath);
    //console.log(files)
}
init();


module.exports = {
    test: (expression) => {
        return files.includes(expression.substring(1));
    },
    run: (expression) => {
        return Phrases.getRandomPhrase(customPath.substring(1)+expression.substring(1));
    }
}

//console.log( module.exports.test(";norris"));
//console.log( module.exports.run(";norris"));