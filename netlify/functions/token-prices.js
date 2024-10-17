const fetch = require('node-fetch');  // Import fetch for server-side API requests

exports.handler = function(event, context) {
  const cmcKey = process.env.cmcKey;  

  // Make the request to CoinMarketCap API
  return fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=carv&convert=USD', {
    headers: {
      'X-CMC_PRO_API_KEY': cmcKey,
    },
  })
    .then(response => response.json())
    .then(data => {
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    })
    .catch(error => {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch token prices' }),
      };
    });
};
