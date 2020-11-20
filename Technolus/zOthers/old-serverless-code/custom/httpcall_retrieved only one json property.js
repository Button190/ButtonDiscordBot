/*
 * TODO: ADD ITERATION OVER MULTIPLE SEARCH ENTRIES IN A RANGE, AND AN ARRAY OF OBJECTS
 *
 * TODO: scrape: json
 * TODO: scrape: json --> POST/OTHER_VERBS
 *
 * TODO: scrape: substring to locate json object/script tags, perform eval and get properties from json.
 *
 * TODO: scrape: remove lowercase body in cheerios contains
 *
 * TODO: scrape: make sure that we can still use regex afterwords if needed to clean up the results. ???
 *
 * TODO: scrape: allow for rounds (asynchronous calls from) and subrounds (synchrous calls that take into account previous results via regex)
 *
 * Study the possibility of allowing for chaining.
 *
 */


/*
 * EXAMPLE with all possible properties:

 {
  "pathParameters": {

    "id": "578eb840-f70f-11e6-9d1a-1359b3b22944",

    "url": "https://www.youtube.com/watch?v=4m7msadL5iA&t=446s", // supports the search parameter (%s) substitution like: https://example.com/search?q=%s

    "search": "",                                               // search parameter like "john oliver", requires the %s for substitution.

    "elements": "",                                             // [Activates cherios.] Html elements to retrieve based on css selectors (combined with contains and contains not if activated). Example --> 1337.to
    "include": "",                                              // results to keep and to throw away
    "exclude": "",                                              // results to throw away

    "regex": "...\\\"title\\\":\\\"(.*?)\\\"...",               // [Activates simple regex and subregex.]
    "regexMatches": [0,1,2,3]                                     // get specific matches.


    "jsons": ["client_ip . "]                                                // [Activates json] retrieve json properties.

    "eval": "",                                                // [Activates eval of all json objects]

    [{round1:{synchrounous_subround1}},
    {round2},
    {round3}]

  },
  "requestContext": {
    "identity": {
      "cognitoIdentityId": "USER-SUB-1234"
    }
  }
}

 *
 */


import handler from "../libs/handler-lib";
const axios = require('axios');
const cheerio = require('cheerio');
const url = require('url');

//npm install axios cheerio

//sources:
//https://www.twilio.com/blog/web-scraping-and-parsing-html-with-node-js-and-cheerio
//https://morioh.com/p/b260ff42c61f

//tester:
//serverless invoke local --function httpcall --path mockscustom/scrape_JsonService.json
//serverless invoke local --function httpcall --path mockscustom/scrape_JohnOliver.json
//serverless invoke local --function httpcall --path mockscustom/scrape_YoutubeTitleRegex.json
//v--- not done.
//serverless invoke local --function httpcall --path mockscustom/scrape_YoutubeEvalScript.json
//serverless invoke local --function httpcall --path mockscustom/scrape_WikipediaTable.json
//serverless invoke local --function httpcall --path mockscustom/scrape_AnimeRss.json

export const main = handler(async (event, context) => {

  const theSearch = event.pathParameters.search; //get search to iterate over from parameters

  let theUrl = event.pathParameters.url; //get url to scrape from parameters
  const theSearchURIEnc = encodeURIComponent(theSearch);
  theUrl = theUrl.replace(/%s/g, theSearchURIEnc);// substitute urlencoded search string into url
  const parsedURL = url.parse(theUrl);
  const theHost = `${parsedURL.protocol}//${parsedURL.host}`; // get the host name: "https://example.com"
  console.log(theUrl);

  let theInclude = event.pathParameters.include;
  let theExclude = event.pathParameters.exclude;

  const theJsons = event.pathParameters.jsons;
  const theEval = event.pathParameters.eval;

  let theElements = event.pathParameters.elements;
  theElements = theElements.replace(/"/g, "'");//sanitize input so that it will always be a valid string

  let theRegex = event.pathParameters.regex;
  //let theSubRegex = event.pathParameters.subRegex;
  let theRegexMatches = event.pathParameters.regexMatches;

  const resp = axios.get(theUrl).then((response) => {
    let results = []; // scrapping results will be stored here and then returned.

    if (theElements) {
      const $ = cheerio.load(response.data.toLowerCase());

      let containsWords = '';

      if (theElements) {
        theElements.toLowerCase().split(" ").forEach(function (word) {
          containsWords += ' ' + word.replace(/"/g, '\\"') + '';
        });
      }

      if (theInclude) {
        theInclude = theSearch;
      }
      if (theInclude) {
        theInclude.toLowerCase().split(" ").forEach(function (word) {
          containsWords += `:contains("${word.replace(/"/, '\\"').replace('\)', '\\(').replace('\)', '\\(')}")`;
        });
      }

      if (theExclude) {
        theExclude.toLowerCase().split(" ").forEach(function (word) {
          containsWords += `:not(:contains("${word.replace(/"/, '\\"')}"))`;
        });
      }

      console.log(containsWords);
      const els = $(containsWords);

      //Find the matches with cheerio
      els.each(function (i, el) {
        el = $(el);
        results.push({
          'text': el.text(),
          'link': theHost + el.attr('href')
        });
      });

    } else if (theJsons) {

      theJsons.forEach(function (theJson) {
        theJson.split(" ").forEach(function (thisJson) {

          let tempJsonNavigator = '';
          tempJsonNavigator = response.data;
          thisJson.split(".").forEach(function (dotSection) {
            //console.log(tempJsonNavigator[dotSection]);
            tempJsonNavigator = tempJsonNavigator[dotSection];
          });

          results.push({ [thisJson]: tempJsonNavigator });

        });

      });

      // retrieve more than one property ... todo...

    } else if (theRegex) {
      //Find the matches with regex: //view-source:https://www.youtube.com/watch?v=4m7msadL5iA&t=446s
      //theRegex = '\\",\\"title\\":\\"(.*?)\\",\\"'; //lengthSeconds\":\"713\" \"url\":\"https:\/\/i.ytimg.com\/vi_webp\/4m7msadL5iA\/maxresdefault.webp\"
      theRegex = theRegex.replace(/\\/g, '\\\\');
      let theGlobalRegex = new RegExp(theRegex, 'ig');
      let theGroupRegex = new RegExp(theRegex, 'i');
      console.log(theGroupRegex);
      let matches = response.data.match(theGlobalRegex);
      if (matches) {

        if (!theRegexMatches) {
          for (let i = 0; i < matches.length; i++) {

            let shiftedMatches = matches[i].match(theGroupRegex);

            results.push(shiftedMatches.splice(1, shiftedMatches.length));
            console.log(shiftedMatches.splice(1, shiftedMatches.length));

          }
        } else {
          theRegexMatches.forEach(function (i) {
            if (matches[i]) {

              let shiftedMatches = matches[i].match(theGroupRegex);

              results.push(shiftedMatches.splice(1, shiftedMatches.length));
              console.log(shiftedMatches.splice(1, shiftedMatches.length));

            }
          });
        }

      }

    } else if (theEval) {
      const $ = cheerio.load(response.data);
      $('script').each(function (i, elem) {
        console.log($(elem).text());
      });
      console.log("eval pathway, not implemented");

    }

    //console.log(response.data);
    return results;
  });

  return resp;
});