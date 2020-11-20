/**
 * @module Main
 * @description Entry point of the script.
 * Attempts to initialize file main.js on every folder.
 */


const path = require('path');
const fs = require('fs');
const { POINT_CONVERSION_COMPRESSED } = require('constants');

const customPath = '..';

let files;

function init() {
    //joining path of directory 
    const directoryPath = path.join(__dirname, "..");

    //get all files in directory
    files = fs.readdirSync(directoryPath);

    files.forEach((file)=>{
        
        if (fs.existsSync(path.join(__dirname, '..', file, 'main.js'))){
            
            //exists module/main.js
            //require module
            (async () =>{
                require(path.join('..',file,'main.js'));
            })()
            
        }

    })
    
}

init();

