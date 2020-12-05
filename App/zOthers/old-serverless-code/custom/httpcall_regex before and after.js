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


import handler from "../libs/handler-lib";
const axios = require('axios');
//const matchAll = require("match-all");
//const cheerio = require('cheerio');
//const url = require('url');

//npm install axios cheerio

//sources:
//https://www.twilio.com/blog/web-scraping-and-parsing-html-with-node-js-and-cheerio
//https://morioh.com/p/b260ff42c61f

//tester:
//serverless invoke local --function httpcall

export const main = handler(async (event, context) => {

  //-----------------------------------------------------------------------------------------------------------------------------------------------
  //Scrape JSON API
  event = {
    "pathParameters": {
      "url": "https://www.youtube.com/watch?v=4m7msadL5iA&t=446s", // supports the search parameter (%s) substitution like: https://example.com/search?q=%s
      "regexBefore": ["(.....................\\\"Choosing the best mobile app framework................)", "(...)"],       // search parameter like "john oliver", requires the %s for substitution.
      "elements": [""],                                                          // search parameter like "john oliver", requires the %s for substitution.
      "regexAfter": ["(.*)"],                                              // search parameter like "john oliver", requires the %s for substitution.
      "regexMatchResults": [".*"],                                              // search parameter like "john oliver", requires the %s for substitution.
      "regexNotMatchResults": [""],                                                      // search parameter like "john oliver", requires the %s for substitution.
      "depth":0
    }
  };
  //-----------------------------------------------------------------------------------------------------------------------------------------------
  //Scrape scrapeRegexAnimeRss
  event = {
    "pathParameters": {
      "url": "http://www.horriblesubs.info/rss.php?res=720", // supports the search parameter (%s) substitution like: https://example.com/search?q=%s
      "regexBefore": ["<item><title>(\\[HorribleSubs\\] Boruto - Naruto Next Generations - .*?)<\/item>","(.*)"],       // search parameter like "john oliver", requires the %s for substitution.
      "elements": [""],                                                          // search parameter like "john oliver", requires the %s for substitution.
      "regexMatchResults": [".*"],                                              // search parameter like "john oliver", requires the %s for substitution.
      "regexNotMatchResults": [""],                                                      // search parameter like "john oliver", requires the %s for substitution.
      "regexAfter": ["(.*)"],                                              // search parameter like "john oliver", requires the %s for substitution.
      "depth":0
    }
  };
  //<item><title>[HorribleSubs] Boruto - Naruto Next Generations - 154 [720p].mkv</title><link>magnet:?xt=urn:btih:PGWWX44P6WRJXWVFRFB7MWBL7PZLRQ76&amp;tr=http://nyaa.tracker.wf:7777/announce&amp;tr=udp://tracker.coppersurfer.tk:6969/announce&amp;tr=udp://tracker.internetwarriors.net:1337/announce&amp;tr=udp://tracker.leechersparadise.org:6969/announce&amp;tr=udp://tracker.opentrackr.org:1337/announce&amp;tr=udp://open.stealth.si:80/announce&amp;tr=udp://p4p.arenabg.com:1337/announce&amp;tr=udp://mgtracker.org:6969/announce&amp;tr=udp://tracker.tiny-vps.com:6969/announce&amp;tr=udp://peerfect.org:6969/announce&amp;tr=http://share.camoe.cn:8080/announce&amp;tr=http://t.nyaatracker.com:80/announce&amp;tr=https://open.kickasstracker.com:443/announce</link><guid isPermaLink="false">PGWWX44P6WRJXWVFRFB7MWBL7PZLRQ76</guid><pubDate>Sun, 26 Apr 2020 09:02:40 +0000</pubDate></item>
  //-----------------------------------------------------------------------------------------------------------------------------------------------
  // event = scrapeJohnOliver;
  //-----------------------------------------------------------------------------------------------------------------------------------------------
  // event = scrapeWikipediaTable;
  //-----------------------------------------------------------------------------------------------------------------------------------------------
  // event = {
  //   "pathParameters": {
  //     "steps": [{
  //       "navigate_url": "http://www.horriblesubs.info/rss.php?res=720"
  //     },{
  //       "regex": ["<item><title>(\\[HorribleSubs\\] Boruto - Naruto Next Generations - .*?)<\/item>","(...)"]
  //     }]
  //   }
  // }
  //-----------------------------------------------------------------------------------------------------------------------------------------------

  const params = event.pathParameters;

  const resp = axios.get(params.url).then((response) => {
    let data = response.data;

    //preparse data, successivellly applying regular expressions contained in an array.
    params.regexBefore = stringWrapToArray(params.regexBefore);
    params.regexBefore.forEach(function (regexStr) {
      let re = strToRegex(regexStr);
      data = regexPreparse(data, re);
    });

    //Check if is JSON.
    const isJSON = tryParseJSON(data);

    if (isJSON) {
      console.log('is_JSON');
      //parse with json string(s), add ranges for numbers(?).
    } else {
      console.log('is_NOT_JSON');
      //parse with cheerio
    }
    return data;
  });

  return resp;
});


/**
 * Returns the regex object created from string.
 * @param {string} regexStr - the regex string.
 */
function strToRegex(regexStr) {
  let re = new RegExp(regexStr, '');
  return re;
}

/**
 * Returns the str parsed with regex.
 * @param {string} str - String to parse.
 * @param {regex} regex - Regex object.
 */
function regexPreparse(str, regex) {
  regex = new RegExp(regex.source, '');
  if (!str) {
    return false;
  }
  str = str.match(regex);
  if (!str) {
    return false;
  }
  str = str[1];
  return str;
}

/**
 * If JSON, returns the json, else: returns false.
 * @param {jsonString} String - String to parse.
 */
function tryParseJSON(jsonString) {
  try {
    var o = JSON.parse(jsonString);
    // Handle non-exception-throwing cases:
    if (o && typeof o === "object") {
      return o;
    }
  }
  catch (e) { }
  return false;
}

/**
 * If string, wrap with array: "string" => ["string"]
 * If not string, return input parameter without modification
 * @param {*} variable - if string, will be wrapped into array, else return without modification.
 */
function stringWrapToArray(variable) {
  //preparse data, successivellly applying regular expressions contained in an array.
  if (typeof variable == 'string' || variable instanceof String){
    return [variable];
  }
  return variable;
}