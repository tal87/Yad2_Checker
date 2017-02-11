var fs = require('fs');
var express = require('express');
var search = require('./search.js');
var downloader = require('./downloader.js');
var app = express();

var read = fs.createReadStream('data.json');
var src = '';
read.on('data', (chunk) => {
    src += chunk;
});

read.on('end', () => {
    listen();
});

function listen(){
    var apts = JSON.parse(src);
    app.get('/get', (req, res) => {
        res.append('Access-Control-Allow-Origin', '*');
        res.write(JSON.stringify(apts[req.query.q]));
        res.end();
    });

    app.get('/download', (req, res) => {
        res.append('Access-Control-Allow-Origin', '*');
        if(req.query.minR == undefined){
            req.query.minR = '';
        }

        if(req.query.maxR == undefined){
            req.query.maxR = '';
        }

        if(req.query.minP == undefined){
            req.query.minP = '';
        }

        if(req.query.maxP == undefined){
            req.query.maxP = '';
        }

        var searchObj = new search.search(req.query.minR, req.query.maxR, req.query.minP, req.query.maxP, req.query.city);
        var relativeUrl = searchObj.getUrl();

        downloader.init(getData);
        console.log('url:', relativeUrl);
        downloader.download(relativeUrl, 0, getData);
        function getData(apts){
            console.log('getting data');
            apts.sort((a, b) => {
                return a.Price - b.Price;
            });

            var read = fs.createReadStream('data.json');
            var src = '';
            read.on('data', (chunk) => {
                src += chunk;
            });

            read.on('end', () => {
                var obj = JSON.parse(src);
                obj[req.query.city] = apts;
                var out = fs.createWriteStream('data.json');
                out.write(JSON.stringify(obj));
                out.end();
                res.end('done');
            });
        }
    });

    app.listen(3000);
    console.log('listening to incoming requests');
}
