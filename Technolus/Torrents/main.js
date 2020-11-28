require('dotenv').config();

module.exports = {
    getTorrent: async (search, quality) => {
        quality = quality || '720';
        return await require('./Providers/1337x').get(search, quality);
    },
    getAnimeTorrent: async (search, quality) => {
        quality = quality || '720';
        return await require('./Providers/nyan').get(search, quality);
    },
}


//const test = async ()=>console.log( await module.exports.getTorrent("supernatural s15e10") );
//test();