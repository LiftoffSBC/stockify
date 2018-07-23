var API = {
    saveExample: function (response) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/stocks",
        data: JSON.stringify(response)
      });
    },
    getExamples: function (stockinfo) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        url: "api/stocks",
        type: "GET",
        data: stockinfo

      });
    },
    deleteExample: function (id) {
      return $.ajax({
        url: "api/stocks/" + id,
        type: "DELETE"
      });
    }
  },

  // refreshExamples gets new examples from the db and repopulates the list
  refreshExamples = function () {
    API.getExamples().then(function () {
      if (!userSymbol.text) {
        alert("You must enter stock symbol!");
      }


    });
  }
var handleFormSubmit = function (event) {
  event.preventDefault();

  var userSymbol = $("#userSymbol")
    .val()
    .trim();
  console.log(userSymbol);
  var queryURL =
    "https://ws-api.iextrading.com/1.0/stock/" + userSymbol + "/quote";
  $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var stockinfo = {
      symbol: response.symbol,
      companyName: response.companyName,
      high: response.high,
      low: response.low,
      latestPrice: response.latestPrice
    }
    console.log(stockinfo);

    var createRow = function () {
      // Get reference to existing tbody element, create a new table row element
      var symbol = $("<tr>").text(stockinfo.symbol);
      var companyName = $("<tr>").text(stockinfo.companyName);
      var high = $("<tr>").text(stockinfo.high);
      var low = $("<tr>").text(stockinfo.low);
      var latestPrice = $("<tr>").text(stockinfo.latestPrice);
      var tRow = $("<tr>");
      if ($("#dropdown").val() == 1) {
        console.log("hello");
        // option for the owned stocks
        tRow.append(symbol, companyName, high, low, latestPrice);
        $("#column1").append(tRow);
      } else {
        ($("#dropdown").val() == 2)
        console.log("goodbye")
        // option for the interested stocks
        tRow.append(symbol, companyName, high, low, latestPrice);
        $("#column2").append(tRow);
      }
    }
    API.saveExample(stockinfo).then(function () {
      createRow();
      refreshExamples();
    })
  })
}




var handleDeleteBtnClick = function () {
  var Delete = $(this).data.id;
  API.deleteExample(Delete).then(function () {
    refreshExamples();
    console.log("stocks Deleted");
    console.log(Delete);
  });
};
// handleDeleteBtnClick is called when an example's delete button is
$("#button").on("click", handleFormSubmit);

$("#deleteButton").on("click", handleDeleteBtnClick);