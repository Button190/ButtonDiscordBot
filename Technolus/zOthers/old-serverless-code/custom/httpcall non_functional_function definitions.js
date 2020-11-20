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
//const axios = require('axios');
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
  // //Scrape JSON API
  // event = {
  //   "pathParameters": {
  //     "url": "https://www.youtube.com/watch?v=4m7msadL5iA&t=446s", // supports the search parameter (%s) substitution like: https://example.com/search?q=%s
  //     "regexBefore": ["(.....................\\\"Choosing the best mobile app framework................)", "(...)"],       // search parameter like "john oliver", requires the %s for substitution.
  //     "elements": [""],                                                          // search parameter like "john oliver", requires the %s for substitution.
  //     "regexAfter": ["(.*)"],                                              // search parameter like "john oliver", requires the %s for substitution.
  //     "regexMatchResults": [".*"],                                              // search parameter like "john oliver", requires the %s for substitution.
  //     "regexNotMatchResults": [""],                                                      // search parameter like "john oliver", requires the %s for substitution.
  //     "depth":0
  //   }
  // };
  // //-----------------------------------------------------------------------------------------------------------------------------------------------
  // //Scrape scrapeRegexAnimeRss
  // event = {
  //   "pathParameters": {
  //     "url": "http://www.horriblesubs.info/rss.php?res=720", // supports the search parameter (%s) substitution like: https://example.com/search?q=%s
  //     "regexBefore": ["<item><title>(\\[HorribleSubs\\] Boruto - Naruto Next Generations - .*?)<\/item>","(.*)"],       // search parameter like "john oliver", requires the %s for substitution.
  //     "elements": [""],                                                          // search parameter like "john oliver", requires the %s for substitution.
  //     "regexMatchResults": [".*"],                                              // search parameter like "john oliver", requires the %s for substitution.
  //     "regexNotMatchResults": [""],                                                      // search parameter like "john oliver", requires the %s for substitution.
  //     "regexAfter": ["(.*)"],                                              // search parameter like "john oliver", requires the %s for substitution.
  //     "depth":0
  //   }
  // };
  //<item><title>[HorribleSubs] Boruto - Naruto Next Generations - 154 [720p].mkv</title><link>magnet:?xt=urn:btih:PGWWX44P6WRJXWVFRFB7MWBL7PZLRQ76&amp;tr=http://nyaa.tracker.wf:7777/announce&amp;tr=udp://tracker.coppersurfer.tk:6969/announce&amp;tr=udp://tracker.internetwarriors.net:1337/announce&amp;tr=udp://tracker.leechersparadise.org:6969/announce&amp;tr=udp://tracker.opentrackr.org:1337/announce&amp;tr=udp://open.stealth.si:80/announce&amp;tr=udp://p4p.arenabg.com:1337/announce&amp;tr=udp://mgtracker.org:6969/announce&amp;tr=udp://tracker.tiny-vps.com:6969/announce&amp;tr=udp://peerfect.org:6969/announce&amp;tr=http://share.camoe.cn:8080/announce&amp;tr=http://t.nyaatracker.com:80/announce&amp;tr=https://open.kickasstracker.com:443/announce</link><guid isPermaLink="false">PGWWX44P6WRJXWVFRFB7MWBL7PZLRQ76</guid><pubDate>Sun, 26 Apr 2020 09:02:40 +0000</pubDate></item>
  //-----------------------------------------------------------------------------------------------------------------------------------------------
  // event = scrapeJohnOliver;
  //-----------------------------------------------------------------------------------------------------------------------------------------------
  // event = scrapeWikipediaTable;
  //-----------------------------------------------------------------------------------------------------------------------------------------------

  /*

      in|out
      db|cache|manual|custom
      loop{min,max,retVal}|navigate{site,retVal}

{
  inputs and return values:
      in
      out

  memory:
      db
      cache
      manual
      custom

  functions:
      loop{min,max,retVal}
      navigate{site,retVal}
}

  */



  // event = {
  //   "pathParameters": [
  //     {
  //       "function": "hardcodedInput",
  //       'in': { "a": "hello world" },
  //       //'next': {},
  //       'out': { "a": "a" }
  //     }
  //   ]
  // };

  // "function": "cache",
  // "function": "database",
  // "function": "manualInput",
  // "function": "hardcodedInput",

  // "function": "loop",
  // 'in': {
  //   "db": ["series.episodes.next"],
  //   "string": ["http://www.horriblesubs.info/rss.php?res=720"], //try multiple... if first doesn't succeed.
  //   "min": "",
  //   "max": ""
  // },

  // event = {
  //   "pathParameters": [{
  //     "steps": [{
  //       "function": "navigate",
  //       "inputs": "http://www.horriblesubs.info/rss.php?res=720",
  //       "return": "html",
  //     }, {
  //       "retrieve": "html",
  //       "regex": ["<item><title>(\\[HorribleSubs\\] Boruto - Naruto Next Generations - .*?)<\/item>", "(...)"],
  //       "return": "matchGroups",
  //     }]
  //   }, {
  //     "steps": [{
  //       "navigate": "http://www.horriblesubs.info/rss.php?res=1080",
  //     }, {
  //       "regex": ["<item><title>(\\[HorribleSubs\\] Boruto - Naruto Next Generations - .*?)<\/item>", "(...)"],
  //     }]
  //   }]
  // };
  //-----------------------------------------------------------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------------------------------------------------------------------
  event = {
    "pathParameters": [
      {
        "function": {
          "name": "hardcodedInput",
          'in': { "a": "hello world" },
          //'next': {},
          'out': { "a": "a" }
        }
      }
    ]
  };
  //-----------------------------------------------------------------------------------------------------------------------------------------------

  const params = event.pathParameters;


  //called with every property and its value
  function traverse(o, path) {
    for (var oo in o) {
      const pathPrevious = path;
      path = (path || '') + (path ? '.' : '') + oo;
      if (o[oo] !== null && typeof (o[oo]) == "object") {
        traverse(o[oo], path);
      } else {
        console.log({ [path]: o[oo] });
        console.log(importFunctions(oo, o[oo], "next????"));
      }
      path = pathPrevious;
    }
  }
  traverse(params);

  //console.log(params['0']['steps']['0']['navigate']);
});

