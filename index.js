var express = require('express');
var fs = require('fs');
var http = require('http');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var app = express();
var iconv = require('iconv-lite')

var url = 'http://www.yad2.co.il/Nadlan/rent.php?City=%FA%EC+%E0%E1%E9%E1+%E9%F4%E5&Neighborhood=&HomeTypeID=&fromRooms=2&untilRooms=4&fromPrice=&untilPrice=&PriceType=1&FromFloor=&ToFloor=&EnterDate=&Info=';

// app.get('/scrape', (req, res) =>{
  // var jar = request.jar();
  // request({ url: url, jar: jar }, (error, response, html) =>{
  //   if(error){
  //       console.error(error);
  //       return;
  //   }


    var src = '';
    http.get(url, (res) =>{
        res.on('data', (chunk) =>{
            src += iconv.decode(new Buffer(chunk), 'Windows-1255');
        });

        res.on('end', ()=>{
            fs.writeFile('source3.txt', src);
        });
    });

    // console.log('cookies:', jar.getCookieString(url));
    // console.log('status', response.statusCode);
    // console.log('headers', response.headers);
    // fs.writeFile('source.txt', html);
    // fs.writeFile('source.txt', iconv.decode(new Buffer(html), 'Windows-1255'));
  // });

  // res.end();
// });
//
// app.listen(5000);
// console.log('listening on port: ', 5000);
