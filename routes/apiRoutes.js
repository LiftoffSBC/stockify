var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/stocks", function(req, res) {
    db.stock.findAll({}).then(function(dbstock) {
      res.json(dbstock);
    });
  });

  // Create a new example
  app.post("/api/stocks", function(req, res) {
    db.stock.create(req.body.stockinfo).then(function(dbstock) {
      res.json(dbstock);
    });
  });

  // Delete an example by id
  app.post("/api/stocks/delete/:id", function(req, res) {
    db.stock
      .destroy({
        where: { id: req.params.id }
      })
      .then(function(dbstock) {
        res.json(dbstock);
      });
  });
};
