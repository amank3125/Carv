const cryptoRankAPI = 'https://api.cryptorank.io/v0/coins/prices?keys=carv&currency=USD';
const coingeckoAPI = 'https://api.coingecko.com/api/v3/coins/carv';
const kucoinAPI = 'https://www.kucoin.com/_api/quicksilver/currency-detail/symbols/price/info?lang=en_US&symbol=CARV-USDT';
const cmcAPI = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=carv&convert=USD';
const icodropsAPI = '';
const carvInfo = document.querySelector('.carvInfo');
const tokenStats = document.querySelector('.tokenStats');

const tokenPrice = document.querySelector('.tokenPrice');
const percentChange = document.querySelector('.percentChange');
let carvPrice = 0;



fetch('/.netlify/functions/token-prices')
  .then(response => response.json())
  .then(data => {
    let percentChange24 = data.data.CARV.quote.USD.percent_change_24h.toFixed(2);
    let volumeChange24 = data.data.CARV.quote.USD.volume_change_24h.toFixed(2);
    carvPrice = data.data.CARV.quote.USD.price.toFixed(2);
    tokenPrice.innerHTML+=`CARV $${carvPrice}`;
    const volumeSymbol = volumeChange24 > 0 ? '▲' : '▼';
    const volumeColor = volumeChange24 > 0 ? 'var(--green)' : 'var(--red)';

tokenStats.innerHTML = `<div class="card"><p class="cardLabel">Volume (24h) <i class="fas fa-chart-line"></i></p><div style="display: flex; align-items: center; gap: 10px;"><p class="cardValue">$${(data.data.CARV.quote.USD.volume_24h / 1000000).toFixed(2)} M</p><span class="volChange24" style="color:${volumeColor};padding:5px 0px;font-weight:400;font-size:12px;">${volumeSymbol}${volumeChange24}%</span></div></div>
    <div class="card"><p class="cardLabel">FDV <i class="fas fa-dollar-sign"></i><p class="cardValue">$${(data.data.CARV.quote.USD.fully_diluted_market_cap / 1000000).toFixed(2)}M</p></p></div>
    <div class="card"><p class="cardLabel">Circulating Supply <i class="fas fa-water"></i><p class="cardValue">${data.data.CARV.self_reported_circulating_supply / 1000000}M CARV</p></p></div>
    <div class="card"><p class="cardLabel">Max Supply <i class="far fa-hand-paper"></i><p class="cardValue">${data.data.CARV.max_supply / 1000000000}B CARV</p></div>
    <div class="card"><p class="cardLabel">Chain <i class="fas fa-project-diagram"></i><p class="cardValue">${data.data.CARV.platform.name}</p></p></div>`;
    const volChange24 = document.querySelector('.volChange24');
        if (percentChange24>0){
          percentChange.innerHTML=`▲  ${percentChange24}% (24h)`;
          percentChange.classList.remove('red');
          percentChange.classList.add('green');
        } else {
          percentChange.innerHTML=`▼  ${percentChange24}% (24h)`;
          percentChange.classList.remove('green');
          percentChange.classList.add('red');
        }
  })
  .catch(error => {
    callError(error);
    carvInfo.innerHTML = `<div><p class="cardError"><i class="fa-solid fa-exclamation"></i></br>Error Loading data. Please try after some time.</p></div>`;
  });
  