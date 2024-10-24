exports.handler = async function(event, context) {
    try {
      const { default: fetch } = await import('node-fetch');
  
      const response = await fetch('https://interface.carv.io/explorer/reward_history?addr=0x98d6f0938ab1fDb858d4a77e26aab91a9d308EE2&page_size=1000');
      const data = await response.json();
      const rewardList = data.data.reward_list;
      let totalNodeRewards = 0;
      for(i=0;i<data.data.reward_list.length;i++){
      totalNodeRewards += +data.data.reward_list[i].amount;}
      const perDay = totalNodeRewards/(data.data.reward_list.length/2);
      return {
        statusCode: 200,
        body: JSON.stringify({'history':data.data.reward_list,'average':perDay}),
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
  