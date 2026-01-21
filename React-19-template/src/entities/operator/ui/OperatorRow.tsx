import type { Operator } from 'shared/types';
import { GoldMedal, SilverMedal, BronzeMedal, StockChart, PointsWithBadge } from 'shared/ui';
import { MedalCounter } from 'features/operator-ranking';
import { cn } from 'shared/lib';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useCallback, memo } from 'react';

interface OperatorRowProps {
  operator: Operator;
  groupId?: string;
  selectedOperatorId?: string;
  isEven?: boolean;
}

const OperatorRowComponent = ({ operator, groupId, selectedOperatorId }: OperatorRowProps) => {
  const navigate = useNavigate();

  const handleRowClick = useCallback(() => {
    if (groupId) {
      navigate(`/operators/${groupId}/profile/${operator.id}`);
    }
  }, [groupId, navigate, operator.id]);

  // Memoize profile open state for performance
  const isProfileOpen = useMemo(() => !!selectedOperatorId, [selectedOperatorId]);
  
  // Unified animation system for smooth synchronization
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Master timing configuration for fast, flowing animations
  
  const unifiedTransition = useMemo(() => prefersReducedMotion ? {
    duration: 0.1
  } : {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
    mass: 0.8,
    velocity: 0
  }, [prefersReducedMotion]);

  const fastTransition = useMemo(() => prefersReducedMotion ? {
    duration: 0.1
  } : {
    type: "spring" as const,
    stiffness: 400,
    damping: 35,
    mass: 0.6,
    velocity: 2
  }, [prefersReducedMotion]);

  const chartAnimationVariants = useMemo(() => ({
    show: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0
    },
    hide: {
      opacity: 0,
      scale: 0.8,
      x: -30,
      y: 0
    }
  }), []);

  const elementFadeVariants = useMemo(() => ({
    normal: { 
      opacity: 1, 
      scale: 1
    },
    dimmed: { 
      opacity: 1, 
      scale: 1
    },
    reduced: { 
      opacity: 1, 
      scale: 1
    }
  }), []);

  const medalAnimationVariants = useMemo(() => ({
    leftPosition: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotateZ: 0,
      transition: fastTransition
    },
    rightPosition: {
      opacity: 1,
      x: 60,
      y: 0,
      scale: 1,
      rotateZ: 0,
      transition: fastTransition
    },
    exit: {
      opacity: 0,
      scale: 0.7,
      y: -3,
      transition: {
        type: "spring" as const,
        stiffness: 500,
        damping: 40,
        mass: 0.4
      }
    }
  }), [fastTransition]);
  // Memoize rank display to prevent re-rendering
  const rankDisplay = useMemo(() => {
    if (operator.rank === 1) {
      return <GoldMedal className="h-8 w-8" />;
    }
    if (operator.rank === 2) {
      return <SilverMedal className="h-8 w-8" />;
    }
    if (operator.rank === 3) {
      return <BronzeMedal className="h-8 w-8" />;
    }
    return (
      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-700 text-white text-sm font-semibold">
        {operator.rank}
      </div>
    );
  }, [operator.rank]);

  // Memoize rank row style
  const rankRowStyle = useMemo(() => {
    if (operator.rank === 1) {
      return 'bg-yellow-500/10 border-l-4 border-yellow-400';
    }
    if (operator.rank === 2) {
      return 'bg-gray-500/10 border-l-4 border-gray-400';
    }
    if (operator.rank === 3) {
      return 'bg-orange-500/10 border-l-4 border-orange-400';
    }
    return '';
  }, [operator.rank]);

  // Memoize stock trend
  const stockTrend = useMemo(() => {
    if (!operator.rankChange || operator.rankChange === 0) return 'neutral';
    // rankChange > 0 means position IMPROVED (better rank, lower number), so UP trend = GREEN
    // rankChange < 0 means position DECLINED (worse rank, higher number), so DOWN trend = RED
    return operator.rankChange > 0 ? 'up' : 'down';
  }, [operator.rankChange]);

  // Memoize rank movement calculations
  const rankMovement = useMemo(() => {
    const change = operator.rankChange || 0;
    const previousRank = operator.rank + change;
    const currentRank = operator.rank;
    
    return {
      change,
      previousRank,
      currentRank,
      isImprovement: change > 0,
      isDecline: change < 0,
      magnitude: Math.abs(change)
    };
  }, [operator.rank, operator.rankChange]);

  // Check if this operator is selected
  const isSelected = useMemo(() => selectedOperatorId === operator.id, [selectedOperatorId, operator.id]);

  // Memoize monthly achievements calculations
  const monthlyAchievements = useMemo(() => {
    // Count how many months the operator finished in top-3 (rank ≤ 3)
    const monthlyTop3Count = operator.monthlyRankings 
      ? operator.monthlyRankings.filter(rank => rank <= 3).length 
      : 0;
    
    const everReachedTop3 = monthlyTop3Count > 0;

    return {
      monthlyTop3Count,
      everReachedTop3
    };
  }, [operator.monthlyRankings]);

  return (
    <div 
      className={cn(
        'flex px-6 py-[8px] hover:bg-[#ffffff08] transition-colors duration-75 border-b h-[75px] border-white/5 last:border-b-0 cursor-pointer items-center',
        rankRowStyle,
        isSelected && 'bg-gradient-to-r from-[#ffffff24] to-[#ffffff18] shadow-lg shadow-black/50'
      )}
      style={{
        minHeight: '75px',
        maxHeight: '75px'
      }}
      onClick={handleRowClick}
    >
      {/* Left side - Operator Name and Rank Badge/Medal */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Rank Circle/Medal - Stays visible and in position during animation */}
        <motion.div 
          className="flex items-center justify-center"
          variants={elementFadeVariants}
          animate="normal"
          transition={unifiedTransition}
        >
          {rankDisplay}
        </motion.div>
        
        {/* Operator Avatar */}
        <img
          src={operator.avatar}
          alt={operator.name}
          className="h-12 w-12 min-w-[3rem] min-h-[3rem] rounded-full object-cover operator-avatar border-2 border-white/20 transition-[border-color,box-shadow] duration-75 group-hover:border-white/40 group-hover:shadow-lg flex-shrink-0"
          style={{
            objectPosition: 'center 20%', // Position the image to show head properly
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
          }}
        />
        
        {/* Operator Name - Fixed width to prevent layout shifts with fade animations */}
        <motion.div 
          variants={elementFadeVariants}
          animate={isProfileOpen ? 'dimmed' : 'normal'}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="font-medium text-lg text-white transition-colors duration-75 group-hover:text-blue-300 w-[380px] min-w-[380px] max-w-[380px] leading-tight"
          style={{ 
            willChange: 'auto', 
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            lineHeight: '1.25'
          }}
        >
          {operator.name}
        </motion.div>
      </div>

      {/* Right side - Stock Chart, Medal Count, Rank Change, and Metrics (separate columns) */}
      <div className="flex gap-8">
        {/* Stock Chart + Medal Count Combined Column - Medal moves into chart space when hidden */}
        <div className="flex items-center justify-end w-[200px] min-w-[200px] max-w-[200px] gap-1 relative">
          <AnimatePresence>
            {!isProfileOpen && (
              <>
                {/* Medal Count - Left position when chart is visible */}
                <motion.div 
                  key="medal-left"
                  className="flex items-center justify-center w-[60px] min-w-[60px] max-w-[60px] mr-4"
                  variants={medalAnimationVariants}
                  initial={{ opacity: 0, x: -20, scale: 0.8, y: 2 }}
                  animate="leftPosition"
                  exit="exit"
                  transition={unifiedTransition}
                  layout
                  style={{ willChange: 'transform, opacity' }}
                >
                  {monthlyAchievements.everReachedTop3 && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={fastTransition}
                    >
                      <MedalCounter count={monthlyAchievements.monthlyTop3Count} />
                    </motion.div>
                  )}
                </motion.div>
                
                {/* Stock Chart - Visible */}
                <motion.div
                  key="chart-visible"
                  variants={chartAnimationVariants}
                  initial="hide"
                  animate="show"
                  exit="hide"
                  transition={unifiedTransition}
                  layout
                  className="flex items-center"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <StockChart 
                    trend={stockTrend} 
                    className="" 
                    currentRank={rankMovement.currentRank}
                    previousRank={rankMovement.previousRank}
                    dailyRankings={operator.dailyRankings}
                  />
                </motion.div>
              </>
            )}
            {isProfileOpen && (
              /* Medal Count - Moves to right position when chart is hidden */
              <motion.div 
                key="medal-right"
                className="flex items-center justify-center w-[60px] min-w-[60px] max-w-[60px] mr-16"
                variants={medalAnimationVariants}
                initial={{ opacity: 0, x: -20, scale: 0.8, y: 2 }}
                animate="rightPosition"
                exit="exit"
                transition={unifiedTransition}
                layout
                style={{ willChange: 'transform, opacity' }}
              >
                {monthlyAchievements.everReachedTop3 && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <MedalCounter count={monthlyAchievements.monthlyTop3Count} />
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Connection line between chart and indicator */}
          <motion.div 
            className={cn(
              'w-1 h-6 rounded-full',
              rankMovement.isImprovement ? 'bg-green-400' : 
              rankMovement.isDecline ? 'bg-red-400' : 
              'bg-gray-400'
            )}
            animate={{ opacity: isProfileOpen ? 0.3 : 1 }}
            transition={unifiedTransition}
          />
          
          {/* Rank Change Indicator - positioned right next to stock chart */}
          <motion.div 
            className="flex items-center justify-center w-[40px] min-w-[40px] max-w-[40px]"
            animate={{
              opacity: selectedOperatorId ? 0.75 : 1,
              scale: selectedOperatorId ? 0.95 : 1
            }}
            transition={unifiedTransition}
          >
            {rankMovement.change !== 0 && (
              <motion.div 
                className={cn(
                  'text-sm flex items-center gap-1 font-bold px-2 py-1 rounded-lg transition-[background-color,border-color,box-shadow] duration-75 cursor-pointer',
                  rankMovement.isImprovement 
                    ? 'text-green-300 bg-green-500/20 border border-green-500/40 shadow-green-500/20 shadow-md hover:bg-green-500/30' 
                    : 'text-red-300 bg-red-500/20 border border-red-500/40 shadow-red-500/20 shadow-md hover:bg-red-500/30'
                )}
                whileHover={{ 
                  scale: 1.05,
                  transition: unifiedTransition
                }}
                whileTap={{ scale: 0.95 }}
                title={`${rankMovement.isImprovement ? 'Improved' : 'Declined'} by ${rankMovement.magnitude} position${rankMovement.magnitude > 1 ? 's' : ''}`}
              >
                  <span className="text-base font-black">{rankMovement.isImprovement ? '↑' : '↓'}</span>
                  <span className="font-mono font-bold">{rankMovement.magnitude}</span>
                </motion.div>
            )}
            {/* Enhanced neutral indicator */}
            {rankMovement.change === 0 && (
              <motion.div 
                className="text-sm flex items-center gap-1 font-medium text-gray-400 px-2 py-1 rounded-lg bg-gray-500/10 border border-gray-500/20" 
                title="No change in position"
                whileHover={{ 
                  scale: 1.02,
                  transition: unifiedTransition
                }}
              >
                <span className="text-gray-500 font-bold">−</span>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Count Column */}
        <motion.div 
          variants={elementFadeVariants}
          animate={isProfileOpen ? 'reduced' : 'normal'}
          transition={unifiedTransition}
          className="flex items-center justify-center w-[80px] min-w-[80px] max-w-[80px]"
          style={{ willChange: 'transform, opacity' }}
        >
          <motion.span 
            className="text-white font-medium group-hover:text-blue-300"
            whileHover={{ scale: 1.05 }}
            transition={fastTransition}
          >
            {operator.count}
          </motion.span>
        </motion.div>

        {/* KPI */}
        <motion.div 
          variants={elementFadeVariants}
          animate={isProfileOpen ? 'reduced' : 'normal'}
          transition={unifiedTransition}
          className="flex items-center justify-center w-[80px] min-w-[80px] max-w-[80px]"
          style={{ willChange: 'transform, opacity' }}
        >
          <motion.span 
            className="text-white font-medium group-hover:text-purple-300"
            whileHover={{ scale: 1.05 }}
            transition={fastTransition}
          >
            {operator.kpi}
          </motion.span>
        </motion.div>

        {/* Average */}
        <motion.div 
          variants={elementFadeVariants}
          animate={isProfileOpen ? 'reduced' : 'normal'}
          transition={unifiedTransition}
          className="flex items-center justify-center w-[80px] min-w-[80px] max-w-[80px]"
          style={{ willChange: 'transform, opacity' }}
        >
          <motion.span 
            className="text-white font-medium group-hover:text-cyan-300"
            whileHover={{ scale: 1.05 }}
            transition={fastTransition}
          >
            {operator.average}
          </motion.span>
        </motion.div>

        {/* Behavior */}
        <motion.div 
          variants={elementFadeVariants}
          animate={isProfileOpen ? 'reduced' : 'normal'}
          transition={unifiedTransition}
          className="flex items-center justify-center w-[80px] min-w-[80px] max-w-[80px]"
          style={{ willChange: 'transform, opacity' }}
        >
          <motion.span 
            className={cn(
              "font-semibold text-sm px-2.5 py-1 rounded-md transition-all duration-200",
              operator.behavior >= 8 ? "text-emerald-400 bg-emerald-500/20 group-hover:bg-emerald-500/30" :
              operator.behavior >= 6 ? "text-amber-400 bg-amber-500/20 group-hover:bg-amber-500/30" :
              "text-red-400 bg-red-500/20 group-hover:bg-red-500/30"
            )}
            whileHover={{ scale: 1.1 }}
            transition={fastTransition}
          >
            {operator.behavior}/10
          </motion.span>
        </motion.div>

        {/* Points */}
        <motion.div 
          variants={elementFadeVariants}
          animate={isProfileOpen ? 'dimmed' : 'normal'}
          transition={unifiedTransition}
          className="flex items-center justify-center w-[80px] min-w-[80px] max-w-[80px]"
          style={{ willChange: 'transform, opacity' }}
        >
          <motion.div
            className="text-green-400 font-bold text-base bg-green-500/20 px-3 py-1 rounded-lg group-hover:bg-green-500/30 group-hover:text-green-300 group-hover:shadow-lg transition-[background-color,color,box-shadow]"
            whileHover={{ 
              scale: 1.08,
              boxShadow: "0px 4px 12px rgba(34, 197, 94, 0.25)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={unifiedTransition}
          >
            <PointsWithBadge operator={operator} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const OperatorRow = memo(OperatorRowComponent, (prevProps, nextProps) => {
  // Custom comparison function for optimal performance
  return (
    prevProps.operator.id === nextProps.operator.id &&
    prevProps.operator.name === nextProps.operator.name &&
    prevProps.operator.rank === nextProps.operator.rank &&
    prevProps.groupId === nextProps.groupId &&
    prevProps.selectedOperatorId === nextProps.selectedOperatorId &&
    prevProps.isEven === nextProps.isEven
  );
});
