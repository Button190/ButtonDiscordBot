require('dotenv').config();
const fetch = require('node-fetch');

module.exports = {
    getTenorImages: async (search, limit) => {

        limit = limit || 50
        if ( limit > 50 ) {
            //limit = 50;
            console.error("tenor image limit per request exceeded: max 50");
        }

        // clean up search term
        search = search.replace(/\s/g, "-").replace(/'/g, "%27"); // dashed instead of spaces
        search = encodeURIComponent(search); // handle spacial chars

        const response = await fetch(`https://api.tenor.com/v1/search?q=${search}$&key=${process.env.TENOR_API_KEY}&limit=${limit}`);
        const data = JSON.parse(await response.text());

        //console.log(data);
        
        //image addresses into array
        let images = [];
        for (var s of data.results) {
            // and transform relative link into full address
            
            images.push(s.url);
        }

        return images;
        
    },
    
    getTenorImagesFrontPage: async (search) => {

        // clean up search term
        search = search.replace(/\s/g, "-"); // dashed instead of spaces
        search = encodeURIComponent(search); // handle spacial chars


        const response = await fetch('https://tenor.com/search/' + search + '-gifs');
        const dirtyData = await response.text();
        const data = dirtyData.replace(/\\u002F/g, "/"); // page's links in json -> human readable (\u002F -> /)
        
        //console.log('https://tenor.com/search/' +search + '-gifs');
        //console.log(data.substring(15000,25000));

        // so bad, yet so good. use regular expression to extract anchor tags
        const matches = data.match(/<a (|activeClassName="current" )href="\/view\/(.*?)">/g);

        //console.log(matches);

        //clean up and push image addresses into array
        let images = [];
        for (var s of matches) {
            // so bad, yet so good. use regular expression to extract links within the anchor tags
            // and transform relative link into full address
            s = "https://tenor.com/view/"+s.match(/<a (|activeClassName="current" )href="\/view\/(.*?)"/)[2];
            images.push(s);
        }

        return images;
    }
}
