var cheerio = require('cheerio');
var fs = require('fs');

fs.readFile('source2.txt', { encoding: 'utf8', flag: 'r' }, (err, html) => {
    var apts = [];
    var $ = cheerio.load(html);
    console.log('first row');
    // console.log($('.main_table tr:not(:first-child) td:nth-child(11)').text());
    $('.main_table tr:not(:first-child)').each((i, elem) =>{
        // apts.push({ Price: parseFloat($(this + ' td:nth-child(11)').text()), Rooms: $(this + ' td:nth-child(13)').text() });
        apts.push({ Price: parseFloat($(elem).find('td:nth-child(11)').text()) });
        // console.log($(elem).find('td:nth-child(11)').text());
    });
    //  console.log($('.main_table tr:not(:first-child) td:nth-child(11)').text());


    console.log(apts);
});
