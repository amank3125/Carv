fetchBtn.addEventListener('click',  () => {
console.clear();
const walletAdd = walletAddress.value.trim();
    if (!walletAdd) {
      callError('Please enter a valid wallet address');
      return;
    } else if (regex.test(walletAdd)) {
        fetchDataNew()
    }
 else {
  callError('Invalid wallet address!')
}})



function fetchDataNew() {
    callLoaders();
    const walletAdd = walletAddress.value.trim();
    licenses = 0;
    fetch(`https://interface.carv.io/explorer/vecarv_infos?wallet_address=${walletAdd}`).then(resp=>resp.json()).then(data=>{
        licenses = data.data.claim_params.token_ids;
        if(!licenses){
            callError('No License found for this wallet');
        } else {
        tokenId.innerHTML = data.data.claim_params.token_ids[0];
        totalRewards.textContent = Number(data.data.total_rewards).toFixed(2)+" veCARV";
        balancevecarv.textContent = Number(data.data.balance).toFixed(2)+" veCARV"
        unclaimedvecarv.textContent = Number(data.data.unclaimed_rewards).toFixed(2)+" veCARV"
}}).catch(err=>console.log(err));

fetch(`https://interface.carv.io/explorer/delegation?wallet_addr=${walletAdd}&page_size=2000`).then(resp=>resp.json()).then(data=>{
    if(!licenses){} else {
    delegateAddress = data.data.license.delegation_infos[0].delegate_to;
    const filteredVerifier = data.data.verifier_list.filter(verifier => verifier.address.toLowerCase() === delegateAddress.toLowerCase());
    nodeAddress.textContent=delegateAddress.slice(0, 4) + '...' + delegateAddress.slice(-4);
    nodeStatus.textContent=filteredVerifier[0].status;
    votingPower.textContent=filteredVerifier[0].voting_power;
    receivedDelegations.textContent=filteredVerifier[0].received_delegations;
    nodeCommission.textContent=filteredVerifier[0].commission;
    nodeUptimeRate.textContent=filteredVerifier[0].uptime_rate;
    (function() { // styling
        if(filteredVerifier[0].status=="active"){
            nodeStatus.classList.remove('hidden');
            nodeStatus.style = `border: 1px solid var(--green);background-color:#0d3b2d;color: var(--green);`
            } else {
            nodeStatus.classList.remove('hidden');
            nodeStatus.style = `border: 1px solid var(--red);background-color:var(--darkred);color: var(--red);`
            }
    })();

    (function() {  //set delegate address to tooltip
        delegateTo.textContent=delegateAddress.slice(0, 4) + '...' + delegateAddress.slice(-4);
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
      })
})();
}}).catch(err=>console.log('delegate '+err));
}
  