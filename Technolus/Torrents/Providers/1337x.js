const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
    get: async (search, quality) => {

        // clean up search term and handle spacial chars
        search = encodeURIComponent(search)
                //.replace(/%20/g, "+")
                //.replace(/'/g, "%27"); 

        const baseUrl = 'https://1337x.to';
        const url = `${baseUrl}/sort-search/${search}/seeders/desc/1/`;
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

        if ( /No results were returned\. Please refine your search\./.test( $('.box-info-detail').text() ) ) {
            //no torrents for this search.
            //console.log( "No results!" );
            return [];
        }
        
        
        //console.log( "proceeding with results!" );
        
        let hyperlinks = []
        $('table>tbody>tr>td>a:nth-child(2)').each( async function(index, element) {
            hyperlinks.push({
                title: $(element).text(),
                href: $(element).attr('href'),
            });
        });      

        let magnets = [];
        flagFound = false;
        for(let element of hyperlinks ) {
            
            if ( ! flagFound ){
                
                if ( /720p/.test(element.title) ) {
                    flagFound = true;
                    
                    const url = baseUrl + element.href;
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
                    const $$ = cheerio.load(html);
                    
                    $$('.clearfix > ul > li:nth-child(1) > a').each(  function(index, element2) {
                        magnets.push({
                            title: element.title,
                            magnet: $(element2).attr('href'),
                        });
                        //console.log($(element).attr('href'));
                        
                    });
                    
                }

                

            }


        }
        return magnets;
    
    }

}