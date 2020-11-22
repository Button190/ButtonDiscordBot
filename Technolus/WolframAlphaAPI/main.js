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
            "hmm, sorry I didn't understand.",
        ];
        return data
            .replace("Wolfram|Alpha did not understand your input", quirkyResponses[Math.floor(Math.random()*quirkyResponses.length)])
            .replace("My name is Wolfram Alpha", "Our name is Technolus")
            .replace("I am a computational knowledge engine", "We are Technolus")
            .replace("I was created by Stephen Wolfram and his team", "Technolus built Technolus")
            .replace("I am doing computation for the world", "I am doing computation for Technolus");
    }
}

// const test = async ()=>console.log(await module.exports.getShort("who are you"));
// test();