// Required modules for app
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ejs = require('ejs')
const path = require('path')
const findRemoveSync = require('find-remove')

// Port
const port = process.env.PORT || 3000;
const scrapeDataAndWriteToPdf = require('./get-data.js')

// app initiations

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set(express.static(path.join( __dirname,'public')));

app.get('/', (req, res) => {
    res.render('index')
})

// in case you go to this URL without a post request then it gives the user a 404 error and links him back the home page
app.get('/chapter-link-check', (req, res) => {
    res.render('file-not-found')
    
})
// Make the file and writes it and when it's done it sends you to another page to download the file
app.post('/chapter-link-check', (req, res) => {
    const link = req.body.chapterLink;
    if (!link || link == '') {
        res.render('file-not-found')
    } else {

        scrapeDataAndWriteToPdf(link, res)
    }
    
})
// Download the ready file
app.get('/download', (req, res) => {
    
        res.render('file-not-found')
    
})
app.post('/download', (req, res) => {
    const file = req.body.filePath
    if (!file || file == "") {
        res.render('file-not-found')
    } else {
        console.log(file)
        res.download(file)
    }
})

app.listen(port, () => {
    
    setInterval(() => {
        findRemoveSync(path.join(__dirname , 'public', 'chapter-pdf'), {age: { seconds: 1200 },extensions: '.pdf'})
    }, 1800000)
    console.log('server listing on port 3000')
})
