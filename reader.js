var cheerio = require('cheerio');
var fs = require('fs');

function takeAfter(str, takeAfterStr){
    var idx = str.indexOf(takeAfterStr);
    return str.substring(idx + takeAfterStr.length);
}

function getData(html, callback){
    var apts = [];
    var $ = cheerio.load(html);
    // console.log('next page:', next);
    $('.main_table tr.showPopupUnder').each((i, elem) =>{
        var priceTd = $(elem).find('td:nth-child(11)').text().trim();
        var spaceIdx = priceTd.indexOf(' ');
        var apt = {
                    Price: parseFloat(priceTd.substr(0, spaceIdx).replace(/,/g, '')),
                    Rooms: parseInt($(elem).find('td:nth-child(13)').text()),
                    Name: $(elem).find('td:nth-child(9)').text().trim(),
                    id: takeAfter($(elem).find('td:nth-child(11)').attr('onclick'), 'NadlanID\',\'').substr(0, 7)
                  };

        apt.url = 'http://www.yad2.co.il/Nadlan/rent_info.php?NadlanID=' + apt.id;
        apts.push(apt);
    });

    callback(apts);
}

function paging(src){
    // console.log('source:', src)
    var $ = cheerio.load(src);
    var a = $('div.next').find('a').attr('href');
    if(a != undefined){
        return a;
    }else{
        return '';
    }
}

module.exports.paging = paging;
module.exports.data = getData;
