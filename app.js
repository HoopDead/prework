let currencies = ["LML-BTC", "LTC-USD", "BSV-EUR"];

let requests = currencies.map(request =>
  fetch(`https://api.bitbay.net/rest/trading/ticker/${request}`)
);

Promise.all(requests)
  .then(responses => {
    return responses;
  })
  .then(responses => Promise.all(responses.map(callback => callback.json())))
  .then(currencies =>
    currencies.forEach(request =>
      createCard(
        "Kod marketu: " +
          request.ticker.market.code +
          "<br>(" +
          request.ticker.market.first.currency +
          ") Min Offer: " +
          request.ticker.market.first.minOffer +
          "<br>( " +
          request.ticker.market.second.currency +
          ") Min Offer: " +
          request.ticker.market.second.minOffer +
          "<br>Highest bid: " +
          request.ticker.highestBid
      )
    )
  );

const createCard = value => {
  $(`<p>${value}</p>`).appendTo(document.body);
};
