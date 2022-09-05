// Required modules for app
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ejs = require('ejs')
const path = require('path')

const scrapeDataAndWriteToPdf = require('./get-data.js')

// app initiations

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set(express.static(path.join( __dirname,'public')));

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/chapter-link-check', (req, res) => {
    const link = req.body.chapterLink;
    scrapeDataAndWriteToPdf(link, res)
    
})

app.post('/download', (req, res) => {
    const file = req.body.filePath
    console.log(file)
    res.download(file)
})

app.listen(3000, () => {
    // setInterval(() => {
    //     console.log('Testing')
    // }, 2000)
    console.log('server listing on port 3000')
})