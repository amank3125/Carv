const walletAddress = document.querySelector('.walletAddress');
const carvPerDay = document.querySelector('.carvPerDay');
const fetchBtn = document.querySelector('.fetch-btn');
const wand = document.querySelector('.wand');
const wandDust = document.querySelector('.wandDust');
const resultContainer = document.querySelector('.resultContainer');
const tokenId = document.querySelector('.token_id');
const delegateTo = document.querySelector('.delegate_to');
const totalRewards = document.querySelector('.total_rewards');
const unclaimedvecarv = document.querySelector('.unclaimedvecarv');
const balancevecarv = document.querySelector('.balancevecarv');
const flexboxDiv = document.querySelector('.flexboxDiv');
const toggleChartArrow = document.querySelector('.toggleChartArrow');
const nodeAddress = document.querySelector('.nodeAddress');
const nodeStatus = document.querySelector('.nodeStatus');
const votingPower = document.querySelector('.votingPower');
const receivedDelegations = document.querySelector('.receivedDelegations');
const nodeCommission = document.querySelector('.nodeCommission');
const nodeUptimeRate = document.querySelector('.nodeUptimeRate');
const errorContainer = document.querySelector('.errorContainer');
const errorMsg = document.querySelector('.errorMsg');
const errorClose = document.querySelector('.errorClose');
const loaders1 = document.querySelectorAll('.loader1');
const loaders2 = document.querySelectorAll('.loader2');
const rewardHistoryMain = document.querySelector('.rewardHistoryMain');
const rewardHistory = document.querySelector('.rewardHistory');
const infoHeader = document.querySelector('.infoHeader');
const regex = /^(0x)?[0-9a-fA-F]{40}$/;
let veCARV=0;
let historyData;
let carvInWallet = 0;
const currentMonthNumber = new Date().getMonth() + 1;
const remainingDays = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate();
const getMonthShortName = (monthNumber) => new Date(0, monthNumber - 1).toLocaleString('default', { month: 'short' });



function resetValues() {   // reset all values to default
tokenId.value='';         
walletAddress.value='';         
delegateTo.textContent = '';
totalRewards.textContent = '';
balancevecarv.textContent = '';
unclaimedvecarv.textContent = '';
nodeAddress.textContent = '';
nodeStatus.textContent = '';
nodeStatus.classList.add('hidden')
votingPower.textContent = '';
receivedDelegations.textContent = '';
nodeCommission.textContent = '';
nodeUptimeRate.textContent = '';
hideLoaders(1);
hideLoaders(2);
}

function callError(e){                // show error message
  errorMsg.textContent=e;
  flexboxDiv.style.filter='blur(10px)';
  errorContainer.classList.remove('hidden');
  errorContainer.style.transform='translateY(0)';
  errorContainer.style.filter='opacity(1)';
}
errorClose.addEventListener('click', () => { // close error message
  flexboxDiv.style.filter='blur(0)';
  errorContainer.style.transform='translateY(-250%)';
  errorContainer.style.filter='opacity(0)';
  resetValues();
  // errorContainer.classList.add('hidden');
})
walletAddress.addEventListener('keypress',(e)=>{ // call main fetch func. when enter is pressed
  if(e.key === 'Enter'){
    fetchBtn.click();
  }
})

document.addEventListener('DOMContentLoaded', () => { // fetch daily veCARV rate
  fetch('/.netlify/functions/getRewards')
  .then(resp=>resp.json())
  .then(data=>{
    perDay = data.average;
    carvPerDay.textContent=`veCARV/day: ${perDay.toFixed(2)}`;
    veCARV=perDay;
  })
  .catch(err=>console.log(err));
});


function callLoaders(){ // show all loaders
  loaders1.forEach(element => {
    element.classList.remove('hidden');
  });
  loaders2.forEach(element => {
    element.classList.remove('hidden');
  });
  wand.classList.add('animate')
  wandDust.classList.add('animate')
  setTimeout(()=>{
    wand.classList.add('hidden')
    wandDust.classList.add('hidden')
  },2200)
}
function hideLoaders(e){ // hide all loaders
  if(e==1){
    loaders1.forEach(element => {
      element.classList.add('hidden') ;   
    });
  }else {
    loaders2.forEach(element => {
      element.classList.add('hidden') ;   
    });
  }
  wand.classList.remove('animate')
  wandDust.classList.remove('animate')
}

  fetchBtn.addEventListener('click',  () => {
  const walletAdd = walletAddress.value.trim();
      if (!walletAdd) {
        callError('Invalid wallet address!');
        return;
      } else if (regex.test(walletAdd)) {
          fetchData();
      }
   else {
    callError('Invalid wallet address!')
  }});
