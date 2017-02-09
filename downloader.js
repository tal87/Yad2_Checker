var express = require('express');
var fs = require('fs');
var http = require('http');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var iconv = require('iconv-lite');
var reader = require('./reader.js');
var zlib = require('zlib');
const buffer = require('buffer');
const hostname = 'www.yad2.co.il';
var index;

var app = express();
var apts = [];

function download(path, ind, getDataCallback){
    index = ind;
    var src = '';
    var options = {
        hostname: hostname,
        path: path,
        headers: {
            'Cookie': 'SaveSearch_CustID=fbj6512401244; __utma=143340477.1003496119.1485977061.1486497303.1486500061.5; __utmz=143340477.1486500061.5.5.utmcsr=sports.walla.co.il|utmccn=(referral)|utmcmd=referral|utmcct=/item/3038494; realEstateBanner=20170208; searchB144FromYad2=0_C_%F8%F2%F0%F0%E4; favorites_userid=eea6472830498; SPSI=163cfb80b7750f2686400e1c069da3f0; PHPSESSID=gidvcej5d1fb36mil817cbhqh4; yad2upload=1761607690.20480.0000; _dc_gtm_UA-708051-1=1; PRLST=Fs; UTGv2=h47ad0464ed3bcbce2f94b54cdb99a8a7637; _ga=GA1.3.1003496119.1485977061; CLIENT_WIDTH_DIR=1440; MAIN_WIDTH_DIR=1440; adOtr=fc6b103T8',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, sdch',
            'Accept-Language': 'en-US,en;q=0.8'
        }
    };

    var gunzip = zlib.createGunzip();
    http.get(options, (res) => {
        // if(options.path.indexOf('Page=4')> - 1){
            console.log('content-length:', res.headers['content-length']);
        // }
        // console.log('resp-headers', res.headers);
        var src = '';
        // decompress and decode source
        var decoder = iconv.decodeStream('Windows-1255');
        var out = fs.createWriteStream('source' + ind + '.txt');
        res.pipe(gunzip).pipe(decoder);
        decoder.pipe(out);
        // read source
        decoder.on('data', (chunk) => {
            src += chunk;
        });

        // done reading source
        decoder.on('end', () => {
            parseSource(src);
        });
    });
}

function parseSource(src){
    // console.log('source:', src);
    var nextPage = iconv.encode(reader.paging(src), 'Windows-1255').toString();
    if(nextPage.length > 0){
        console.log('nextPage: ', nextPage);
        setTimeout(() => {
            download(nextPage, ++index);
        }, 500);
    }else{
        console.log('done');
    }
}

module.exports.download = download;
