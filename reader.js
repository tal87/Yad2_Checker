var cheerio = require('cheerio');
var fs = require('fs');

fs.readFile('source2.txt', { encoding: 'utf8', flag: 'r' }, (err, html) => {
    var apts = [];
    var $ = cheerio.load(html);
    console.log('first row');
    $('.main_table tr.yellow').each((i, elem) =>{
        var priceTd = $(elem).find('td:nth-child(11)').text().trim();
        var spaceIdx = priceTd.indexOf(' ');
        apts.push({ Price: parseFloat(priceTd.substr(0, spaceIdx).replace(/,/g, '')), Rooms: parseInt($(elem).find('td:nth-child(13)').text()) });
    });

    console.log(apts);
});