async function seeHistory(e){
  const encodedAddress = encodeURIComponent(e);
  console.log('data',historyData);
  if(!historyData){
  await fetch(`/.netlify/functions/getRewardsForWallet?addr=${encodedAddress}`)
  .then(resp=>resp.json()).then(data=>historyData = data).catch(err=>console.log(err));} 
    tokenStats.classList.add('hidden');
    infoHeader.classList.add('hidden');
    rewardHistoryMain.classList.remove('hidden');
      for(i=0;i<historyData.history.length;i++){
        let date = new Date(historyData.history[i].timestamp*1000);
        rewardHistory.innerHTML += `<div class="rewardCard"><p class="rewardDate">${date.getUTCDate()} ${date.toLocaleString('en-US', { month: 'short' })}, ${date.getUTCFullYear()}</p><div style="display: flex; align-items: center; gap: 5px;"><img src="carv-token.png" height="16px"></img><p class="rewardTokens">${Number(historyData.history[i].amount).toFixed(2)}</p></div></div>`;
      }rewardHistory.innerHTML += `<button class="backToStatsBtn" onclick="hideHistory()">← Back to Stats</button>`;};

function hideHistory(){
  rewardHistory.innerHTML = "";
  tokenStats.classList.remove('hidden');
  infoHeader.classList.remove('hidden');
  rewardHistoryMain.classList.add('hidden');
}
function fetchData(){ // main fetch func.
  const walletAdd = walletAddress.value.trim();
  callLoaders();
  fetch(`https://interface.carv.io/explorer/delegation?wallet_addr=${walletAdd}&page_size=2000`).then(resp=>resp.json()).then((data)=>{
    let licenses = data.data.license.licenses;
      if(licenses==0){callError('No License found for this wallet')} else {
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
  fetch(`https://interface.carv.io/explorer/vecarv_infos?wallet_address=${walletAdd}`).then(resp=>resp.json()).then(data=>{
    if(licenses==0){
        callError('No License found for this wallet');
    } else {
    tokenId.innerHTML = data.data.claim_params.token_ids;
    totalRewards.textContent = Number(data.data.total_rewards).toFixed(2)+" veCARV";
    balancevecarv.textContent = Number(data.data.balance).toFixed(2)+" veCARV"
    unclaimedvecarv.textContent = Number(data.data.unclaimed_rewards).toFixed(2)+" veCARV";
    carvInWallet = Number(data.data.total_rewards);
    if(!tokenStats.innerHTML.includes('Unclaimed Rewards')){
      tokenStats.innerHTML += `<div class="card"><p class="cardLabel">Unclaimed Rewards <i class="fa-solid fa-hand-holding-dollar"></i></p><p class="cardValue">$${(carvInWallet*carvPrice).toFixed(2)}</p></div>
      <button class="rewardHistoryBtn" onclick="seeHistory('${walletAdd}')">See Reward History →</button>`;}
}}).catch(err=>{console.log(err);callError(err)});
  }}).catch(err=>{console.log(err);callError(err)});
}


function toggleChart(){ // show/hide veCARV projection chart (old)
  if (carvInfo.classList.length==2){
    carvInfo.style.transition='0.3s ease-in-out';
    carvInfo.style.transform='translateX(0px)';
    carvInfo.style.filter='opacity(1)';
    toggleChartArrow.innerHTML='<i class="fa fa-angle-right" aria-hidden="true"></i>';
  } else {
    carvInfo.style.transition='0.3s ease-in-out';
    carvInfo.style.transform='translateX(200%)';
    carvInfo.style.filter='opacity(0)';
    toggleChartArrow.innerHTML='<i class="fa fa-angle-left" aria-hidden="true"></i>';
  }
  carvInfo.classList.toggle('hidden');
};

