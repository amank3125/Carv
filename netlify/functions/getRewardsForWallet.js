exports.handler = async function(event, context) {
  const addr = event.queryStringParameters && event.queryStringParameters.addr;

    try {
      const { default: fetch } = await import('node-fetch');
      const response = await fetch(`https://interface.carv.io/explorer/reward_history?addr=${encodeURIComponent(addr)}&page_size=1000`);
      const data = await response.json();
      let rewardsArray = [];
      for(i=0;i<data.data.reward_list.length;i++){
        if(data.data.reward_list[i].source_typ=='Node Rewards'){
          rewardsArray.push(data.data.reward_list[i]);
        } else {
          continue;
        }
      }
      return {
        statusCode: 200,
        body: JSON.stringify({'address':addr,'history':rewardsArray,'average':0 //perday
          }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    } catch (err) {
      console.error('Error fetching data:', err);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch data' }),
      };
    }
  };
  