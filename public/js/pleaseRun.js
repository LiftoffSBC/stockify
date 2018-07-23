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
  refreshExamples = function() {
    API.getExamples().then(function() {
    });
  }
var handleFormSubmit = function (event) {
  event.preventDefault();

  var userSymbol = $("#userSymbol")
    .val()
    .trim();
    if (userSymbol ==="") {
      alert("You must enter stock symbol");
    }
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
      // post the data to the DB

      $.post("/api/stocks", stockinfo, function(data){
        console.log(data);
        // Get reference to existing tbody element, create a new table row element
        var symbol = $("<tr>").text(stockinfo.symbol);
        var companyName = $("<tr>").text(stockinfo.companyName);
        var high = $("<tr>").text(stockinfo.high);
        var low = $("<tr>").text(stockinfo.low);
        var latestPrice = $("<tr>").text(stockinfo.latestPrice);
        var tBtn = $("<button>");
        tBtn.attr("data-id", data.id);
        tBtn.attr("action", "handleDeleteBtnClick");
        tBtn.attr("class", "del");
        var tRow = $("<tr>");
        if ($("#dropdown").val() == 1) {
          console.log("hello");
          // option for the owned stocks
          tRow.append(symbol, companyName, high, low, latestPrice, tBtn);
          $("#column1").append(tRow);
        } else {
          ($("#dropdown").val() == 2)
          console.log("goodbye")
          // option for the interested stocks
          tRow.append(symbol, companyName, high, low, latestPrice, tBtn);
          $("#column2").append(tRow);
        }
      });
    }
    API.saveExample(stockinfo).then(function(data) {
      createRow(data);
      refreshExamples();
    })
  })
}

var handleDeleteBtnClick = function() {
  var Delete = $(this).data().id;
  $.ajax({
    url: "/api/stocks/" + Delete,
    method: "DELETE"
  }).then(function(data) {
    console.log(data);
    refreshExamples();
    console.log("stocks Deleted");
    console.log($(this).data().id);
    var data = document.getElementById("data-id");
data.stockinfo.removeChild(data);
   
  });
};
// handleDeleteBtnClick is called when an example's delete button is
$("#button").on("click", handleFormSubmit);

$(document).on("click", ".del", handleDeleteBtnClick);