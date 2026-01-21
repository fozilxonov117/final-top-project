import React, { Suspense, memo } from 'react';
// Lazy load heavy components  
const LazyStockChart = React.lazy(() => 
  import('../components/StockChart').then(module => ({ 
    default: module.StockChart 
  }))
);

// Optimized loading skeleton
const ChartSkeleton = memo(() => (
  <div 
    className="w-full h-[500px] bg-gradient-to-r from-white/5 to-white/10 rounded-xl animate-pulse"
    style={{
      transform: 'translate3d(0, 0, 0)',
      backfaceVisibility: 'hidden'
    }}
  >
    <div className="flex flex-col h-full justify-center items-center gap-4">
      <div className="w-16 h-16 border-4 border-white/20 border-t-white/60 rounded-full animate-spin"></div>
      <div className="text-white/60 text-sm font-medium">Loading chart...</div>
    </div>
  </div>
));

ChartSkeleton.displayName = 'ChartSkeleton';

interface OptimizedStockChartProps {
  trend: 'up' | 'down' | 'neutral';
  currentRank: number;
  previousRank: number;
  className?: string;
  fullSize?: boolean;
  profileInfoMode?: boolean;
}

export const OptimizedStockChart = memo<OptimizedStockChartProps>(({
  trend,
  currentRank,
  previousRank,
  className = "w-full h-full",
  fullSize = true,
  profileInfoMode = true
}) => {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <LazyStockChart
        trend={trend}
        currentRank={currentRank}
        previousRank={previousRank}
        className={className}
        fullSize={fullSize}
        profileMode={profileInfoMode}
      />
    </Suspense>
  );
});

OptimizedStockChart.displayName = 'OptimizedStockChart';