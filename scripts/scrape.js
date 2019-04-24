var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {

    request("https://www.kenpom.com", function(err, res, body){

        var $ = cheerio.load(body);

        var articles = []

        $("#hard_left").each(function(i, element){

            var head = $(this).children("hard_left").text().trim();
            var sum = $(this).children("next_left").text().trim();

            if(head && sum){
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                
                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };

                articles.push(dataToAdd);
            }
        });
        cb(articles);
    });
}

module.exports = scrape;