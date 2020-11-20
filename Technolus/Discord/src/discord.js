// https://www.youtube.com/watch?v=OQsUnFDT7iE
const {Client} = require('discord.js');
const Tenor = require('./tenor.js');
const Phrases = require('./phrases.js');
const Settings = require('./fetchSettings.js');
const Custom = require('./custom.js');

var botInitialized;

const token = process.env.TOKEN

module.exports = { 
    start : async () => {
        if (!botInitialized) {

            botInitialized = true;

            
            //const token = process.env.DISCORD_BOT_TOKEN;
            const client = new Client();

            client.on('ready', () => {
                
                console.log('This bot is online!');
            })

            client.on('message', async msg => {

                const channel = client.channels.cache.find(channel => channel.name === msg.channel.name);

                if (msg.author.bot) { return; }
                
                if (channel.name === "random") {

                    const TenorSearchTerm = Phrases.getRandomPhrase("./settings/tenor-search-terms")

                    const images = await Tenor.getTenorImages(TenorSearchTerm);
                    let randomIndex = Math.floor(Math.random() * images.length); 
                    const randomImage = images[randomIndex];
                    //console.log(randomImage);
                    msg.channel.send(randomImage);

                } else if (/^;/.test(msg.content)) { // anything else preceeded by a semicolon
                    
                    
                    if (Custom.test(msg.content)) { // check if there is a custom entry
                        var reply = Custom.run(msg.content)
                        if (reply != ""){ msg.channel.send(reply); }
                    
                    }else{ // anything else, just post a random tenor image based on the msg content
                        const images = await Tenor.getTenorImages(msg.content.replace(/^./,''));
                        let randomIndex = Math.floor(Math.random() * images.length); 
                        const randomImage = images[randomIndex];
                        //console.log(randomImage);
                        msg.channel.send(randomImage);
                    }

                }
            })

            client.login(token);


        }

    }

}
