"use strict";
module.exports = function(sequelize, DataTypes) {
  var stocks = sequelize.define("stocks", {
    symbol: DataTypes.STRING,
    CompanyName: DataTypes.STRING,
    high: DataTypes.INTEGER,
    low: DataTypes.INTEGER,
    latestPrice: DataTypes.INTEGER
  },
  {
    timestamps: false
  });
  return stocks;
};
