let marketCode = ['BTC-USD', 'ETH-USD', 'LSK-USD', 'LTC-USD', 'BCC-USD', 'DASH-USD'];

let requests = marketCode.map(name => fetch(`https://api.bitbay.net/rest/trading/stats/${name}`));

Promise.all(requests)
  .then(responses => {
    return responses;
  })
  // map array of responses into array of response.json() to read their content
  .then(responses => Promise.all(responses.map(r => r.json())))
  .then(markets => markets.forEach(market => createElement(market.stats.m, market.stats.h, market.stats.l)));

const createElement = (name, highestValue, lowestValue) =>
{
  $("#values").append("Nazwa: " + name + "<br>", 
  "Najwyższa wartość: " + highestValue + "<br>", 
  "Najniższa wartość: " + lowestValue + "<br>");
}