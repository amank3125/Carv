const walletAddress = document.querySelector('.walletAddress');
const carvPerDay = document.querySelector('.carvPerDay');
const fetchBtn = document.querySelector('.fetch-btn');
const resultContainer = document.querySelector('.resultContainer');
const tokenId = document.querySelector('.token_id');
const delegateTo = document.querySelector('.delegate_to');
const totalRewards = document.querySelector('.total_rewards');
const walletStatus = document.querySelector('.walletStatus');
const flexboxDiv = document.querySelector('.flexboxDiv');
const uptimeRate = document.querySelector('.uptime_rate');
const nodeAddress = document.querySelector('.nodeAddress');
const nodeStatus = document.querySelector('.nodeStatus');
const votingPower = document.querySelector('.votingPower');
const receivedDelegations = document.querySelector('.receivedDelegations');
const nodeCommission = document.querySelector('.nodeCommission');
const nodeUptimeRate = document.querySelector('.nodeUptimeRate');
const errorContainer = document.querySelector('.errorContainer');
const errorMsg = document.querySelector('.errorMsg');
const errorClose = document.querySelector('.errorClose');
const loaders1 = document.querySelectorAll('.loader1')
const loaders2 = document.querySelectorAll('.loader2')
const mainChart = document.querySelectorAll('.mainChart')
const regex = /^(0x)?[0-9a-fA-F]{40}$/;
let veCARV=0;
const currentMonthNumber = new Date().getMonth() + 1;
const remainingDays = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate();
const getMonthShortName = (monthNumber) => new Date(0, monthNumber - 1).toLocaleString('default', { month: 'short' });



function resetValues() {   
walletAddress.value='';         // reset all values to default
delegateTo.textContent = '';
totalRewards.textContent = '';
walletStatus.textContent = '';
uptimeRate.textContent = '';
nodeAddress.textContent = '';
nodeStatus.textContent = '';
votingPower.textContent = '';
receivedDelegations.textContent = '';
nodeCommission.textContent = '';
nodeUptimeRate.textContent = '';
nodeStatus.classList.add('hidden');
walletStatus.classList.add('hidden');
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
errorClose.addEventListener('click', () => {
  flexboxDiv.style.filter='blur(0)';
  errorContainer.style.transform='translateY(-250%)';
  errorContainer.style.filter='opacity(0)';
  resetValues();
  // errorContainer.classList.add('hidden');
})
walletAddress.addEventListener('keypress',(e)=>{
  if(e.key === 'Enter'){
    fetchBtn.click();
  }
})
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://faas-ams3-2a2df116.doserverless.co/api/v1/web/fn-d38dd739-354e-43bf-b096-1c57b14c6512/default/carv')
  .then(resp=>resp.json())
  .then(data=>{carvPerDay.textContent=`veCARV/day: ${Number(data.perDay).toFixed(2)}`; veCARV=Number(data.perDay);})
  .catch(err=>console.log(err));
});

fetchBtn.addEventListener('click',  () => {
    const walletAdd = walletAddress.value.trim();
    if (!walletAdd) {
      callError('Please enter a valid wallet address');
      return;
    } else if (regex.test(walletAdd)) {
      fetchData();
}else{
  callError('Invalid wallet address!')
}});

function callLoaders(){
  loaders1.forEach(element => {
    element.classList.remove('hidden') ;   
  });
  loaders2.forEach(element => {
    element.classList.remove('hidden') ;   
  });
  // loaders.classList.remove('.hidden');
}
function hideLoaders(e){
  if(e==1){
    loaders1.forEach(element => {
      element.classList.add('hidden') ;   
    });
  }else {
    loaders2.forEach(element => {
      element.classList.add('hidden') ;   
    });
  }
  // loaders.classList.remove('.hidden');
}

