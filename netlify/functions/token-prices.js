exports.handler = async function(event, context) {
    const fetch = (await import('node-fetch')).default;  // Use dynamic import
    
    const cmcKey = process.env.cmcKey;
  
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