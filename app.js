const walletAddressInput = document.getElementById('walletAddress');
const fetchBtn = document.getElementById('fetch-btn');
const resultContainer = document.getElementById('resultContainer');
const tokenIdSpan = document.getElementById('token_id');
const delegateToSpan = document.getElementById('delegate_to');
const totalRewardsSpan = document.getElementById('total_rewards');
const statusSpan = document.getElementById('status');
const uptimeRateSpan = document.getElementById('uptime_rate');

fetchBtn.addEventListener('click', async () => {
    const walletAddress = walletAddressInput.value.trim();
    if (!walletAddress) {
      alert('Please enter a wallet address');
      return;
    }
  
    try {
      const response = await fetch(`https://interface.carv.io/explorer_alphanet/client_info?wallet_addr=${walletAddress}`);
      const data = await response.json();
      console.log(data);
  
      tokenIdSpan.innerHTML = `Token ID: ${data.token_id}`;
      delegateToSpan.textContent = `Delegate To: ${data.delegate_to}`;
      totalRewardsSpan.textContent = `Total Rewards: ${data.total_rewards}`;
      statusSpan.textContent = `Status: ${data.status}`;
      uptimeRateSpan.textContent = `Uptime Rate: ${data.uptime_rate}`;
  
      resultContainer.style.display = 'block';
    } catch (error) {
      console.error(error);
      alert('Error fetching data');
    }
  });