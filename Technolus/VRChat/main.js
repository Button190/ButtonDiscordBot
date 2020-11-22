// const fetch = require('node-fetch');

// require('dotenv').config();

// const vrcAPIkey = process.env.VRC_API_KEY;
// const userBasicAuth = process.env.VRC_BASIC_AUTH; //.base64_encode("$username:$password")

// module.exports = {
//     setAvatar: async (id) => {
//         let url = `https://api.vrchat.cloud/api/1/avatars/' & id & '/select?apiKey=${vrcAPIkey}`; 
//         const response = await fetch(url,{
//             method: 'put',
//             //body:    JSON.stringify(body),
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `basic ${userBasicAuth}`,
//             },
//         });
//         const responseText = await response.text();
//         return responseText;

//     },

//     getFavorites: async () => {
//         let url = `https://api.vrchat.cloud/api/1/favorites/?apiKey=${vrcAPIkey}&type=avatar`; 
//         const response = await fetch(url,{
//             method: 'get',
//             //body:    JSON.stringify(body),
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `basic ${userBasicAuth}`,
//             },
//         });

//         const responseText = await response.text();
//         return responseText;

//     }
// }

// const test = async ()=>console.log(await module.exports.getFavorites());
// test();