import { cn } from 'shared/lib';
import { useState } from 'react';

interface StockChartProps {
  trend: 'up' | 'down' | 'neutral';
  className?: string;
  currentRank?: number;
  previousRank?: number;
  onClickDay?: (day: number | null) => void;
  fullSize?: boolean; // New prop for Profile Info usage
  profileMode?: boolean; // New prop to enable single-column layout for profile
  dailyRankings?: number[]; // Array of rankings for each day - chart only draws up to this data
}

export const StockChart = ({ trend, className, currentRank = 5, previousRank = 8, onClickDay, fullSize = false, profileMode = false, dailyRankings }: StockChartProps) => {
  // DEBUG: Log when component renders
  console.log('🎯 StockChart rendering with:', { currentRank, previousRank, fullSize, profileMode });
  
  const [clickedPoint, setClickedPoint] = useState<{x: number, y: number, rank: number, day: number} | null>(null);
  const [clickedDay, setClickedDay] = useState<number | null>(null);
  
  // Chart styling configuration based on profileMode
  const chartStyles = profileMode ? {
    containerHeight: 86,
    labelFontSize: "5",
    strokeWidth: "2.5",
    dotRadius: "1",
    backgroundClass: "",
    borderRadiusClass: "rounded-xl",
    labelColor: "#e8d5ff",
    spacingMultiplier: 0.9,
    boxShadow: "inset rgba(255, 255, 255, 0.7) 0px 2px 15px 0px"
  } : {
    containerHeight: 30,
    labelFontSize: "5", 
    strokeWidth: "2.5",
    dotRadius: "1",
    backgroundClass: "bg-white/10",
    borderClass: "border border-white/20",
    borderRadiusClass: "rounded-lg",
    labelColor: "#e2e8f0",
    spacingMultiplier: 0.75,
    boxShadow: undefined
  };
  
  // Generate cryptocurrency-style rank progression data
  const generateRankData = () => {
    // Determine how many days of data we actually have
    const maxDays = 23; // Maximum possible days
    const availableDays = dailyRankings ? dailyRankings.length : maxDays;
    const days = Math.min(availableDays, maxDays); // Use available data length, but cap at max
    
    const width = 180; // Keep compact width
    const height = chartStyles.containerHeight; // Use dynamic height from chartStyles
    const heightMultiplier = chartStyles.spacingMultiplier; // Use dynamic spacing from chartStyles
    const data: Array<{x: number, y: number, rank: number, color: string, day: number}> = [];
    
    const startRank = previousRank;
    const endRank = currentRank;
    const totalChange = endRank - startRank;
    
    for (let day = 0; day < days; day++) {
      // Adjust X positioning based on available days
      const x = days === 1 ? width / 2 : 20 + (day / (days - 1)) * (width - 40);
      
      let dayRank: number;
      
      if (dailyRankings && dailyRankings[day] !== undefined) {
        // Use actual daily ranking data if available
        dayRank = dailyRankings[day];
      } else if (day === 0) {
        // For the first day, use the exact starting rank without volatility
        dayRank = startRank;
      } else if (day === days - 1) {
        dayRank = currentRank;
      } else {
        const progressRatio = day / (days - 1);
        dayRank = startRank + (totalChange * progressRatio);
        
        // Same volatility structure for both modes - only rendering differs
        const volatility = Math.sin(day * 0.9) * 4 + Math.cos(day * 0.5) * 2.5;
        const cryptoWave = Math.sin(day * 1.3) * 2;
        
        if (trend === 'up') {
          dayRank += volatility;
          if (day >= 2 && day <= 3) dayRank += 5; // Dramatic dip
          if (day >= 5 && day <= 6) dayRank += 2;
          if (day >= 7 && day <= 8) dayRank -= 2; // Final surge
        } else if (trend === 'down') {
          dayRank += volatility;
          if (day >= 2 && day <= 4) dayRank -= 3; // Temporary rally
          if (day >= 6 && day <= 7) dayRank -= 1;
          if (day >= 8 && day <= 9) dayRank += 4; // Final crash
        } else {
          dayRank = currentRank + volatility + cryptoWave;
        }
        
        dayRank = Math.max(1, Math.min(25, dayRank));
        
        // For profile mode, round to nearest integer for better alignment with numbers
        if (profileMode && dayRank <= 10) {
          dayRank = Math.round(dayRank);
        }
      }
      
      // Round rankings if using actual daily data for cleaner display
      if (dailyRankings) {
        dayRank = Math.round(dayRank);
      }
      
      // Convert rank to Y position with professional midline separation
      let y;
      if (profileMode) {
        // Professional positioning system for profile mode
        if (dayRank <= 10) {
          // Top 10 zone: Above the midline with precise spacing
          const topSectionHeight = height * heightMultiplier - 4; // Reserve space above midline
          const rankSpacing = topSectionHeight / 10; // Equal spacing for ranks 1-10
          y = 4 + (dayRank - 1) * rankSpacing;
        } else {
          // Below Top 10 zone: Below the midline
          const midlineY = height * heightMultiplier;
          const bottomSectionHeight = height * (1 - heightMultiplier) - 4;
          const belowTop10Spacing = bottomSectionHeight / 15; // Space for ranks 11-25
          y = midlineY + 4 + ((dayRank - 11) * belowTop10Spacing);
        }
      } else {
        // Original calculation for table mode - unchanged
        const cellPosition = Math.ceil(Math.min(dayRank, 10) / 2);
        const midlinePosition = heightMultiplier;
        
        if (dayRank <= 10) {
          y = 4 + ((cellPosition - 1) / 5) * (height * midlinePosition - 4);
        } else {
          y = (height * midlinePosition) + ((dayRank - 10) / 15) * (height * (1 - midlinePosition) - 4);
        }
      }
      
      // Default green color (since green path connects all)
      let color = '#00d4aa';
      
      data.push({ x, y, rank: dayRank, color, day });
    }
    
    return data;
  };

  const rankData = generateRankData();
  
  // DEBUG: Log rankData
  console.log('🔍 rankData generated:', rankData.length, 'points');
  console.log('🔍 First few points:', rankData.slice(0, 3));



  return (
    <div className={cn(
      'flex items-center justify-center relative',
      fullSize ? 'w-full h-full' : 'group',
      className
    )}>
      <div 
        className={cn(
          chartStyles.backgroundClass,
          'overflow-hidden relative',
          chartStyles.borderRadiusClass,
          chartStyles.borderClass,
          fullSize ? 'w-full  h-full  flex items-center justify-center min-h-[300px]' : 'p-2.5 transition-[border-color,transform]  duration-500 transform-gpu',
          !fullSize && (trend === 'up' ? 'hover:border-emerald-400/30' :
          trend === 'down' ? 'hover:border-red-400/30' :
          'hover:border-cyan-400/30')
        )}
        style={{
          ...(chartStyles.boxShadow && { boxShadow: chartStyles.boxShadow })
        }}
      >
        {/* Subtle animated background shimmer - only for table usage */}
        {!fullSize && (
          <div className="absolute  inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-2000"></div>
        )}
        
        <svg 
          width={fullSize ? "100%" : "180"} 
          height={fullSize ? "100%" : chartStyles.containerHeight.toString()} 
          viewBox={fullSize ? `0 0 180 ${chartStyles.containerHeight}` : undefined}
          preserveAspectRatio={fullSize ? "xMidYMid meet" : undefined}
          className="overflow-visible relative z-10 "
        >
          {/* Advanced gradient definitions */}
          <defs>
            <linearGradient id="cryptoGridGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00d4aa" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#26d0ce" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00d4aa" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="chartBgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={
                trend === 'up' ? '#00d4aa' : 
                trend === 'down' ? '#ff6b6b' : 
                '#26d0ce'
              } stopOpacity="0.15" />
              <stop offset="100%" stopColor={
                trend === 'up' ? '#00d4aa' : 
                trend === 'down' ? '#ff6b6b' : 
                '#26d0ce'
              } stopOpacity="0.03" />
            </linearGradient>
            <filter id="cryptoGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="strongGlow">
              <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Crypto-style background - transparent for profile mode */}
          <rect width="180" height="90" fill={profileMode ? "transparent" : "url(#chartBgGradient)"} rx="6" />
          
          {/* Animated grid lines */}
          {Array.from({ length: 5 }, (_, i) => (
            <line
              key={`grid-${i}`}
              x1={20}
              y1={4 + (i / 4) * (chartStyles.containerHeight * chartStyles.spacingMultiplier - 4)}
              x2={160}
              y2={4 + (i / 4) * (chartStyles.containerHeight * chartStyles.spacingMultiplier - 4)}
              stroke="url(#cryptoGridGradient)"
              strokeWidth="0.5"
              className="animate-pulse"
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDuration: '3s'
              }}
            />
          ))}
          
          {/* Professional rank numbers - only 1-10 above midline */}
          {profileMode ? (
            // Single column layout for profile mode (1-10) with professional spacing
            Array.from({ length: 10 }, (_, i) => {
              const position = i + 1;
              // Professional positioning system matching dot positions
              const topSectionHeight = chartStyles.containerHeight * chartStyles.spacingMultiplier - 4;
              const rankSpacing = topSectionHeight / 10;
              const y = 4 + i * rankSpacing;
              
              return (
                <text
                  key={`position-${i}`}
                  x={3}
                  y={y + 2}
                  fontSize={chartStyles.labelFontSize}
                  fill={chartStyles.labelColor}
                  fontFamily="JetBrains Mono, Consolas, monospace"
                  fontWeight="600"
                  className="drop-shadow-sm"
                >
                  {position}
                </text>
              );
            })
          ) : (
            // Compact two-column layout for table mode
            Array.from({ length: 5 }, (_, i) => {
              const position1 = i * 2 + 1;
              const position2 = i * 2 + 2;
              const y = 4 + (i / 4) * (chartStyles.containerHeight * chartStyles.spacingMultiplier - 4);
              
              return (
                <g key={`positions-${i}`}>
                  <text
                    x={3}
                    y={y + 2}
                    fontSize={chartStyles.labelFontSize}
                    fill={chartStyles.labelColor}
                    fontFamily="JetBrains Mono, Consolas, monospace"
                    fontWeight="600"
                    className="drop-shadow-sm"
                  >
                    {position1}
                  </text>
                  <text
                    x={9}
                    y={y + 2}
                    fontSize="4"
                    fill="#94a3b8"
                    fontFamily="JetBrains Mono, Consolas, monospace"
                    fontWeight="400"
                  >
                    {position2}
                  </text>
                </g>
              );
            })
          )}
          
          {/* Orange Dashed Midline - Separates Top 10 from Expired */}
          <g>
            {/* Main orange dashed midline */}
            <line
              x1={15}
              y1={profileMode ? (chartStyles.containerHeight * chartStyles.spacingMultiplier) : (chartStyles.containerHeight * chartStyles.spacingMultiplier)}
              x2={165}
              y2={profileMode ? (chartStyles.containerHeight * chartStyles.spacingMultiplier) : (chartStyles.containerHeight * chartStyles.spacingMultiplier)}
              stroke="#ff8c00"
              strokeWidth="1"
              opacity="0.8"
              strokeDasharray="3,2"
              strokeLinecap="round"
            />
            
            {/* Orange midline glow effect for dashed line */}
            <line
              x1={15}
              y1={profileMode ? (chartStyles.containerHeight * chartStyles.spacingMultiplier) : (chartStyles.containerHeight * chartStyles.spacingMultiplier)}
              x2={165}
              y2={profileMode ? (chartStyles.containerHeight * chartStyles.spacingMultiplier) : (chartStyles.containerHeight * chartStyles.spacingMultiplier)}
              stroke="#ff4500"
              strokeWidth="0.3"
              opacity="0.2"
              strokeDasharray="3,2"
              strokeLinecap="round"
            />
            
            {/* Top 10 zone label */}
            <text
              x={22}
              y={profileMode ? (chartStyles.containerHeight * chartStyles.spacingMultiplier - 3) : (chartStyles.containerHeight * chartStyles.spacingMultiplier - 3)}
              fontSize="4"
              fill="#ff8c00"
              opacity="0.9"
              fontFamily="JetBrains Mono, Consolas, monospace"
              fontWeight="700"
              className="drop-shadow-sm"
            >
              TOP 10 ZONE
            </text>
            
            {/* Expired zone label */}
            <text
              x={22}
              y={profileMode ? (chartStyles.containerHeight * chartStyles.spacingMultiplier + 8) : (chartStyles.containerHeight * chartStyles.spacingMultiplier + 8)}
              fontSize="3"
              fill="#ff6b6b"
              opacity="0.7"
              fontFamily="JetBrains Mono, Consolas, monospace"
              fontWeight="600"
              className="drop-shadow-sm"
            >
              EXPIRED
            </text>
            
            {/* Orange midline indicators - more visible */}
            <circle
              cx={15}
              cy={profileMode ? (chartStyles.containerHeight * chartStyles.spacingMultiplier) : (chartStyles.containerHeight * chartStyles.spacingMultiplier)}
              r="2"
              fill="#ff8c00"
              opacity="1"
            />
            <circle
              cx={165}
              cy={profileMode ? (chartStyles.containerHeight * chartStyles.spacingMultiplier) : (chartStyles.containerHeight * chartStyles.spacingMultiplier)}
              r="2"
              fill="#ff8c00"
              opacity="1"
            />
          </g>
          
          {/* GUARANTEED connection with moderately squared curves */}
          
          {/* Approach 1: Moderately squared path with controlled curves */}
          <path
            d={(() => {
              if (rankData.length < 2) return '';
              
              let path = `M ${rankData[0].x} ${rankData[0].y}`;
              
              for (let i = 1; i < rankData.length; i++) {
                const current = rankData[i];
                const previous = rankData[i - 1];
                const prev = rankData[i - 2] || previous;
                const next = rankData[i + 1] || current;
                
                // Reduced parameters for more squared appearance
                const smoothness = 0.2; // Reduced from 0.35
                const tension = 0.1; // Reduced from 0.25
                
                // Calculate controlled directional vectors
                const prevVector = {
                  x: previous.x - prev.x,
                  y: previous.y - prev.y
                };
                
                const nextVector = {
                  x: next.x - current.x,
                  y: next.y - current.y
                };
                
                // Controlled control points for moderate curves
                const cp1x = previous.x + (current.x - previous.x) * smoothness + prevVector.x * tension;
                const cp1y = previous.y + (current.y - previous.y) * smoothness + prevVector.y * tension;
                
                const cp2x = current.x - (current.x - previous.x) * smoothness - nextVector.x * tension;
                const cp2y = current.y - (current.y - previous.y) * smoothness - nextVector.y * tension;
                
                // Create moderately squared curves
                path += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${current.x} ${current.y}`;
              }
              
              return path;
            })()}
            fill="none"
            stroke="#00d4aa"
            strokeWidth={chartStyles.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
            filter="url(#cryptoGlow)"
            className="transition-[stroke,opacity] duration-300"
          />
          
          {/* Approach 2: Moderately squared red overlay curves for deteriorating trends */}
          {rankData.slice(1).map((point, index) => {
            const prevPoint = rankData[index];
            const rankChange = point.rank - prevPoint.rank;
            
            // Only add red overlay for deteriorating segments with moderate curves
            if (rankChange > 0) {
              const prev = rankData[index - 1] || prevPoint;
              const next = rankData[index + 2] || point;
              
              const smoothness = 0.2; // Same moderate smoothness
              const tension = 0.1; // Same moderate tension
              
              const prevVector = {
                x: prevPoint.x - prev.x,
                y: prevPoint.y - prev.y
              };
              
              const nextVector = {
                x: next.x - point.x,
                y: next.y - point.y
              };
              
              const cp1x = prevPoint.x + (point.x - prevPoint.x) * smoothness + prevVector.x * tension;
              const cp1y = prevPoint.y + (point.y - prevPoint.y) * smoothness + prevVector.y * tension;
              
              const cp2x = point.x - (point.x - prevPoint.x) * smoothness - nextVector.x * tension;
              const cp2y = point.y - (point.y - prevPoint.y) * smoothness - nextVector.y * tension;
              
              return (
                <path
                  key={`red-moderate-curve-${index}`}
                  d={`M ${prevPoint.x} ${prevPoint.y} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${point.x} ${point.y}`}
                  fill="none"
                  stroke="#ff6b6b"
                  strokeWidth={chartStyles.strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.95"
                  filter="url(#cryptoGlow)"
                  className="transition-[stroke,opacity] duration-300"
                />
              );
            }
            return null;
          })}
          
          {/* Test dots - should be very visible */}
          {rankData.map((point, index) => (
            <g key={`test-dot-${index}`}>
              {/* Bright red circle that should be impossible to miss */}
              <circle
                cx={point.x}
                cy={point.y}
                r="12"
                fill="red"
                stroke="yellow"
                strokeWidth="4"
                opacity="1"
                onClick={() => {
                  console.log(`🔴 RED DOT CLICKED at ${point.x}, ${point.y}`);
                  if (clickedDay === point.day) {
                    setClickedPoint(null);
                    setClickedDay(null);
                    onClickDay?.(null);
                  } else {
                    setClickedPoint(point);
                    setClickedDay(point.day);
                    onClickDay?.(point.day);
                  }
                }}
                style={{ cursor: 'pointer' }}
              />
              
              {/* Blue rectangle for additional visibility */}
              <rect
                x={point.x - 8}
                y={point.y - 8}
                width="16"
                height="16"
                fill="blue"
                stroke="white"
                strokeWidth="2"
                opacity="0.8"
              />
              
              {/* Text to show coordinates */}
              <text
                x={point.x}
                y={point.y + 20}
                fill="white"
                fontSize="8"
                textAnchor="middle"
                fontWeight="bold"
              >
                {point.x},{point.y}
              </text>
            </g>
          ))}
          
          {/* Enhanced click indicator with Bitcoin-style animations */}
          {clickedDay !== null && (
            <g>
              {(() => {
                const clickedDayPoint = rankData[clickedDay];
                if (!clickedDayPoint) return null;
                return (
                  <>
                    <circle
                      cx={clickedDayPoint.x}
                      cy={clickedDayPoint.y}
                      r="3"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="2"
                      opacity="0.9"
                      filter="url(#strongGlow)"
                    />
                    <circle
                      cx={clickedDayPoint.x}
                      cy={clickedDayPoint.y}
                      r="5"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="1"
                      opacity="0.6"
                    >
                      <animate
                        attributeName="r"
                        values="3;8;3"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.6;0.1;0.6"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </>
                );
              })()}
            </g>
          )}
          
          {/* Compact starting position */}
          <g>
            <circle
              cx={rankData[0]?.x || 20}
              cy={rankData[0]?.y || 15}
              r="2"
              fill={rankData[0]?.color || '#64748b'}
              stroke="#ffffff"
              strokeWidth="1"
              filter="url(#cryptoGlow)"
            />
            <text
              x={rankData[0]?.x || 20}
              y={(rankData[0]?.y || 15) - 5}
              fontSize="4"
              fill="#e2e8f0"
              textAnchor="middle"
              fontFamily="JetBrains Mono, Consolas, monospace"
              fontWeight="600"
              className="drop-shadow-sm"
            >
              #{previousRank}
            </text>
          </g>
          
          {/* Compact current position */}
          <g>
            <circle
              cx={rankData[rankData.length - 1]?.x || 160}
              cy={rankData[rankData.length - 1]?.y || 15}
              r="2.5"
              fill={rankData[rankData.length - 1]?.color || '#64748b'}
              stroke="#ffffff"
              strokeWidth="1"
              filter="url(#cryptoGlow)"
              className="drop-shadow-md"
            />
            <circle
              cx={rankData[rankData.length - 1]?.x || 160}
              cy={rankData[rankData.length - 1]?.y || 15}
              r="4"
              fill="none"
              stroke={
                trend === 'up' ? '#00d4aa' : 
                trend === 'down' ? '#ff6b6b' : 
                '#26d0ce'
              }
              strokeWidth="1"
              opacity="0.5"
            >
              <animate
                attributeName="r"
                values="3;6;3"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.5;0.1;0.5"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <text
              x={rankData[rankData.length - 1]?.x || 160}
              y={(rankData[rankData.length - 1]?.y || 15) - 6}
              fontSize="5"
              fill="#e2e8f0"
              textAnchor="middle"
              fontFamily="JetBrains Mono, Consolas, monospace"
              fontWeight="600"
              className="drop-shadow-sm"
            >
              #{currentRank}
            </text>
          </g>
        </svg>
      </div>
      
      {/* Professional tooltip positioned outside chart area to avoid hiding dots */}
      {clickedPoint && (
        <div 
          className="absolute z-[999999999999999999] pointer-events-none"
          style={{
            left: `${clickedPoint.x}px`,
            top: clickedPoint.y < 30 
              ? `${clickedPoint.y + 15}px`  // Position well below for high dots - outside chart area
              : `${clickedPoint.y - 30}px`, // Position well above for low dots - outside chart area
            transform: 'translateX(-50%)',
          }}
        >
          <div className="bg-black/95 backdrop-blur border border-amber-400/70 rounded-lg px-2 py-1 shadow-2xl">
            <div className="text-white text-[5px] font-medium leading-none mb-1 font-mono">
              Day {clickedPoint.day + 1}
            </div>
            <div className={`text-[5px] font-bold leading-none font-mono ${
              Math.round(clickedPoint.rank) <= 10 
                ? 'text-amber-300' 
                : 'text-red-400'
            }`}>
              {Math.round(clickedPoint.rank) <= 10 
                ? `#${Math.round(clickedPoint.rank)}` 
                : 'EXPIRED'}
            </div>
          </div>
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 top-full"
            style={{
              width: 0,
              height: 0,
              borderLeft: '2px solid transparent',
              borderRight: '2px solid transparent',
              borderTop: '2px solid rgba(0, 0, 0, 0.7)',
            }}
          />
        </div>
      )}
    </div>
  );
};
