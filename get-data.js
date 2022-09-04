// 
const cheerio = require('cheerio');
const axios = require('axios');
const pretty = require('pretty');
const pdfDoc = require('pdfkit');
const fs = require('fs');
const path = require('path')

let url ='https://noobchan.xyz/novel/kanojo-ga-senpai-ni-ntr-reta-no-de/chapter-50/';




async function scrapeDataAndWriteToPdf(url) {
    try {
      // We make an async ver for the Page data
      const { data } = await axios.get(url);
      // Load HTML we fetched in the previous line
      const $ = cheerio.load(data, null, false,{ ignoreWhitespace: true });
      // Chapter Title
      const title = $('.main-col h1').text()
      // Chapter Content
      const text = $('.text-left p')

      // console.log(pretty(text.html()))
      const pdfDocument = new pdfDoc;
      pdfDocument.pipe(fs.createWriteStream(path.join(__dirname , "public" , "chapter-pdf" , title + '.pdf')));
      pdfDocument.fontSize(32).text(title, {align: 'center'});
      text.each(function (idx, line) {
        
        let l = $(line).text();
        if (l[0] == "　") {
          console.log("True")
          l = l.slice(1)
          pdfDocument.fontSize(14)
            .text(l, {align:'left'})
          pdfDocument.moveDown()
        } else {
          pdfDocument.fontSize(14)
            .text(l, {align:'left'})
          pdfDocument.moveDown()
        }
      });
      pdfDocument.end()
      
    } catch (err) {
      console.error(err);
    }
  }
  // Invoke the above function
  scrapeDataAndWriteToPdf(url);