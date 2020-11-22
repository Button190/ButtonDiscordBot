require('dotenv').config();
const fetch = require('node-fetch');

module.exports = {
    getShort: async query => {
        let url = `https://api.wolframalpha.com/v1/result?i=${encodeURIComponent(query)}&appid=${process.env.WOLFRAM_APPID}`;
        const response = await fetch(url);
        const data = await response.text();
        return data.replace("Wolfram|Alpha did not understand your input","hmm, maybe you could rephrase that?");
    }
}

// const test = async ()=>console.log(await module.exports.getShort("distance to mars"));
// test();