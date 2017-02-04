var express = require('express');
var fs = require('fs');
var http = require('http');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var app = express();
var iconv = require('iconv-lite')

function download(url, callback){
    var src = '';
    http.get(url, (res) =>{
        res.on('data', (chunk) =>{
            src += iconv.decode(new Buffer(chunk), 'Windows-1255');
        });

        res.on('end', ()=>{
            console.log('finished downloading');
            fs.writeFile('source3.txt', src);
            callback('source3.txt')
        });
    });
}

module.exports.download = download;
