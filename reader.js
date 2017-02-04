var cheerio = require('cheerio');
var fs = require('fs');

function takeAfter(str, takeAfterStr){
    var idx = str.indexOf(takeAfterStr);
    return str.substring(idx + takeAfterStr.length);
}

function getData(src_file, callback){
    fs.readFile(src_file, { encoding: 'utf8', flag: 'r' }, (err, html) => {
        var apts = [];
        var $ = cheerio.load(html);
        var next = $('a.next').attr('href');
        // console.log('next page:', next);
        $('.main_table tr.yellow').each((i, elem) =>{
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
    });
}

module.exports.data = getData;
