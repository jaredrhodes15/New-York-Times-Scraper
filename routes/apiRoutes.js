const db = require("../models");

module.exports = function(app) {
  app.get("/api/articles", function(req, res) {
    db.Article.find({}).then(function(dbArticle) {
      hbsObject = {
        data: dbArticle
      };
      res.json(hbsObject);
    });
  });

  app.get("/api/articles/:id", function(req, res) {
    db.Article.findById(req.params.id)
      .then(function(dbArticle) {
        hbsObject = {
          data: [dbArticle]
        };
        res.json("favorties", hbsObject);
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  app.put("/api/articles/", function(req, res) {
    db.Article.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          title: req.body.title,
          link: req.body.link
        }
      }
    )
      .then(function(dbArticle) {
        res.render("favorites", dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
      });
  });

  app.post("/api/articles", function(req, res) {
    db.Article.create(req.body)
      .then(function(dbArticle) {
        hbsObject = {
          data: [dbArticle]
        };
        res.send(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
      });
  });
  app.delete("/api/articles/:id", function(req, res) {
    var id = req.params.id;

    db.Notes.deleteMany({ article: id })
      .then(function() {
        db.Article.findByIdAndDelete(id)
          .then(function(dbArticle) {
            hbsObject = {
              data: [dbArticle]
            };
            res.render("index", dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      })
      .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
      });
  });

  app.post("/api/notes/:id", function(req, res) {
    var newNote = {
      text: req.body.text,
      article: req.params.id
    };
    db.Notes.create(newNote)
      .then(function(dbArticle) {
        hbsObject = {
          data: [dbArticle]
        };
        res.send(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
      });
  });

  app.get("/api/notes/:id", function(req, res) {
    db.Notes.find({ article: req.params.id })
      .then(function(dbNotes) {
        hbsObject = {
          layout: false,
          notesData: dbNotes,
          articleId: req.params.id
        };
        console.log(hbsObject);
        res.render("partials/notes", hbsObject);
      })
      .catch(function(err) {
        console.log(err);
      });
  });
  app.delete("/api/notes/:id", function(req, res) {
    var id = req.params.id;

    db.Notes.findByIdAndDelete(id)
      .then(function(dbNotes) {
        res.json(dbNotes);
      })
      .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
      });
  });
};
