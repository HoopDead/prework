const apiCall = () => {
  const request = new Request(
    "https://api.bitbay.net/rest/trading/orderbook/BTC-USD",
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
      createElement(
        "Kod marketu: BTC-USD" +
          "<br>" +
          "Best sell offer: " +
          response.sell[0].ra +
          "$" +
          "<br>Best buy offer: " +
          response.buy[0].ra +
          "$"
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
