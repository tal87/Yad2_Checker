var express = require('express');
var reader = require('./reader.js');
var downloader = require('./downloader.js');
var app = express();
var src_file = '';

downloader.download('http://www.yad2.co.il/Nadlan/rent.php?City=%F8%F2%F0%F0%E4&Neighborhood=&HomeTypeID=&fromRooms=&untilRooms=&fromPrice=&untilPrice=&PriceType=1&FromFloor=&ToFloor=&EnterDate=&Info=', (src) => {
    getData(src);
});

function getData(src){
    console.log('getting data');
    reader.data(src, (apts) => {
        app.get('/', (req, res) => {
            var str = '<html dir="rtl"><body><div style="display: flex; flex-direction: row; justify-content: center; align-item: center;"><table style="border-collapse: separate; border-spacing: 10px;">';
            for(var i = 0; i < apts.length; i++){
                str += '<tr>';
                str += '<td>' + apts[i].Name + '</td><td>' + apts[i].Price + '</td><td><a style="cursor: pointer;" href="' + apts[i].url + '" target="_blank">Link</a></td>';
                str += '</tr>';
            }

            str += '</div><body></html>';
            res.end(str);
        });

        app.listen(3000);
    });
}
