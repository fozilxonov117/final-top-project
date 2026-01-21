import type { Operator } from 'shared/types';

interface YesterdayStatsProps {
  operator: Operator;
}

export const YesterdayStats = ({ operator }: YesterdayStatsProps) => {
  // Generate yesterday's stats (static data)
  const generateYesterdayStats = () => {
    // Yesterday's data is static - not dynamic like the current daily stats
    // We can use the operator's base data with some variation to simulate yesterday
    const baseCount = operator.count;
    const baseAverage = operator.average;
    const baseKpi = operator.kpi;
    
    // Generate yesterday's values with slight variations
    const yesterdayCount = Math.max(1, baseCount - Math.floor(Math.random() * 3) + 1);
    
    // Convert average to minutes for calculation
    const avgString = baseAverage.toString();
    const [avgMin, avgSec] = avgString.split(':').map(Number);
    const avgTotalSeconds = avgMin * 60 + avgSec;
    
    // Yesterday's average with variation (±30 seconds)
    const yesterdayAvgSeconds = Math.max(60, avgTotalSeconds + (Math.random() - 0.5) * 60);
    const yesterdayAvgMin = Math.floor(yesterdayAvgSeconds / 60);
    const yesterdayAvgSec = Math.floor(yesterdayAvgSeconds % 60);
    const yesterdayAverage = `${yesterdayAvgMin.toString().padStart(2, '0')}:${yesterdayAvgSec.toString().padStart(2, '0')}`;
    
    // Yesterday's KPI with variation (±2.5)
    const yesterdayKpi = Math.max(60, parseFloat(baseKpi.toString()) + (Math.random() - 0.5) * 5).toFixed(1);
    
    return {
      count: yesterdayCount,
      average: yesterdayAverage,
      kpi: yesterdayKpi
    };
  };

  const yesterdayData = generateYesterdayStats();

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 ">
      <h3 className="text-xl font-bold text-white mb-6">Yesterday's Performance</h3>
      <div className="grid grid-cols-3 gap-6">
        {/* Yesterday's Daily Count */}
        <div className="text-center">
          <div className="text-white/70 text-sm font-medium mb-2">Daily Count</div>
          <div className="text-3xl font-bold text-white">{yesterdayData.count}</div>
        </div>

        {/* Yesterday's Daily Average */}
        <div className="text-center">
          <div className="text-white/70 text-sm font-medium mb-2">Daily Average</div>
          <div className="text-3xl font-bold text-white">{yesterdayData.average}</div>
        </div>

        {/* Yesterday's Monthly KPI */}
        <div className="text-center">
          <div className="text-white/70 text-sm font-medium mb-2">Monthly KPI</div>
          <div className="text-3xl font-bold text-white">{yesterdayData.kpi}</div>
        </div>
      </div>
    </div>
  );
};
