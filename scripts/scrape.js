var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {

    request("http://www.wsj.com", function(err, res, body){

        var $ = cheerio.load(body);

        var articles = []

        $(".wsj-headline").each(function(i, element){

            var head = $(this).children(".wsj-headline-link").text().trim();
            var sum = $(this).children("BLAHBLAH").text().trim();

            if(head && sum){
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                
                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };

                articles.phsh(dataToAdd);
            }
        });
        cb(articles);
    });
}

module.exports = scrape;