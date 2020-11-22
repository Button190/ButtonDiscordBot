const {Client} = require('discord.js');
const Tenor = require('./tenor.js');
const Phrases = require('./phrases.js');
const Settings = require('./fetchSettings.js');
const Custom = require('./custom.js');

const fs = require('fs');
const path = require('path');

const {evaluate} = require('mathjs');


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

                setInterval(() => {

                    let myPhrase = Phrases.getRandomPhrase(path.join(__dirname, '..' , './settings/status')) + " [;help]";
                    let myStatus = /(.*?):(.*)/.exec(myPhrase)[1];
                    let myType = /(.*?):(.*)/.exec(myPhrase)[2];

                    if (Math.floor(Math.random())){

                        client.user.setPresence({
                            status: 'online',
                            activity: {
                                name: myStatus,
                                type: myPhrase,
                                //url: 'https://www.youtube.com/watch?v=5yx6BWlEVcY'
                            }
                        })

                    }

                }, 30*1000); // Runs this every minute*seconds*miliseconds.


            })



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

                } else if (/^;=/.test(msg.content)) { // anything else preceeded by a semicolon and an equal sign
                    let result = evaluate(msg.content.substring(2)); 
                    msg.channel.send(result);

                } else if (/^;rem\s*\d+\s*\S+/.test(msg.content)) { // anything else preceeded by a semicolon and rem
                    //;rem [number] [years/months/days/hours/minutes/seconds])
                    const parts = /^;rem\s*(\d+)\s*(\S+)/.exec(msg.content);
                    const number = parts[1]; //[number]
                    const multiplier = parts[2]; //[years/months/days/hours/minutes/seconds]
                    
                    let timeoutSeconds = 0;
                    let invalid = false;

                    console.log(number);
                    console.log(multiplier);

                    switch (multiplier.toLowerCase().trim()) {
                        case "seconds":
                        case "second":
                        case "sec":
                        case "s":
                            timeoutSeconds = number;
                            break;

                        case "minutes":
                        case "minute":
                        case "min":
                        case "m":
                            timeoutSeconds = number*60;
                            break;

                        case "hours":
                        case "hour":
                        case "h":
                            timeoutSeconds = number*60*60;
                            break;

                        case "days":
                        case "day":
                        case "d":
                            timeoutSeconds = number*60*60*24;
                            break;

                        case "months":
                        case "month":
                        case "mon":
                            timeoutSeconds = number*60*60*24*30;
                            break;

                        case "years":
                        case "year":
                        case "y":
                            timeoutSeconds = number*60*60*24*365;
                            break;
                        
                        default:
                          invalid = true;
                          break;
                      }

                      if (invalid){
                        msg.reply(`Can't remember that. Try ;rem 5 seconds or ;rem 5s`)
                      }else{
                        console.log(timeoutSeconds*1000);
                        setTimeout( function () {
                                msg.reply(`Reminder [${msg.content}]:\n${msg.url}`);
                            }, timeoutSeconds*1000 );
                        
                      }

                //} else if (/^;pin[0-9]*$/.test(msg.content)) { // anything else preceeded by a semicolon and pin
                //    TODO: save a messages link to the database and retrieve it later
                //    (what if more than one pin???)
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
