require('dotenv').config();
const fetch = require('node-fetch');

module.exports = {
    getShort: async query => {
        let url = `https://api.wolframalpha.com/v1/result?i=${encodeURIComponent(query)}&appid=${process.env.WOLFRAM_APPID}`;
        const response = await fetch(url);
        const data = await response.text();

        const quirkyResponses = [
            "hmm, maybe you could rephrase that?",
            "hmm, ok. but not really. what do you mean exactly?",
            "hmm, can you explain that as if I'm a bot?",
        ];
        return data.replace("Wolfram|Alpha did not understand your input", quirkyResponses[Math.floor(Math.random()*quirkyResponses.length)]);
    }
}

// const test = async ()=>console.log(await module.exports.getShort("distance to mars"));
// test();