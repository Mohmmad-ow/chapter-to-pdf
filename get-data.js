// 
const cheerio = require('cheerio');
const axios = require('axios');
const pretty = require('pretty');

let url ='https://noobchan.xyz/novel/kanojo-ga-senpai-ni-ntr-reta-no-de/chapter-50/';




async function scrapeData() {
    try {
      
      const { data } = await axios.get(url);
      // Load HTML we fetched in the previous line
      const $ = cheerio.load(data, null, false);
      const title = $('.main-col h1')
      const content = $('.text-left')
      const text = $('.text-left p')
      console.log(pretty(text.html()))
      text.each(function (idx, el) {
        console.log($(el).text());
      });
      
      
    } catch (err) {
      console.error(err);
    }
  }
  // Invoke the above function
  scrapeData();