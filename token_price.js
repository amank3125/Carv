const cryptoRankAPI = 'https://api.cryptorank.io/v0/coins/prices?keys=carv&currency=USD';
const coingeckoAPI = 'https://api.coingecko.com/api/v3/coins/carv';
const kucoinAPI = 'https://www.kucoin.com/_api/quicksilver/currency-detail/symbols/price/info?lang=en_US&symbol=CARV-USDT';
const cmcAPI = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=carv&convert=USD';
const icodropsAPI = '';


fetch('/.netlify/functions/token-prices')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log(data.data.CARV.quote.USD.price);
  })
  .catch(error => {
    console.error('Error fetching token prices:', error);
  });
