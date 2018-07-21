var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/stocks", function(req, res) {
    db.stocks.findAll({}).then(function(dbstocks) {
      res.json(dbstocks);
    });
  });

  // Create a new example
  app.post("/api/stocks", function(req, res) {
    db.stocks.create(req.body).then(function(dbstocks) {
      res.json(dbstocks);
    });
  });

  // Delete an example by id
  app.delete("/api/stocks/:id", function(req, res) {
    db.stocks
      .destroy({ where: { id: req.params.id } })
      .then(function(dbstocks) {
        res.json(dbstocks);
      });
  });
};
