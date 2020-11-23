require('dotenv').config();
const fetch = require('node-fetch');

module.exports = {
    getTenorImages: async (search) => {

        // clean up search term
        search = search.replace(/\s/g, "-").replace(/'/g, "%27"); // dashed instead of spaces
        search = encodeURIComponent(search); // handle spacial chars

        const response = await fetch(`https://api.tenor.com/v1/search?q=${search}$&key=${process.env.TENOR_API_KEY}&limit=40`);
        const data = JSON.parse(await response.text());

        //console.log(data);
        
        //image addresses into array
        let images = [];
        for (var s of data.results) {
            // and transform relative link into full address
            
            images.push(s.url);
        }

        return images;
        
    }
}

//const test = async () =>console.log(await module.exports.getTenorImages("think"));
//test();


// const fetch = require('node-fetch');

// module.exports = {
//     getTenorImages: async (search) => {

//         // clean up search term
//         search = search.replace(/\s/g, "-").replace(/'/g, "%27"); // dashed instead of spaces
//         search = encodeURIComponent(search); // handle spacial chars

//         //console.log('https://tenor.com/search/' + search + '-gifs');

//         const response = await fetch('https://tenor.com/search/' + search + '-gifs');
//         const dirtyData = await response.text();
//         const data = dirtyData.replace(/\\u002F/g, "/"); // page's links in json -> human readable (\u002F -> /)
        
//         //console.log(data.substring(15000,25000));

//         // so bad, yet so good. use regular expression to extract anchor tags
//         //const matches = data.match(/<a activeClassName="current" href="\/view\/(.*?)">/g);
//         const matches = data.match(/<a (|activeClassName="current" )href="\/view\/(.*?)">/g);

//         //console.log(matches);

//         //clean up and push image addresses into array
//         let images = [];
//         for (var s of matches) {
//             // so bad, yet so good. use regular expression to extract links within the anchor tags
//             // and transform relative link into full address
            
//             s = "https://tenor.com/view/"+s.match(/<a (|activeClassName="current" )href="\/view\/(.*?)"/)[2];
            
//             images.push(s);
//         }

//         console.log(images);

//         let topImages = images.splice(0,50);
//         //let topImages = images.splice(0,Math.ceil(images.length / 3));
//         return topImages;

//         // if (images.length>3){
//         //     //cut array in half
//         //     let halfOfAllImages = images.splice(0,Math.ceil(images.length / 3));
//         //     return halfOfAllImages;
//         // }else{
//         //     return images;
//         // }
        
//     }
// }

