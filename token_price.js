const cryptoRankAPI = 'https://api.cryptorank.io/v0/coins/prices?keys=carv&currency=USD';
const coingeckoAPI = 'https://api.coingecko.com/api/v3/coins/carv';
const kucoinAPI = 'https://www.kucoin.com/_api/quicksilver/currency-detail/symbols/price/info?lang=en_US&symbol=CARV-USDT';
const cmcAPI = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=carv&convert=USD';
const icodropsAPI = '';
const carvInfo = document.querySelector('.carvInfo');
const tokenStats = document.querySelector('.tokenStats');

const tokenPrice = document.querySelector('.tokenPrice');
const percentChange = document.querySelector('.percentChange');



fetch('/.netlify/functions/token-prices')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let percentChange24 = data.data.CARV.quote.USD.percent_change_24h.toFixed(2);
    let volumeChange24 = data.data.CARV.quote.USD.volume_change_24h.toFixed(2);
    carvPrice = data.data.CARV.quote.USD.price.toFixed(2);
    tokenPrice.innerHTML+=`CARV $${carvPrice}`;

    const volumeSymbol = volumeChange24 > 0 ? '▲' : '▼';
    const volumeColor = volumeChange24 > 0 ? 'var(--green)' : 'var(--red)';

// stats style 1 
// tokenStats.innerHTML = `
//   <div style="display: inline;">
//     <p style="display: inline;">Volume (24h): $${(data.data.CARV.quote.USD.volume_24h / 1000000).toFixed(2)} M</p>
//     <span class="volChange24" style="display: inline; color: ${volumeColor}; padding: 5px 10px; font-weight: 400; font-size: 14px;">
//       ${volumeSymbol} ${volumeChange24}%
//     </span>
//   </div>
//   <p>FDV: $${(data.data.CARV.quote.USD.fully_diluted_market_cap / 1000000).toFixed(2)}M</p>
//   <p>Circulating Supply: ${data.data.CARV.self_reported_circulating_supply / 1000000}M CARV</p>
//   <p>Max Supply: ${data.data.CARV.max_supply / 1000000000}B CARV</p>
//   <p>Chain: ${data.data.CARV.platform.name}</p>
// `;

// stats style 2
tokenStats.innerHTML = `
  <div class="card" style="display: inline;"><p class="cardLabel">Volume (24h) <p class="cardValue">$${(data.data.CARV.quote.USD.volume_24h / 1000000).toFixed(2)} M</p>
    <span class="volChange24" color: ${volumeColor}; padding: 5px 10px; font-weight: 400; font-size: 14px;">
      ${volumeSymbol}${volumeChange24}%
    </span></div>
    <div class="card"><p class="cardLabel">FDV <p class="cardValue">$${(data.data.CARV.quote.USD.fully_diluted_market_cap / 1000000).toFixed(2)}M</p></p></div>
    <div class="card"><p class="cardLabel">Circulating Supply<p class="cardValue">${data.data.CARV.self_reported_circulating_supply / 1000000}M CARV</p></p></div>
    <div class="card"><p class="cardLabel">Max Supply<p class="cardValue">${data.data.CARV.max_supply / 1000000000}B CARV</p></div>
    <div class="card"><p class="cardLabel">Chain<p class="cardValue">${data.data.CARV.platform.name}</p></p></div>`;
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
        // if (volumeChange24>0){
        //   volChange24.insertAdjacentHTML('beforeBegin',"▲");
        //   volChange24.style = 'display:inline;color:var(--green);padding:5px 10px 5px 10px;font-weight:400;font-size:14px;';
        // } else {
        //   volChange24.insertAdjacentHTML('beforeBegin',"▼");
        //   volChange24.style = 'display:inline;color:var(--red);padding:5px 10px 5px 10px;font-weight:400;font-size:14px;';
        // }
  })
  .catch(error => {
    console.error('Error fetching token prices:', error);
  });
