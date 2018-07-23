$(document).ready(function () {
    var queryURL =
        "https://ws-api.iextrading.com/1.0/stock/market/list/mostactive";
    $.ajax({
        headers: {
            "Content-Type": "application/json"
        },
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var banner = "";
        for (i = 0; i < response.length; i++) {
            banner += response[i].symbol + ":" + response[i].latestPrice + " | "
        }
        $("#marquee").text(banner)
        console.log(response)
    })

})