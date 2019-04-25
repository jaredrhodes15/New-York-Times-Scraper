var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

function scrapeCompare(scrapeData) {
  console.log("articles in Scrap" + scrapeData);
  db.Article.find({ title: { $in: [scrapeData.title] } })
    .then(function(dbArticle) {
      console.log("find statment resutls" + dbArticle);
      return dbArticle;
    })
    .catch(function(err) {
      console.log(err);
    });
}

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/scrape", function(req, res) {
    axios.get("https://www.kenpom.com/").then(function(response) {
      var scrapeData = {
        data: []
      };

      var $ = cheerio.load(response.data);
      $("tr").each(function() {
        var result = {};
        result.title = $(this)
          .children("td.hard_left")
          .text();
        result.link = $(this)
          .children("td.next_left")
          .text();
        result.link = $(this)
          .children("td.next_left")
          .attr("href");

        scrapeData.data.push(result);
      });
      //testing a compare funtion.
      var compare = scrapeCompare(scrapeData.data);
      console.log("compare Var" + compare);
      res.render("scrape", scrapeData);
    });
  });

  app.get("/favorites", function(req, res) {
    db.Article.find()
      .sort({ _id: -1 })
      .then(function(dbArticle) {
        hbsObject = {
          data: dbArticle
        };
        res.render("favorites", hbsObject);
      });
  });
};
