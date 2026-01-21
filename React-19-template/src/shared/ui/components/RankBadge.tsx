import { cn } from 'shared/lib';
import { GoldMedal, SilverMedal, BronzeMedal } from './MedalIcons';

interface RankBadgeProps {
  rank: number;
  className?: string;
}

export const RankBadge = ({ rank, className }: RankBadgeProps) => {
  // Medal-style badges for top 3 ranks
  if (rank <= 3) {
    return (
      <div className={cn('relative flex items-center justify-center', className)}>
        <div className="transform transition-[transform,scale] duration-300 hover:scale-110 hover:rotate-12">
          {rank === 1 && <GoldMedal size={65} className="drop-shadow-lg" />}
          {rank === 2 && <SilverMedal size={60} className="drop-shadow-lg" />}
          {rank === 3 && <BronzeMedal size={55} className="drop-shadow-lg" />}  
        </div>
        
        {/* Optional glow effect */}
        <div className={cn(
          'absolute inset-0 rounded-full blur-md opacity-30 transition-opacity duration-300 hover:opacity-50',
          rank === 1 && 'bg-yellow-400',
          rank === 2 && 'bg-gray-400',
          rank === 3 && 'bg-amber-500'
        )}></div>
      </div>
    );
  }

  // Simple circular badge for ranks > 3
  return (
    <div 
      className={cn(
        'w-8 h-8 rounded-full flex items-center justify-center',
        'bg-gradient-to-br from-indigo-500 to-indigo-700',
        'border-2 border-indigo-400 shadow-lg shadow-indigo-500/30',
        'text-white font-bold text-sm',
        'transform transition-[transform,scale] duration-200 hover:scale-105',
        className
      )}
    >
      {rank}
    </div>
  );
};
