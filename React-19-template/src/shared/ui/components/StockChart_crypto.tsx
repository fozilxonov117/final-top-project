import { cn } from 'shared/lib';
import { useState } from 'react';

interface StockChartProps {
  trend: 'up' | 'down' | 'neutral';
  className?: string;
  currentRank?: number;
  previousRank?: number;
  onClickDay?: (day: number | null) => void;
}

export const StockChart = ({ trend, className, currentRank = 5, previousRank = 8, onClickDay }: StockChartProps) => {
  const [clickedPoint, setClickedPoint] = useState<{x: number, y: number, rank: number, day: number} | null>(null);
  const [clickedDay, setClickedDay] = useState<number | null>(null);
  
  // Generate cryptocurrency-style rank progression data
  const generateRankData = () => {
    const days = 10; // Reduced to 10 for much longer spacing between dots
    const width = 320; // Much wider for crypto-style spacing
    const height = 50; // Taller for better visualization
    const data: Array<{x: number, y: number, rank: number, color: string, day: number}> = [];
    
    const startRank = previousRank;
    const endRank = currentRank;
    const totalChange = endRank - startRank;
    
    for (let day = 0; day < days; day++) {
      const x = 40 + (day / (days - 1)) * (width - 80); // Much wider spacing
      
      let dayRank: number;
      
      if (day === days - 1) {
        dayRank = currentRank;
      } else {
        const progressRatio = day / (days - 1);
        dayRank = startRank + (totalChange * progressRatio);
        
        // More dramatic crypto-style volatility
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
      }
      
      // Convert rank to Y position
      const cellPosition = Math.ceil(Math.min(dayRank, 10) / 2);
      const midlinePosition = 0.75;
      
      let y;
      if (dayRank <= 10) {
        y = 8 + ((cellPosition - 1) / 5) * (height * midlinePosition - 8);
      } else {
        y = (height * midlinePosition) + ((dayRank - 10) / 15) * (height * (1 - midlinePosition) - 8);
      }
      
      // Bitcoin-style color scheme
      const isInTop10 = dayRank <= 10;
      let color = '#64748b';
      
      if (day > 0) {
        const prevRank = data[day - 1].rank;
        const wasInTop10 = prevRank <= 10;
        const rankChange = dayRank - prevRank;
        
        if (isInTop10 && !wasInTop10) {
          color = '#00d4aa'; // Crypto bright green
        } else if (!isInTop10 && wasInTop10) {
          color = '#ff6b6b'; // Crypto bright red
        } else if (Math.abs(rankChange) >= 2) {
          color = rankChange < 0 ? '#00c896' : '#ff5757';
        } else if (Math.abs(rankChange) >= 1) {
          color = rankChange < 0 ? '#26d0ce' : '#ff8a80';
        } else {
          color = isInTop10 ? '#36f5c4' : '#94a3b8';
        }
      } else {
        color = isInTop10 ? '#00d4aa' : '#ff6b6b';
      }
      
      data.push({ x, y, rank: dayRank, color, day });
    }
    
    return data;
  };

  const rankData = generateRankData();

  return (
    <div className={cn('flex items-center justify-center relative group', className)}>
      <div 
        className={cn(
          'bg-gradient-to-br from-gray-900/95 via-slate-900/95 to-black/95 backdrop-blur-2xl rounded-2xl p-6 border-2 transition-[border-color,box-shadow,transform] duration-700 shadow-2xl overflow-hidden relative',
          'hover:shadow-4xl hover:scale-[1.01] transform-gpu',
          trend === 'up' ? 'border-emerald-500/40 shadow-emerald-500/20 hover:border-emerald-400/60' :
          trend === 'down' ? 'border-red-500/40 shadow-red-500/20 hover:border-red-400/60' :
          'border-cyan-500/40 shadow-cyan-500/20 hover:border-cyan-400/60'
        )}
      >
        {/* Animated background shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-2000"></div>
        
        <svg width="320" height="50" className="overflow-visible relative z-10 h-[86px]">
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
          
          {/* Crypto-style background */}
          <rect width="320" height="50" fill="url(#chartBgGradient)" rx="10" />
          
          {/* Animated grid lines */}
          {Array.from({ length: 6 }, (_, i) => (
            <line
              key={`grid-${i}`}
              x1={40}
              y1={8 + (i / 5) * (50 * 0.75 - 8)}
              x2={280}
              y2={8 + (i / 5) * (50 * 0.75 - 8)}
              stroke="url(#cryptoGridGradient)"
              strokeWidth="1"
              className="animate-pulse"
              style={{
                animationDelay: `${i * 0.4}s`,
                animationDuration: '3s'
              }}
            />
          ))}
          
          {/* Modern position labels */}
          {Array.from({ length: 5 }, (_, i) => {
            const position1 = i * 2 + 1;
            const position2 = i * 2 + 2;
            const y = 8 + (i / 5) * (50 * 0.75 - 8);
            
            return (
              <g key={`positions-${i}`}>
                <text
                  x={6}
                  y={y + 3}
                  fontSize="8"
                  fill="#e2e8f0"
                  fontFamily="JetBrains Mono, Consolas, monospace"
                  fontWeight="700"
                  className="drop-shadow-lg"
                >
                  {position1}
                </text>
                <text
                  x={16}
                  y={y + 3}
                  fontSize="7"
                  fill="#94a3b8"
                  fontFamily="JetBrains Mono, Consolas, monospace"
                  fontWeight="500"
                >
                  {position2}
                </text>
              </g>
            );
          })}
          
          {/* Crypto-style Top 10 boundary */}
          <line
            x1={40}
            y1={50 * 0.75}
            x2={280}
            y2={50 * 0.75}
            stroke="#fbbf24"
            strokeWidth="2"
            strokeDasharray="6,3"
            opacity="0.8"
            filter="url(#cryptoGlow)"
          />
          
          {/* TOP 10 label with crypto styling */}
          <text
            x={45}
            y={50 * 0.75 - 3}
            fontSize="7"
            fill="#fbbf24"
            opacity="0.9"
            fontFamily="JetBrains Mono, Consolas, monospace"
            fontWeight="800"
            className="drop-shadow-md"
          >
            TOP 10
          </text>
          
          {/* Bitcoin-style line segments with glow */}
          {rankData.slice(1).map((point, index) => {
            const prevPoint = rankData[index];
            return (
              <line
                key={index}
                x1={prevPoint.x}
                y1={prevPoint.y}
                x2={point.x}
                y2={point.y}
                stroke={point.color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.9"
                filter="url(#cryptoGlow)"
                className="transition-[opacity,stroke-width] duration-500 hover:opacity-100 hover:stroke-width-5"
              />
            );
          })}
          
          {/* Minimized interactive dots with crypto animations */}
          {rankData.map((point, index) => (
            <g key={`crypto-point-${index}`}>
              {/* Larger clickable area but invisible */}
              <circle
                cx={point.x}
                cy={point.y}
                r="8"
                fill="transparent"
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
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
              />
              
              {/* Minimized visible dot - much smaller */}
              <circle
                cx={point.x}
                cy={point.y}
                r="1.5"
                fill={point.color}
                stroke="#ffffff"
                strokeWidth="0.5"
                opacity="0.7"
                filter="url(#cryptoGlow)"
                className="hover:opacity-100 hover:r-3 transition-[opacity,r] duration-300 pointer-events-none"
                 onClick={(e) => {
                  e.stopPropagation();
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
              />
              
              {/* Crypto-style pulse ring on hover */}
              <circle
                cx={point.x}
                cy={point.y}
                r="6"
                fill="none"
                stroke={point.color}
                strokeWidth="1"
                opacity="0"
                className="hover:opacity-40 transition-opacity duration-300 pointer-events-none"
              >
                <animate
                  attributeName="r"
                  values="3;12;3"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.4;0.1;0.4"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
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
                      r="5"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="3"
                      opacity="0.9"
                      filter="url(#strongGlow)"
                    />
                    <circle
                      cx={clickedDayPoint.x}
                      cy={clickedDayPoint.y}
                      r="8"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="1.5"
                      opacity="0.6"
                    >
                      <animate
                        attributeName="r"
                        values="5;15;5"
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
          
          {/* Enhanced starting position */}
          <g>
            <circle
              cx={rankData[0]?.x || 40}
              cy={rankData[0]?.y || 20}
              r="4"
              fill={rankData[0]?.color || '#64748b'}
              stroke="#ffffff"
              strokeWidth="2"
              filter="url(#cryptoGlow)"
            />
            <text
              x={rankData[0]?.x || 40}
              y={(rankData[0]?.y || 20) - 8}
              fontSize="7"
              fill="#e2e8f0"
              textAnchor="middle"
              fontFamily="JetBrains Mono, Consolas, monospace"
              fontWeight="700"
              className="drop-shadow-lg"
            >
              #{previousRank}
            </text>
            <text
              x={rankData[0]?.x || 40}
              y={(rankData[0]?.y || 20) + 15}
              fontSize="5"
              fill="#94a3b8"
              textAnchor="middle"
              fontFamily="JetBrains Mono, Consolas, monospace"
              fontWeight="600"
              opacity="0.8"
            >
              START
            </text>
          </g>
          
          {/* Enhanced current position with crypto-style animation */}
          <g>
            <circle
              cx={rankData[rankData.length - 1]?.x || 280}
              cy={rankData[rankData.length - 1]?.y || 20}
              r="5"
              fill={rankData[rankData.length - 1]?.color || '#64748b'}
              stroke="#ffffff"
              strokeWidth="2"
              filter="url(#strongGlow)"
              className="drop-shadow-lg"
            />
            <circle
              cx={rankData[rankData.length - 1]?.x || 280}
              cy={rankData[rankData.length - 1]?.y || 20}
              r="8"
              fill="none"
              stroke={
                trend === 'up' ? '#00d4aa' : 
                trend === 'down' ? '#ff6b6b' : 
                '#26d0ce'
              }
              strokeWidth="2"
              opacity="0.7"
            >
              <animate
                attributeName="r"
                values="5;12;5"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.7;0.2;0.7"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <text
              x={rankData[rankData.length - 1]?.x || 280}
              y={(rankData[rankData.length - 1]?.y || 20) - 10}
              fontSize="8"
              fill="#e2e8f0"
              textAnchor="middle"
              fontFamily="JetBrains Mono, Consolas, monospace"
              fontWeight="700"
              className="drop-shadow-lg"
            >
              #{currentRank}
            </text>
            <text
              x={rankData[rankData.length - 1]?.x || 280}
              y={(rankData[rankData.length - 1]?.y || 20) + 16}
              fontSize="5"
              fill={
                trend === 'up' ? '#00d4aa' : 
                trend === 'down' ? '#ff6b6b' : 
                '#fbbf24'
              }
              textAnchor="middle"
              fontFamily="JetBrains Mono, Consolas, monospace"
              fontWeight="700"
              opacity="0.9"
              className="drop-shadow-md"
            >
              CURRENT
            </text>
          </g>
        </svg>
      </div>
      
      {/* Bitcoin-style glassmorphism tooltip */}
      {clickedPoint && (
        <div 
          className="absolute z-50 pointer-events-none"
          style={{
            left: `${clickedPoint.x - 20}px`,
            top: `${clickedPoint.y - 35}px`,
          }}
        >
          <div className="bg-black/80 backdrop-blur-md border border-amber-400/50 rounded-lg px-2.5 py-1.5 shadow-2xl min-w-[45px] text-center">
            <div className="text-white text-[8px] font-bold leading-none mb-1 font-mono">
              Day {clickedPoint.day + 1}
            </div>
            <div className="text-amber-300 text-[8px] font-bold leading-none font-mono">
              Rank #{Math.round(clickedPoint.rank)}
            </div>
          </div>
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 top-full"
            style={{
              width: 0,
              height: 0,
              borderLeft: '3px solid transparent',
              borderRight: '3px solid transparent',
              borderTop: '3px solid rgba(251, 191, 36, 0.5)',
            }}
          />
        </div>
      )}
    </div>
  );
};
