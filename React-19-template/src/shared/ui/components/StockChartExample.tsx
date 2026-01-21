import { StockChart } from './StockChart';

// Example usage showing how to use the new dailyRankings feature
export const StockChartExample = () => {
  // Example 1: Only 15 days of data instead of 23
  const limitedData = [8, 7, 9, 6, 5, 8, 7, 6, 4, 3, 5, 4, 6, 7, 5]; // 15 days

  // Example 2: Only 10 days of data
  const veryLimitedData = [8, 7, 9, 6, 5, 8, 7, 6, 4, 3]; // 10 days

  // Example 3: 20 days of data (as mentioned in the request)
  const twentyDaysData = [8, 7, 9, 6, 5, 8, 7, 6, 4, 3, 5, 4, 6, 7, 5, 4, 6, 8, 5, 3]; // 20 days

  return (
    <div className="p-8 space-y-8 bg-gray-900 min-h-screen">
      <div className="text-white text-2xl font-bold">Stock Chart Examples with Limited Data</div>
      
      <div className="space-y-4">
        <div className="text-white text-lg">Example 1: 15 days of data (should stop at day 15)</div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <StockChart 
            trend="up" 
            currentRank={5} 
            previousRank={8} 
            dailyRankings={limitedData}
            fullSize={true}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-white text-lg">Example 2: 10 days of data (should stop at day 10)</div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <StockChart 
            trend="down" 
            currentRank={3} 
            previousRank={8} 
            dailyRankings={veryLimitedData}
            fullSize={true}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-white text-lg">Example 3: 20 days of data (should stop at day 20)</div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <StockChart 
            trend="neutral" 
            currentRank={3} 
            previousRank={8} 
            dailyRankings={twentyDaysData}
            fullSize={true}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-white text-lg">Example 4: No dailyRankings prop (should default to full 23 days)</div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <StockChart 
            trend="up" 
            currentRank={5} 
            previousRank={8} 
            fullSize={true}
          />
        </div>
      </div>
    </div>
  );
};