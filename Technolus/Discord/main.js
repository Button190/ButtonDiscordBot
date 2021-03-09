/*
Official documentation:
https://discord.js.org/#/docs/main/stable/

Create bot:
https://discord.com/developers/
https://discordapi.com/permissions.html#281600

// pre built link to add bot to server (with proper permissions to post messages):
https://discord.com/oauth2/authorize?client_id=778437294058111016&scope=bot&permissions=281600

*/

//require('dotenv').config();


const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

const VRChat = require('../VRChat/main.js');
const WolframAlphaAPI = require('../WolframAlphaAPI/main.js');
const Torrents = require('../Torrents/main.js');

const Tenor = require('./src/tenor.js');
const Phrases = require('./src/phrases.js');
const Settings = require('./src/fetchSettings.js');
const Custom = require('./src/custom.js');


var botInitialized;


const token = process.env.DISCORD_BOT_TOKEN;

(async () => {
    if (!botInitialized ) {
        
        botInitialized = true;
        
        
        //const token = process.env.DISCORD_BOT_TOKEN;
        //const client = new Discord.client();
        const client = new Discord.Client();

        client.on('ready', () => {
            console.log('This bot is online!');

            setInterval(() => {

                let myPhrase = Phrases.getRandomPhrase(path.join(__dirname, './settings/status')) + " [;help]";
                let myType = /(.*?):\s*(.*)/.exec(myPhrase)[1];
                let myStatus = /(.*?):\s*(.*)/.exec(myPhrase)[2];

                client.user.setPresence({
                    status: 'online',
                    activity: {
                        name: myStatus,//myStatus,
                        type: myType, //myType,
                        //url: 'https://www.youtube.com/watch?v=5yx6BWlEVcY'
                    }
                })

            }, 30*1000); // Runs this every minute*seconds*miliseconds.


        })



        client.on('message', async msg => {
            //blacklist bot servers
            if (/pokémeow/.test(msg.channel.name)) { return; }
            
            //let channelId = `${msg.guild.id}/${message.channel.id}`;
            //if (channelId = "726654221163954226/726654221163954229")) { return; }

            const channel = client.channels.cache.find(channel => channel.name === msg.channel.name);

            if (msg.author.bot) { return; }

            //if (channelId = "726654221163954226/726654221163954229"){
            //    console.log(msg.author.username);
            //}
            
            if (channel.name === "random") {

                const TenorSearchTerm = Phrases.getRandomPhrase(path.join(__dirname, './settings/tenor-search-terms'));

                const images = await Tenor.getTenorImagesFrontPage(TenorSearchTerm);
                let randomIndex = Math.floor(Math.random() * images.length); 
                const randomImage = images[randomIndex];
                //console.log(randomImage);
                msg.channel.send(randomImage);

            // } else if (/^;=/.test(msg.content)) { // anything else preceeded by a semicolon and an equal sign
            //     let result = evaluate(msg.content.substring(2)); 
            //     msg.channel.send(result);
            
            } else if (/^;[\;\=]/.test(msg.content)) { // anything else preceeded by a semicolon and an equal sign
                msg.channel.send(
                    await WolframAlphaAPI.getShort(
                        msg.content.substring(2)
                    )
                )

            
            //} else if (/^;tor\s+.+/i.test(msg.content) && msg.author.id === '736086531491627080' ) { // anything else preceeded by a semicolon and an equal sign
            } else if ( /^;tor\s+.+/i.test(msg.content) ) { // anything else preceeded by a semicolon and an equal sign
                
                const torSearchTerm = /^;tor\s+(.+)/.exec(msg.content)[1];
                const torResult = await Torrents.getTorrent( torSearchTerm );
                //console.log(torResult);
                let ressentMessage;
                if (torResult === []){
                    ressentMessage = msg.channel.send(`No results were found for: ${torSearchTerm}`);
                }else{
                    ressentMessage = msg.channel.send( `Title: **_${torResult[0].title}_**\nTorrent:\n${torResult[0].magnet}`);
                }
                sentMessage.then(sentMessage => {
                    sentMessage.delete({ timeout: 2*60*1000 });
                });

            } else if (/^;tor_\s+.+/i.test(msg.content) && msg.author.id === '736086531491627080' ) { // anything else preceeded by a semicolon and an equal sign
                
                const torSearchTerm = /^;tor_\s+(.+)/.exec(msg.content)[1];
                const torResult = await Torrents.getTorrent( torSearchTerm );
                //console.log(torResult);
                let ressentMessage;
                if (torResult === []){
                    ressentMessage = msg.channel.send(`No results were found for: ${torSearchTerm}`);
                }else{
                    sentMessage = msg.channel.send( `Title: **_${torResult[0].title}_**\nDownload:\nhttp://192.168.1.69:3333/?route=shell&data=python3%20torrent%2Ftorrent_add.py%20-p%208888%20-a%20localhost%20-s%20%22%2Fhome%2Fpi%2FDesktop%2FNicas%2F%2B%2BSeries%2F%22%20-m%20${torResult[0].magnet}`);
                }
                sentMessage.then(sentMessage => {
                    sentMessage.delete({ timeout: 30*1000 });
                });

            } else if (/^;ani\s+.+/i.test(msg.content) && msg.author.id === '736086531491627080' ) { // anything else preceeded by a semicolon and an equal sign
                
                const torSearchTerm = /^;ani\s+(.+)/.exec(msg.content)[1];
                const torResult = await Torrents.getAnimeTorrent( torSearchTerm );
                //console.log(torResult);
                
                let ressentMessage;
                if (torResult === []){
                    sentMessage = msg.channel.send(`No results were found for: ${torSearchTerm}`);
                }else{
                    sentMessage = msg.channel.send( `Title: **_${torResult[0].title}_**\nDownload:\nhttp://192.168.1.69:3333/?route=shell&data=python3%20torrent%2Ftorrent_add.py%20-p%208888%20-a%20localhost%20-s%20%22%2Fhome%2Fpi%2FDesktop%2FNicas%2F%2B%2BSeries%2F%22%20-m%20${torResult[0].magnet}`);
                }
                sentMessage.then(sentMessage => {
                    sentMessage.delete({ timeout: 30*1000 });
                });

            } else if (/^;alive\?/i.test(msg.content) ) { // && msg.author.id === '736086531491627080' // anything else preceeded by a semicolon and an equal sign
                msg.channel.send( await require('./src/internal-api').getHeartRate() );

            } else if (/^;embed/i.test(msg.content) ) { // && msg.author.id === '736086531491627080' // anything else preceeded by a semicolon and an equal sign
                
                // inside a command, event listener, etc.
                const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Here is an embed for you!')
                    .setURL('https://discord.js.org/')
                    .setAuthor('Technolus', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
                    .setDescription('We are Technolus')
                    .setThumbnail('https://i.imgur.com/wSTFkRM.png')
                    .addFields(
                        { name: 'Regular field title', value: 'Some value here' },
                        { name: '\u200B', value: '\u200B' },
                        { name: 'Inline field title', value: 'Some value here', inline: true },
                        { name: 'Inline field title', value: 'Some value here', inline: true },
                    )
                    .addField('Inline field title', 'Some value here', true)
                    .setImage('https://i.imgur.com/wSTFkRM.png')
                    .setTimestamp()
                    .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

                //await require('./src/internal-api').getHeartRate()
                msg.channel.send(embed);
                
            } else if (/^;(remind|reminder|rem|remind me)\s*\d+\s*\S+/.test(msg.content)) { // anything else preceeded by a semicolon and rem
                //;rem [number] [years/months/days/hours/minutes/seconds])
                let msgContent = "" ;
                const parts = /^;(remind|reminder|rem|remind me)\s*(\d+)\s*(\S+)/.exec(msg.content);
                const number = parts[2]; //[number]
                const multiplier = parts[3]; //[years/months/days/hours/minutes/seconds]
                
                let timeoutSeconds = 0;
                let invalid = false;

                //console.log(number);
                //console.log(multiplier);

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
                    msg.reply(`Can't remember that. Try ;remind me 5 minutes or ;remind 5m or even ;rem5m`)
                    }else{
                    //msg.reply(`Ok, I'll remember that. Unless I forget.`)
                    //console.log(timeoutSeconds*1000);
                    setTimeout( function () {
                            msg.reply(`Reminder [${msg.content}]:\n${msg.url}`);
                        }, timeoutSeconds*1000 );
                    
                    }

            //} else if (/^;pin[0-9]*$/.test(msg.content)) { // anything else preceeded by a semicolon and pin
            //    TODO: save a messages link to the database and retrieve it later
            //    (what if more than one pin???)

            } else if (/^;vrc\s*.*$/.test(msg.content) && msg.author.id === '736086531491627080' ) { // anything else preceeded by a semicolon and pin                
                const VRChatUserData =  await VRChat.getUser(msg.content.replace(/^;vrc\s*/,''));
                const strVRChatUserData=JSON.stringify(VRChatUserData,null,2);
                msg.channel.send(strVRChatUserData.replace(/^{/,"").replace(/}$/,""));

            } else if (/^;/.test(msg.content)) { // anything else preceeded by a semicolon
                
                if (Custom.test(msg.content)) { // check if there is a custom entry
                    var reply = Custom.run(msg.content)
                    if (reply != ""){ msg.channel.send(reply); }
                    
                }else{ // anything else, just post a random tenor image based on the msg content
                    let images = await Tenor.getTenorImages(msg.content.replace(/^./,''));
                    if (!images.length){
                        images = await Tenor.getTenorImagesFrontPage(msg.content.replace(/^./,''));
                    }
                    let randomIndex = Math.floor(Math.random() * images.length); 
                    const randomImage = images[randomIndex];
                    //console.log(randomImage);
                    msg.channel.send(randomImage);
                }

            }
        })

        client.login(token);


    }

})()


//start();
