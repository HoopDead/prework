var start = Date.now();
var hour = Date.now() - 86400000;
let marketCode = [
  "BTC-USD",
  "ETH-USD",
  "LSK-USD",
  "LTC-USD",
  "GAME-USD",
  "DASH-USD"
];

let requests = marketCode.map(name =>
  fetch(
    `https://api.bitbay.net/rest/trading/candle/history/${name}/900?from=${hour}&to=${start}`
  )
);

Promise.all(requests)
  .then(responses => {
    // all responses are resolved successfully
    return responses;
  })
  // map array of responses into array of response.json() to read their content
  .then(responses => Promise.all(responses.map(r => r.json())))
  // all JSON answers are parsed: "users" is the array of them
  .then(markets => markets.forEach(market => findValues(market.items)));

function findValues(arr) {
  let minLowest = arr[0][1].l,
    maxHighest = arr[0][1].h;

  for (let i = 1, len = arr.length; i < len; i++) {
    let v = arr[i][1];
    minLowest = v.l < minLowest ? v.l : minLowest;
    let x = arr[i][1];
    maxHighest = x.h >= maxHighest ? x.h : maxHighest;
  }

  createElement(
    "Maksymalna wartosc: " +
      [maxHighest] +
      "$" +
      "<br>Minimalna wartosc: " +
      [minLowest] +
      "$" +
      "<br><br>"
  );
}

const createElement = value => {
  $("#values").append(`${value}`);
};
