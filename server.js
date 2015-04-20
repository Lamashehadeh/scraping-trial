/**** web scraping with Nodejs ****
*
* based on tutorial:
* https://scotch.io/tutorials/scraping-the-web-with-node-js
*
*/

var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
    // Let's scrape Anchorman 2
    url = 'http://www.imdb.com/title/tt1229340/';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var title, release, rating;
            var json = { title : "", release : "", rating : ""};

            $('.header').filter(function(){
                var data = $(this);
                title = data.children().first().text();
                release = data.children().last().children().text();

                json.title = title;
                json.release = release;
            })

            $('.star-box-giga-star').filter(function(){
                var data = $(this);
                rating = data.text();

                json.rating = rating;
            })
        }
        console.log("Found Movie from: "+url);
        console.log("Movie Data: "+JSON.stringify(json,null,4));
        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
            console.log('File successfully written! - Check your project directory for the output.json file');
            console.log("---------------------------------------------");
        })

        res.send('Check your console!')
    })
})

app.listen('8081')
console.log('\n>>> Server listening on port 8081 <<<\n');
exports = module.exports = app;     