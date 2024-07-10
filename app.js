const walletAddress = document.querySelector('.walletAddress');
const fetchBtn = document.querySelector('.fetch-btn');
const resultContainer = document.querySelector('.resultContainer');
const tokenId = document.querySelector('.token_id');
const delegateTo = document.querySelector('.delegate_to');
const totalRewards = document.querySelector('.total_rewards');
const statusSpan = document.querySelector('.status');
const uptimeRate = document.querySelector('.uptime_rate');
const nodeAddress = document.querySelector('.nodeAddress');
const nodeStatus = document.querySelector('.nodeStatus');
const votingPower = document.querySelector('.votingPower');
const receivedDelegations = document.querySelector('.receivedDelegations');
const nodeCommission = document.querySelector('.nodeCommission');
const nodeUptimeRate = document.querySelector('.nodeUptimeRate');

fetchBtn.addEventListener('click',  () => {
    const walletAdd = walletAddress.value.trim();
    if (!walletAdd) {
      alert('Please enter a wallet address');
      return;
    }

      fetch(`https://interface.carv.io/explorer_alphanet/client_info?wallet_addr=${walletAdd}`)
      .then(resp=>resp.json())
      .then(data=>{
        if(data.data.delegation_infos==null){
          delegateTo.textContent = "self";
          tokenId.innerHTML = "none";
          totalRewards.textContent = data.data.total_rewards+" veCARV";
          statusSpan.textContent = data.data.status;
          uptimeRate.textContent = data.data.uptime_rate;
        } else {
          delegateAddress=data.data.delegation_infos[0].delegate_to;
          tokenId.innerHTML = data.data.delegation_infos[0].token_id;
          delegateTo.textContent = delegateAddress.slice(0, 4) + '...' + delegateAddress.slice(-4);
          totalRewards.textContent = data.data.total_rewards+" veCARV";
          statusSpan.textContent = data.data.status;
          uptimeRate.textContent = data.data.uptime_rate;
          delegateTo.addEventListener('mouseenter', function() {
            delegateTo.setAttribute('title', delegateAddress); // Set full text as tooltip
          });
          delegateTo.addEventListener('mouseleave', function() {
            delegateTo.removeAttribute('title'); // Set full text as tooltip
          });
          delegateTo.addEventListener('copy', function(event) {
            // Prevent default copy behavior
            event.preventDefault();
            // Copy full text to clipboard
            const fullTextToCopy = delegateTo.getAttribute('data-fulltext');
            if (window.clipboardData) {
              window.clipboardData.setData('Text', delegateAddress);
            } else {
              event.clipboardData.setData('text/plain', delegateAddress);
            }
          })}})
      .catch(err=>console.log(err))
      fetch(`https://interface.carv.io/explorer_alphanet/delegation?wallet_addr=${walletAdd}&page_size=3000`)
        .then(resp=>resp.json())
        .then(data=>{
          delegateAddress=data.data.license.delegation_infos[0].delegate_to;
          for(i=0;i<data.data.verifier_list.length;i++){
            if(delegateAddress==data.data.verifier_list[i].address){
              console.log(data.data.verifier_list[i]);
              nodeStatus.textContent=data.data.verifier_list[i].status;
              votingPower.textContent=data.data.verifier_list[i].voting_power;
              receivedDelegations.textContent=data.data.verifier_list[i].received_delegations;
              nodeCommission.textContent=data.data.verifier_list[i].commission;
              nodeUptimeRate.textContent=data.data.verifier_list[i].uptime_rate;
              break;
            }}
        })
        .catch(err=>console.log(err));
});

      