function importFunctions(name, inputs, outputs, next) {
  const o = {
    "hardcodedInput": function (inputs, outputs, next) {
      console.log(inputs);
      normalizeStringAsArray(inputs);
      return inputs;
    }
  };
  return o[name](inputs, outputs, next);
}

// /**
//  * Returns the regex object created from string.
//  * @param {string} regexStr - the regex string.
//  */
// function strToRegex(regexStr) {
//   let re = new RegExp(regexStr, '');
//   return re;
// }

// /**
//  * Returns the str parsed with regex.
//  * @param {string} str - String to parse.
//  * @param {regex} regex - Regex object.
//  */
// function regexPreparse(str, regex) {
//   regex = new RegExp(regex.source, '');
//   if (!str) {
//     return false;
//   }
//   str = str.match(regex);
//   if (!str) {
//     return false;
//   }
//   str = str[1];
//   return str;
// }

// /**
//  * If JSON, returns the json, else: returns false.
//  * @param {jsonString} String - String to parse.
//  */
// function tryParseJSON(jsonString) {
//   try {
//     var o = JSON.parse(jsonString);
//     // Handle non-exception-throwing cases:
//     if (o && typeof o === "object") {
//       return o;
//     }
//   }
//   catch (e) { }
//   return false;
// }

/**
 * If string, wrap with array: "string" => ["string"]
 * If not string, return input parameter without modification
 * @param {*} variable - if string, will be wrapped into array, else return without modification.
 */
function normalizeStringAsArray(variable) {
  //preparse data, successivellly applying regular expressions contained in an array.
  if (typeof variable == 'string' || variable instanceof String) {
    return [variable];
  }
  return variable;
}