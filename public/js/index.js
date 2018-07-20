var API = {
  saveExample: function(stockinfo) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/stocks",
      data: JSON.stringify(stockinfo)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/stocks",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/stocks/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function() {
    var createRow = function(stockinfo) {
      // Get reference to existing tbody element, create a new table row element
      var symbol = $("<td>").text(stockinfo.symbol);
      var companyName = $("<td>").text(stockinfo.companyName);
      var high = $("<td>").text(stockinfo.high);
      var low = $("<td>").text(stockinfo.low);
      var latestPrice = $("<td>").text(stockinfo.latestPrice);

      if ($("#dropdown" === "#option1")) {
        var tBody = $("#column1");
        var tRow = $("<tr>");
        tRow.append(symbol, companyName, high, low, latestPrice);
        tBody.append(tRow);
      } else if ($("#dropdown" === "#option2")) {
        var tBody = $("#column2");
        var tRow = $("<tr>");
        tRow.append(symbol, companyName, high, low, latestPrice);
        tBody.append(tRow);
      }
    };
    createRow();
  });
};

var handleFormSubmit = function(event) {
  event.preventDefault();

  var userSymbol = $("#userSymbol")
    .val()
    .trim();
  console.log(userSymbol);
  var queryURL =
    "https://ws-api.iextrading.com/1.0/stock/" + userSymbol + "/quote";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var stockinfo = {
      symbol: response.symbol,
      companyName: response.companyName,
      high: response.high,
      low: response.low,
      latestPrice: response.latestPrice
    };
    console.log(stockinfo);

    API.saveExample(stockinfo).then(function() {
      refreshExamples();
    });
  });
};

if (!userSymbol.text) {
  alert("You must enter stock symbol!");
  return;
}
var handleDeleteBtnClick = function() {
  var idDelete = $(this).data.id;
  API.deleteExample(idDelete).then(function() {
    refreshExamples();
    console.log("stock Deleted", idDelete);
  });
};
// handleDeleteBtnClick is called when an example's delete button is
$("#button").on("click", handleFormSubmit);
$("#deleteButton").on("click", handleDeleteBtnClick);
