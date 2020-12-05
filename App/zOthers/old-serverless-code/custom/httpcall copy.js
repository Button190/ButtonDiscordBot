import handler from "../libs/handler-lib";
import { httpGet } from "../libs/httpcall-lib";
//const cheerio = require('cheerio');

//npm install cheerio
//https://www.twilio.com/blog/web-scraping-and-parsing-html-with-node-js-and-cheerio

//tester:
//serverless invoke local --function httpcall --path mockscustom/user.json


export const main = handler(async (event, context) => {
  let html = httpGet('https://1337x.to/sort-search/last%20week%20tonight%20with%20john%20oliver%20s07e04/seeders/desc/1/');
  html = JSON.parse(html);

  // //html = '<h2 class="title">Hello world</h2>';
  // const $ = cheerio.load(html);
  // //const $ = cheerio.load(html);

  // return $.html();
  return html;
});