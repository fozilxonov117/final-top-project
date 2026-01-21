import { useState, useMemo } from 'react';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ComposedChart
} from 'recharts';
import { cn } from 'shared/lib';

interface StockChartProps {
  trend: 'up' | 'down' | 'neutral';
  className?: string;
  currentRank?: number;
  previousRank?: number;
  onClickDay?: (day: number | null) => void;
  fullSize?: boolean;
  profileMode?: boolean;
  profileInfoMode?: boolean;
  dailyRankings?: number[]; // Add dailyRankings prop
}

interface ChartDataPoint {
  day: number;
  rank: number;
  x: number;
  y: number;
  color: string;
}

export const StockChart = ({ 
  trend, 
  className, 
  currentRank = 5, 
  previousRank = 8, 
  onClickDay, 
  fullSize = false, 
  profileMode = false,
  profileInfoMode = false,
  dailyRankings
}: StockChartProps) => {
  const [clickedDay, setClickedDay] = useState<number | null>(null);

  // Generate ranking data similar to the original component
  const chartData = useMemo(() => {
    // Determine how many days of data we actually have
    const maxDays = 23;
    const availableDays = dailyRankings ? dailyRankings.length : maxDays;
    const days = Math.min(availableDays, maxDays);
    const data: ChartDataPoint[] = [];
    
    for (let day = 0; day < days; day++) {
      let dayRank: number;
      
      if (dailyRankings && dailyRankings[day] !== undefined) {
        // Use actual daily ranking data if available
        dayRank = dailyRankings[day];
      } else if (day === 0) {
        dayRank = previousRank;
      } else if (day === days - 1) {
        dayRank = currentRank;
      } else {
        // Fallback to calculated rankings if no daily data
        const progressRatio = day / (days - 1);
        dayRank = previousRank + ((currentRank - previousRank) * progressRatio);
        
        // Add slight volatility for natural movement
        const volatility = Math.sin(day * 0.9) * 1.5 + Math.cos(day * 0.5) * 1;
        dayRank += volatility;
      }
      
      // Handle ranks > 10 (expired)
      if (dayRank > 10) {
        dayRank = 11; // Place expired ranks below the midline
      } else {
        dayRank = Math.max(1, Math.min(10, dayRank));
      }
      if (dailyRankings) {
        dayRank = Math.round(dayRank); // Keep whole numbers for actual rankings
      }
      
      // Determine color based on rank and trend
      let color: string;
      if (dayRank <= 10) {
        color = trend === 'up' ? '#00d4aa' : trend === 'down' ? '#ff6b6b' : '#26d0ce';
      } else {
        color = '#ff6b6b';
      }
      
      data.push({
        day: day + 1,
        rank: dayRank,
        x: day,
        y: dayRank,
        color
      });
    }
    
    return data;
  }, [currentRank, previousRank, trend, profileMode, dailyRankings]);

  // Chart styling configuration
  const chartStyles = profileInfoMode ? {
    height: 200, // Taller for profile info mode
    strokeWidth: 2,
    backgroundColor: 'transparent',
    borderRadius: 'rounded-xl',
    gridColor: '#e8d5ff20',
  } : profileMode ? {
    height: 100, // Profile mode height
    strokeWidth: 1,
    backgroundColor: 'transparent',
    borderRadius: 'rounded-xl',
    gridColor: '#e8d5ff20',
  } : {
    height: 45, // Table view height
    strokeWidth: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 'rounded-lg',
    gridColor: '#e2e8f020',
  };

  // Get trend color
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return '#00d4aa';
      case 'down': return '#ff6b6b';
      default: return '#26d0ce';
    }
  };

  interface TooltipProps {
    active?: boolean;
    payload?: Array<{ payload: ChartDataPoint }>;
  }

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload;
      const rank = Math.round(data.rank);
      
      return (
        <div className="bg-black/95 backdrop-blur border border-amber-400/70 rounded-lg px-1 py-1 shadow-2xl">
          <div className="text-white text-[6px] font-medium leading-none mb-1 font-mono">
            Day {data.day}
          </div>
          <div className={`text-[5px] font-bold leading-none font-mono ${
            rank <= 10 ? 'text-amber-300' : 'text-red-400'
          }`}>
            {rank <= 10 ? `#${rank}` : 'EXPIRED'}
          </div>
        </div>
      );
    }
    return null;
  };

  // Handle dot click
  const handleDotClick = (data: ChartDataPoint) => {
    const dayIndex = data.x;
    if (clickedDay === dayIndex) {
      setClickedDay(null);
      onClickDay?.(null);
    } else {
      setClickedDay(dayIndex);
      onClickDay?.(dayIndex);
    }
  };

  interface DotProps {
    cx: number;
    cy: number;
    payload: ChartDataPoint;
  }

  // Custom dot component for interactive points
  const CustomDot = (props: DotProps) => {
    const { cx, cy, payload } = props;
    const isClicked = clickedDay === payload.x;
    
    return (
      <g>
        {/* Invisible clickable area */}
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill="transparent"
          style={{ cursor: 'pointer' }}
          onClick={() => handleDotClick(payload)}
        />
        
        {/* Visible dot - now directly clickable */}
        <circle
          cx={cx}
          cy={cy}
          r={fullSize ? 2.5 : 1.5}
          fill={payload.color}
          stroke="#ffffff"
          strokeWidth={fullSize ? 1 : 0.5}
          opacity={0.9}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            
            handleDotClick(payload);
          }}
        />
        
        {/* Click indicator */}
        {isClicked && (
          <>
            <circle
              cx={cx}
              cy={cy}
              r={fullSize ? 5 : 3}
              fill="none"
              stroke="#fbbf24"
              strokeWidth={fullSize ? 2 : 1.5}
              opacity={0.9}
            />
            <circle
              cx={cx}
              cy={cy}
              r={fullSize ? 7 : 4.5}
              fill="none"
              stroke="#fbbf24"
              strokeWidth={fullSize ? 1 : 0.8}
              opacity={0.6}
            />
          </>
        )}
      </g>
    );
  };

  return (
    <div className={cn(
      'flex items-center justify-center relative',
      fullSize ? 'w-full h-full' : 'group',
      className
    )}>
      <div 
        className={cn(
          'overflow-hidden relative',
          chartStyles.borderRadius,
          fullSize ? 'w-full h-full flex items-center justify-center min-h-[300px]' : 'p-1.5 transition-all duration-500 transform-gpu border border-white/20 w-full min-w-[250px]',
          !fullSize && chartStyles.backgroundColor,
          !fullSize && (trend === 'up' ? 'hover:border-emerald-400/30' :
          trend === 'down' ? 'hover:border-red-400/30' :
          'hover:border-cyan-400/30')
        )}
      >
        {/* Hover effect shimmer for table usage */}
        {!fullSize && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-2000"></div>
        )}
        
        <ResponsiveContainer 
          width={fullSize ? "100%" : 210} 
          height={fullSize ? "100%" : chartStyles.height}
        >
          <ComposedChart
            data={chartData}
            margin={{
              top: fullSize ? 20 : 12,
              right: fullSize ? 20 : 2,
              left: fullSize ? 20 : -20,
              bottom: profileInfoMode ? (fullSize ? 20 : 8) : 8,
            }}
          >
            {/* Grid */}
            <CartesianGrid 
              strokeDasharray="2 2" 
              stroke={chartStyles.gridColor}
              opacity={fullSize ? 0.3 : 0.2}
              horizontal={true}
              vertical={false}
            />
            
            {/* Bottom threshold line for ranks > 10 */}
            <ReferenceLine 
              y={10.5} 
              stroke="none" 
              strokeDasharray="3 3" 
              label={{ 
                value: "TOP 10", 
                position: 'right',
                fill: 'none',
                fontSize: fullSize ? 12 : 8
              }} 
            />
            
            {/* Axes */}
            <XAxis 
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={fullSize ? { fontSize: 10, fill: '#94a3b8' } : false}
              domain={[1, dailyRankings ? Math.min(dailyRankings.length, 23) : 23]}
              hide={!fullSize}
            />
            <YAxis 
              domain={[1, 11]}
              reversed
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: fullSize ? 10 : 5, fill: '#94a3b8' }}
              tickFormatter={(value) => value === 11 ? '' : `${Math.round(value)}`}
              interval={0}
              ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
            />
            
            {/* Separation line between TOP 10 and expired */}
            <ReferenceLine 
              y={10} 
              stroke="#ff8c00" 
              strokeDasharray="3 2"
              strokeWidth={fullSize || profileInfoMode ? 1.5 : 1}
              opacity={fullSize || profileInfoMode ? 0.8 : 0.6}
              label={{ 
                value: fullSize ? "TOP 10 | EXPIRED" : "", 
                position: 'right',
                fill: '#ff8c00',
                fontSize: fullSize ? 12 : 8 
              }}
            />
            
            {/* Main ranking line */}
            <Line
              type="monotone"
              dataKey="rank"
              stroke={getTrendColor()}
              strokeWidth={chartStyles.strokeWidth}
              dot={(props: any) => {
                const { cx, cy, payload, index } = props;
                return <CustomDot key={`dot-${index}`} cx={cx} cy={cy} payload={payload} />;
              }}
              activeDot={false}
              connectNulls
            />
            
            {/* Custom tooltip */}
            <Tooltip 
              content={<CustomTooltip />}
              cursor={false}
              position={{ x: undefined, y: undefined }}
            />
          </ComposedChart>
        </ResponsiveContainer>
        
        {/* Labels for non-fullSize mode */}
        {!fullSize && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Top 10 zone label */}
            <div className="absolute left-1 top-2 text-[4px] text-orange-400 opacity-80 font-mono font-bold">
              TOP 10
            </div>
            
            {/* Expired zone label */}
            <div className="absolute left-1 bottom-2 text-[4px] text-red-400 opacity-70 font-mono font-semibold">
              DOWN
            </div>
          </div>
        )}
      </div>
    </div>
  );
};