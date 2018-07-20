var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.stocks.findAll({}).then(function(dbstocks) {
      res.render("index", {
        msg: "Welcome!",
        stocks: dbstocks
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.stocks
      .findOne({ where: { id: req.params.id } })
      .then(function(dbstocks) {
        res.render("stocks", {
          stocks: dbstocks
        });
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
