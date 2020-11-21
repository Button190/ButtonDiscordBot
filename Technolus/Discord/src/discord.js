const {Client} = require('discord.js');
const Tenor = require('./tenor.js');
const Phrases = require('./phrases.js');
const Settings = require('./fetchSettings.js');
const Custom = require('./custom.js');

const fs = require('fs');
const path = require('path');


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


                client.user.setPresence({
                    status: 'online',
                    activity: {
                        name: "0's & 1's | ;help",
                        type: 'WATCHING',
                        //type: 'STREAMING',
                        //url: 'https://www.youtube.com/watch?v=5yx6BWlEVcY'
                    }
                })

                // client.user.setPresence({
                //     status: 'online',
                //     activity: {
                //     }
                // })

            })

            // const activities_list = [ 
            //     "Playing", 
            //     "Watching"
            //     ]; // creates an arraylist containing phrases you want your bot to switch through.
            
            // client.on('ready', () => {
            //     setInterval(() => {
            //         const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
            //         client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
            //     }, 10000); // Runs this every 10 seconds.
            // });



            client.on('message', async msg => {

                
                //blacklist bot servers
                if (/pokémeow/.test(msg.channel.name)) { return; }

                const channel = client.channels.cache.find(channel => channel.name === msg.channel.name);

                if (msg.author.bot) { return; }
                
                if (channel.name === "random") {

                    const TenorSearchTerm = Phrases.getRandomPhrase(path.join(__dirname, '..' , './settings/tenor-search-terms'));

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