function fetchData(){
  callLoaders();
  const walletAdd = walletAddress.value.trim();
  fetch(`https://interface.carv.io/explorer_alphanet/client_info?wallet_addr=${walletAdd}`)
      .then(resp=>resp.json())
      .then(data=>{
        hideLoaders(1);
        if(data.data.delegation_infos==null){
          delegateTo.textContent = "self";
          tokenId.innerHTML = "none";
          totalRewards.textContent = data.data.total_rewards+" veCARV";
          if(data.data.status=='active'){
            walletStatus.textContent = data.data.status;
            walletStatus.style = `border: 1px solid var(--green);background-color:#0d3b2d;color: var(--green);`
          }else {
            walletStatus.style = `border: 1px solid var(--red);background-color:var(--darkred);color: var(--red);`
          }
          uptimeRate.textContent = data.data.uptime_rate;
        } else {
          if(data.data.status=='active'){
            walletStatus.classList.remove('hidden');
            walletStatus.textContent = data.data.status;
            walletStatus.style = `border: 1px solid var(--green);background-color:#0d3b2d;color: var(--green);`
          }else {
            walletStatus.classList.remove('hidden');
            walletStatus.style = `border: 1px solid var(--red);background-color:var(--darkred);color: var(--red);`
          }
          delegateAddress=data.data.delegation_infos[0].delegate_to;
          tokenId.innerHTML = data.data.delegation_infos[0].token_id;
          delegateTo.textContent = delegateAddress.slice(0, 4) + '...' + delegateAddress.slice(-4); //shorten long address
          totalRewards.textContent = Number(data.data.total_rewards).toFixed(2)+" veCARV";
          estimateRewards(data.data.total_rewards);
          walletStatus.textContent = data.data.status;
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
          hideLoaders(2);
          if(data.data.license.licenses==0){
            callError('No License found for this wallet');
            } else {
          if(data.data.license.delegation_infos!=null){
            flexboxDiv.style.filter='none';
            console.log('1----------------');
            delegateAddress=data.data.license.delegation_infos[0].delegate_to;
              for(i=0;i<data.data.verifier_list.length;i++){
                if(delegateAddress==data.data.verifier_list[i].address){
                nodeAddress.textContent=delegateAddress.slice(0, 4) + '...' + delegateAddress.slice(-4); //shorten long address
                nodeStatus.textContent=`${data.data.verifier_list[i].status}`;
                  if(data.data.verifier_list[i].status=="active"){
                  nodeStatus.classList.remove('hidden');
                  nodeStatus.style = `border: 1px solid var(--green);background-color:#0d3b2d;color: var(--green);`
                  } else {
                  nodeStatus.classList.remove('hidden');
                  nodeStatus.style = `border: 1px solid var(--red);background-color:var(--darkred);color: var(--red);`
                  }
                  votingPower.textContent=data.data.verifier_list[i].voting_power;
                  receivedDelegations.textContent=data.data.verifier_list[i].received_delegations;
                  nodeCommission.textContent=data.data.verifier_list[i].commission;
                  nodeUptimeRate.textContent=data.data.verifier_list[i].uptime_rate;
              break;
            }}}
          else{
            console.log('----------------2');
          }}
        })
        .catch(err=>console.log(err));
}
const chartLabels = [];
const chartData = [];

  function estimateRewards(e){
    for(i=currentMonthNumber;chartLabels.length<12;i++){
      chartLabels.push(getMonthShortName(i))
    }
    chartData[0]= +e+(veCARV*remainingDays);
    for(i=1;i<chartLabels.length;i++){
      if(i==5){
        veCARV = veCARV/2;
      }
      const daysinMonth = new Date(new Date().getFullYear(), i, 0).getDate();
      chartData[i] = chartData[i-1]+(veCARV*daysinMonth);
      // console.log(chartLabels[i]+" - "+chartData[i])
  // }console.log(chartData);
  }renderChart(chartLabels,chartData);
};

function renderChart(l,d){new Chart(mainChart,{
  type:'line',
  data:{labels:l,
    datasets:[{
      label:'veCARV',
      data:d,
      borderWidth:1,
      backgroundColor:'#824dff',
      borderColor:'#ffffff'
    }]
  }});}