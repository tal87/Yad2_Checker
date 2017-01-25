var express = require('express');
var reader = require('./reader.js');
var app = express();
reader.data((apts) =>{
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
