// Utility function to analyze 23-day ranking history and determine medal eligibility
export const analyzeRankingHistory = (currentRank: number, previousRank: number, trend: 'up' | 'down' | 'neutral') => {
  const days = 23; // Updated to 23 working days
  let daysInTop3 = 0;
  let everReachedTop3 = false;
  
  // Replicate the same logic from StockChart to get historical ranks
  const startRank = previousRank;
  const endRank = currentRank;
  const totalChange = endRank - startRank;
  
  for (let day = 0; day < days; day++) {
    // Calculate base rank progression with DRAMATIC movements (3-4 positions)
    const progressRatio = day / (days - 1);
    let dayRank = startRank + (totalChange * progressRatio);
    
    // Add LARGE fluctuations to simulate 3-4 position moves
    const bigVolatility = Math.sin(day * 0.6) * 3.5 + Math.cos(day * 0.3) * 2.8;
    const trendWave = Math.sin(day * 0.8) * 2.5;
    
    if (trend === 'up') {
      dayRank += bigVolatility;
      if (day >= 5 && day <= 8) {
        dayRank -= 4;
      }
      if (day >= 12 && day <= 15) {
        dayRank -= 3;
      }
      if (day >= 18 && day <= 20) {
        dayRank += 2;
      }
    } else if (trend === 'down') {
      dayRank += bigVolatility;
      if (day >= 6 && day <= 9) {
        dayRank += 4;
      }
      if (day >= 13 && day <= 16) {
        dayRank += 3;
      }
      if (day >= 19 && day <= 21) {
        dayRank -= 1.5;
      }
    } else {
      dayRank = currentRank + bigVolatility + trendWave;
      if (day >= 4 && day <= 7) {
        dayRank += currentRank < 10 ? 3 : -3;
      }
      if (day >= 11 && day <= 14) {
        dayRank += currentRank < 10 ? -2.5 : 2.5;
      }
      if (day >= 17 && day <= 20) {
        dayRank += currentRank < 10 ? 2 : -2;
      }
    }
    
    // Constrain ranks to realistic range
    dayRank = Math.max(1, Math.min(30, dayRank));
    
    // Check if this day was in top-3
    if (dayRank <= 3) {
      daysInTop3++;
      everReachedTop3 = true;
    }
  }
  
  return {
    everReachedTop3,
    daysInTop3,
    top3Percentage: Math.round((daysInTop3 / days) * 100)
  };
};
