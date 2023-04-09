function calculateNegativeMargin(odds1, oddsX, odds2) {
    return 1 / odds1 + 1 / oddsX + 1 / odds2 - 1;
  }
  
  function calculateStakes(totalStake, odds1, oddsX, odds2, negativeMargin) {
    const stakesWithMargin = totalStake * (1 - negativeMargin);
    const stake1 = (stakesWithMargin / odds1).toFixed(2);
    const stakeX = (stakesWithMargin / oddsX).toFixed(2);
    const stake2 = (stakesWithMargin / odds2).toFixed(2);
  
    return {
      stake1: stake1,
      stakeX: stakeX,
      stake2: stake2,
    };
  }
  
  function calculateRealMargin(stakes, odds1, oddsX, odds2) {
    const payout1 = (stakes.stake1 * odds1) - (stakes.stake1 * 0.12) - stakes.stake1;
    const payoutX = (stakes.stakeX * oddsX) - (stakes.stakeX * 0.12) - stakes.stakeX;
    const payout2 = (stakes.stake2 * odds2) - (stakes.stake2 * 0.12) - stakes.stake2;
  
    const totalPayout = Math.min(payout1, payoutX, payout2);
    const totalStake = parseFloat(stakes.stake1) + parseFloat(stakes.stakeX) + parseFloat(stakes.stake2);
    return totalPayout / totalStake;
  }
  
  
  function calculatePayouts(stakes, odds1, oddsX, odds2) {
    const payout1 = (stakes.stake1 * odds1) - (stakes.stake1 * 0.12);
    const payoutX = (stakes.stakeX * oddsX) - (stakes.stakeX * 0.12);
    const payout2 = (stakes.stake2 * odds2) - (stakes.stake2 * 0.12);
  
    return {
      payout1: payout1.toFixed(2),
      payoutX: payoutX.toFixed(2),
      payout2: payout2.toFixed(2),
    };
  }
  

  
  function addMatch() {
    const matchesContainer = document.getElementById('matches-container');
    const matchCount = matchesContainer.childElementCount + 1;
  
    const matchDiv = document.createElement('div');
    matchDiv.classList.add('match');
    matchDiv.innerHTML = `
      <h2>Match ${matchCount}</h2>
      <label for="input_odds1_${matchCount}">Odds 1:</label>
      <input type="number" step="any" id="input_odds1_${matchCount}" required>
      <label for="input_oddsX_${matchCount}">Odds X:</label>
      <input type="number" step="any" id="input_oddsX_${matchCount}" required>
      <label for="input_odds2_${matchCount}">Odds 2:</label>
      <input type="number" step="any" id="input_odds2_${matchCount}" required>
    `;
  
    matchesContainer.appendChild(matchDiv);
  }
  
  function displayResults(stakes, realMargins, payouts) {
    let resultHTML = '';
  
    for (let i = 0; i < stakes.length; i++) {
      resultHTML += `
        <h2>Match ${i + 1} Results</h2>
        <p>Real Margin (after fee): ${(realMargins[i] * 100).toFixed(2)}%</p>
        <p>Stake 1: ${stakes[i].stake1}</p>
        <p>Stake X: ${stakes[i].stakeX}</p>
        <p>Stake 2: ${stakes[i].stake2}</p>
        <p>Payout 1: ${payouts[i].payout1}</p>
        <p>Payout X: ${payouts[i].payoutX}</p>
        <p>Payout 2: ${payouts[i].payout2}</p>
      `;
    }
  
    document.getElementById('result').innerHTML = resultHTML;
  }
  
  document.getElementById('add-match').addEventListener('click', addMatch);
  
  document.getElementById('calculator-form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const totalStake = parseFloat(document.getElementById('input1').value);
    const matches = document.getElementsByClassName('match');
    const stakes = [];
    const realMargins = [];
    const payouts = [];
  
    let remainingStake = totalStake;
  
    for (let i = 0; i < matches.length; i++) {
      const odds1 = parseFloat(document.getElementById(`input_odds1_${i + 1}`).value);
      const oddsX = parseFloat(document.getElementById(`input_oddsX_${i + 1}`).value);
      const odds2 = parseFloat(document.getElementById(`input_odds2_${i + 1}`).value);
  
      const negativeMargin = calculateNegativeMargin(odds1, oddsX, odds2);
      let matchStake;
  
      if (i === matches.length - 1) {
        matchStake = remainingStake;
      } else {
        matchStake = totalStake * (1 - negativeMargin) / matches.length;
        remainingStake -= matchStake;
      }
  
      const matchStakes = calculateStakes(matchStake, odds1, oddsX, odds2, negativeMargin);
      const matchRealMargin = calculateRealMargin(matchStakes, odds1, oddsX, odds2);
      const matchPayouts = calculatePayouts(matchStakes, odds1, oddsX, odds2);
  
      stakes.push(matchStakes);
      realMargins.push(matchRealMargin);
      payouts.push(matchPayouts);
    }
  
    displayResults(stakes, realMargins, payouts);
  });
  
  // Add the first match by default
  addMatch();
  
  