// Required modules for app
const express = require('express');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');
const axios = require('axios');
const pretty = require('pretty');
const app = express();
const ejs = require('ejs')
const path = require('path')

// app initiations

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set(express.static(path.join( __dirname,'public')));

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/chapter-link-check', (req, res) => {
    const link = req.body.chapterLink;
    console.log(link)
})

app.listen(3000, () => {
    // setInterval(() => {
    //     console.log('Testing')
    // }, 2000)
    console.log('server listing on port 3000')
})