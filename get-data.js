// 
const cheerio = require('cheerio');
const axios = require('axios');
const pdfDoc = require('pdfkit');
const fs = require('fs');
const path = require('path')
module.exports = 

async function (url, res) {
    try {
      // We make an async ver for the Page data
      const { data } = await axios.get(url);
      // Load HTML we fetched in the previous line
      const $ = cheerio.load(data, null, false,{ ignoreWhitespace: true });
      // Chapter Title
      const title = $('.main-col h1').text()
      // make a verb for the filePath to download the pdf file when it's made
      const filePath = path.join(__dirname , "public" , "chapter-pdf" , title + '.pdf')
      // Chapter Content
      const text = $('.text-left p')
      // we make a pdf file and write the title with a bit of styling
      const pdfDocument = new pdfDoc;
      pdfDocument.pipe(fs.createWriteStream(path.join(__dirname , "public" , "chapter-pdf" , title + '.pdf')));
      pdfDocument.fontSize(32).text(title, {align: 'center'});
      // we loop through the content of the chapter and write each line to the pdf
      // Note that we made an if statement to remove the U+3000 character as it leaves 0 in it's place if it's printed in the pdf file
      text.each(function (idx, line) {
        
        let l = $(line).text();
        if (l[0] == "　") {
          
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
      // we close the PDF file when it's done
      pdfDocument.end()
      // we render the next page and send the file path for the pdf file to be downloaded in the Download page
      res.render('download.ejs', {path: filePath})
    } catch (err) {
      console.log("There is an error " + err);
      res.send("<h1>There was an error: make sure to enter a working link.</h1>")
    }
  }