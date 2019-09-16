const apiCall = () => {
  const request = new Request(
    "https://api.bitbay.net/rest/trading/ticker/ALG-BTC",
    {
      method: "GET",
      headers: { "content-type": "application/json" }
    }
  );

  fetch(request)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Something went wrong on api server!");
      }
    })
    .then(response => {
      console.log(response);
      createElement(
        "Kod marketu: " +
          response.ticker.market.code +
          "<br>" +
          "Highest bid: " +
          response.ticker.highestBid +
          "<br>Lowest ask: " +
          response.ticker.lowestAsk
      );
    })
    .catch(error => {
      console.error(error);
    });
};

const createElement = value => {
  $("#values").html(`${value}`);
};

const apiRefresh = () => {
  setInterval(function() {
    apiCall();
  }, 1000);
};

apiCall();
apiRefresh();
