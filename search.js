var hebrewCoder = require('./hebrew_coder.js');
function Search(minRooms, maxRooms, minPrice, maxPrice, city) {
    this.city = city;
    this.minR = minRooms;
    this.maxR = maxRooms;
    this.minP = minPrice;
    this.maxP = maxPrice;
    this.getUrl = function(){
        return '/Nadlan/rent.php?City=' + hebrewCoder.codeUrl(this.city) + '&Neighborhood=&HomeTypeID=&fromRooms=' + this.minR + '&untilRooms=' + this.maxR + '&fromPrice=' + this.minP + '&untilPrice=' + this.maxP + '&PriceType=1&FromFloor=&ToFloor=&EnterDate=&Info='
    }
}
