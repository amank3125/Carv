const cryptoRankAPI = 'https://api.cryptorank.io/v0/coins/prices?keys=carv&currency=USD';
const coingeckoAPI = 'https://api.coingecko.com/api/v3/coins/carv';
const kucoinAPI = 'https://www.kucoin.com/_api/quicksilver/currency-detail/symbols/price/info?lang=en_US&symbol=CARV-USDT';
const cmcAPI = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=carv&convert=USD';
const icodropsAPI = '';
const carvInfo = document.querySelector('.carvInfo');



fetch('/.netlify/functions/token-prices')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    percentChange24 = data.data.CARV.quote.USD.percent_change_24h;
    carvInfo.innerHTML+=`<p>$CARV Price = ${data.data.CARV.quote.USD.price}</p></br>`;
        if (percentChange24>0){
        carvInfo.innerHTML+=`<span style="background-color:#0d3b2d;color:var(--green);border-radius:50px;padding:5px 10px 5px 10px;font-weight:400;font-size:14px">${percentChange24}</span>`;
        } else {
        carvInfo.innerHTML+=`<span style="background-color:var(--darkred);color:var(--red);border-radius:50px;padding:5px 10px 5px 10px;font-weight:400;font-size:14px">${percentChange24}</span>`;
        }   
  })
  .catch(error => {
    console.error('Error fetching token prices:', error);
  });
