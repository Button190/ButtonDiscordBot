const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
    get: async (search, quality) => {

        // clean up search term and handle spacial chars
        search = encodeURIComponent(search)
                //.replace(/%20/g, "+")
                //.replace(/'/g, "%27"); 

        const baseUrl = 'https://nyaa.si';
        const url = `${baseUrl}/?q=${search}&f=0&c=0_0&`;
        //console.log( url );
        const response = await fetch(url,{
            method: 'get',
            headers: {
                'Content-Type': 'text/html',
                'Connection': 'keep-alive',
                'user-agent': 'Mozilla/5.0',

            },
        });
        const html = await response.text();
        const $ = cheerio.load(html);


        //console.log( $("h2").text() );

        if ( /No results found\./.test( $('body>div>h3').text() ) ) {
            //no torrents for this search.
            //console.log( "No results!" );
            return [];
        }
        
        //console.log( "proceeding with results!" );
        
        
        $('.default').each(function (index, element) {
            $(element).
            // ------------------------------------------------------------------------------------------------ I'M HERE !!!!!

            // 1 - for each default tr, get text and magnet td's
            // 2 - test the text, if matches 720p, store in array

            // let hyperlinks = []
            // $('td').each( async function(index, element) {
            //     hyperlinks.push({
            //         title: $(element).text(),
            //         href: $(element).attr('href'),
            //     });
            // });      
            

            // let magnets = [];
            // flagFound = false;
            // for(let element of hyperlinks ) {
                
            //     if ( ! flagFound ){
                    
            //         if ( /720p/.test(element.title) ) {
            //             flagFound = true;
                        
            //             const url = baseUrl + element.href;
                        
            //             magnets.push({
            //                 title: element.title,
            //                 magnet: $(element2).attr('href'),
            //             });
            //             //console.log($(element).attr('href'));
                        
                        
            //         }
                    
            //     }
                
            // }
            
            


        });

        return magnets;
    
    }

}