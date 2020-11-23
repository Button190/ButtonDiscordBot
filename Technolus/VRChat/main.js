const fetch = require('node-fetch');

require('dotenv').config();

const vrcAPIkey = process.env.VRC_API_KEY;
const userBasicAuth = process.env.VRC_BASIC_AUTH; //.base64_encode("$username:$password")

module.exports = {
    setAvatar: async (id) => {
        let url = `https://api.vrchat.cloud/api/1/avatars/${id}/select?apiKey=${vrcAPIkey}`; 
        const response = await fetch(url,{
            method: 'put',
            //body:    JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `basic ${userBasicAuth}`,
            },
        });
        const responseText = await response.text();
        let responseJSON =  JSON.parse(responseText);
        return responseJSON;

    },

    getFavorites: async () => {
        let url = `https://api.vrchat.cloud/api/1/favorites/?apiKey=${vrcAPIkey}&type=avatar`; 
        const response = await fetch(url,{
            method: 'get',
            //body:    JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `basic ${userBasicAuth}`,
            },
        });

        const responseText = await response.text();
        let responseJSON =  JSON.parse(responseText);
        return responseJSON;

    },

    getUser: async (username) => {
        //let url = `https://api.vrchat.cloud/api/1/users/usr_e7a2a615-4bc9-426c-8a4e-7836de942da8?apiKey=${vrcAPIkey}`; 
        let url = `https://api.vrchat.cloud/api/1/users/${username}/name?apiKey=${vrcAPIkey}`; 
        const response = await fetch(url,{
            method: 'get',
            //body:    JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `basic ${userBasicAuth}`,
            },
        });

        const responseText = await response.text();
        let responseJSON =  JSON.parse(responseText);
        delete responseJSON.id;
        delete responseJSON.username;
        delete responseJSON.userIcon;
        delete responseJSON.bio;
        delete responseJSON.bioLinks;
        delete responseJSON.currentAvatarImageUrl;
        delete responseJSON.fallbackAvatar;
        delete responseJSON.friendKey;
        delete responseJSON.isFriend; 

        return responseJSON;

    },





    sendFriendRequest: async (id) => {
        let url = `https://api.vrchat.cloud/api/1/user/${id}/notification?apiKey=${vrcAPIkey}`; 
        const response = await fetch(url,{
            method: 'get',
            //body:    JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `basic ${userBasicAuth}`,
            },
        });

        const responseText = await response.text();
        let responseJSON =  JSON.parse(responseText);
        return responseJSON;

    },

    getMe: async () => {
        let url = `https://api.vrchat.cloud/api/1/auth/user?apiKey=${vrcAPIkey}`; 
        const response = await fetch(url,{
            method: 'get',
            //body:    JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `basic ${userBasicAuth}`,
            },
        });

        const responseText = await response.text();
        //console.log(JSON.parse(responseText));
        let responseJSON =  JSON.parse(responseText);
        responseJSON.friendCount = responseJSON.friends.length + 1
        return responseJSON;

    }

}

//const test = async ()=>console.log(await module.exports.getUser('Technolus'));
//const test = async ()=>console.log(await module.exports.getUser('OculusNekko'));
//const test = async ()=>console.log(await module.exports.getMe());
//const test = async ()=>console.log(await module.exports.getFavorites());
//test();
