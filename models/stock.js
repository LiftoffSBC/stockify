module.exports = function(sequelize, DataTypes) {
  var stock = sequelize.define("stock", {
    symbol: DataTypes.STRING,
    CompanyName: DataTypes.STRING,
    high: DataTypes.INTEGER,
    low: DataTypes.INTEGER,
    latestPrice: DataTypes.INTEGER
  });
  return stock;
};
