var express = require('express');
var fs = require('fs');
var http = require('http');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var iconv = require('iconv-lite');
var zlib = require('zlib');
const buffer = require('buffer');
var reader = require('./reader.js');
var hebrewCoder = require('./hebrew_coder.js');
const hostname = 'www.yad2.co.il';

var apartments = [];
var index;
var app = express();
var finishDownloadingCallback;

function initCallback(callback){
    finishDownloadingCallback = callback;
}

function download(path, ind){
    // if(ind == 1){
    //     finishDownloadingCallback(apartments);
    //     return;
    // }

    index = ind;
    var src = '';
    var options = {
        hostname: hostname,
        path: path,
        headers: {
            'Cookie': ' i_72623ev9=75; CLIENT_WIDTH_DIR=1440; MAIN_WIDTH_DIR=1440; SaveSearch_CustID=hbi9335695295; __utma=143340477.1144192880.1486718326.1486724861.1486727966.2; __utmz=143340477.1486727966.2.2.utmcsr=news.walla.co.il|utmccn=(referral)|utmcmd=referral|utmcct=/item/3039505; sbtsck=jav; PHPSESSID=h1dotp279e09n8hjgn8le3pd46; yad2upload=1761607690.20480.0000; realEstateBanner=20170211; uncl-cookie=6203b723-4fda-410a-8258-99b6337d22ab; CLIENT_WIDTH_DIR=1440; MAIN_WIDTH_DIR=1440; searchB144FromYad2=0_C_%F8%EE%FA+%E2%EF; SPSI=fa975a4577bf755d7cf96ae810b1e89b; PRLST=DN; UTGv2=h47ad0464ed3bcbce2f94b54cdb99a8a7637; favorites_userid=cjc2111155619; _ga=GA1.3.1144192880.1486718326; adOtr=57PaA5974',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, sdch',
            'Accept-Language': 'en-US,en;q=0.8',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
        }
    };

    var gunzip = zlib.createGunzip();
    http.get(options, (res) => {
        var src = '';
        // decompress and decode source
        var decoder = iconv.decodeStream('Windows-1255');
        // var out = fs.createWriteStream('source' + ind + '.html');
        res.pipe(gunzip).pipe(decoder);
        // decoder.pipe(out);
        //read source
        decoder.on('data', (chunk) => {
            src += chunk;
        });

        // done reading source
        decoder.on('end', () => {
            reader.data(src, (apts) => {
                console.log('current apats: ', apartments.length);
                console.log('new apts: ', apts.length);
                for(var i = 0; i < apts.length; i++){
                    apartments.push(apts[i]);
                }

                console.log('apartments so far: ', apartments.length);
            });

            parseSource(src);
        });
    });
}

function parseSource(src){
    var nextPage = hebrewCoder.codeUrl(reader.paging(src));
    if(nextPage.length > 0){
        console.log('nextPage: ', nextPage);
        setTimeout(() => {
            download(nextPage, ++index);
        }, 10000);
    }else{
        console.log('done');
        finishDownloadingCallback(apartments);
    }
}

module.exports.download = download;
module.exports.init = initCallback;
