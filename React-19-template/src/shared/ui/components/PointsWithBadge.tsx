import type { Operator } from 'shared/types';
import { calculateTotalBonus } from 'shared/lib';
import { cn } from 'shared/lib';

interface PointsWithBadgeProps {
  operator: Operator;
  className?: string;
  badgeClassName?: string;
  showBadge?: boolean;
}

/**
 * Display points with a notification-style badge for bonus scores
 * Similar to notification badges on icons
 */
export const PointsWithBadge = ({ 
  operator, 
  className = '', 
  badgeClassName = '',
  showBadge = true 
}: PointsWithBadgeProps) => {
  const bonusPoints = calculateTotalBonus(operator);
  const hasBonus = bonusPoints > 0;

  return (
    <div className="relative inline-flex items-center">
      <span className={className}>
        {operator.points}
      </span>
      {hasBonus && showBadge && (
        <span 
          className={cn(
            'absolute -top-2 left-11 min-w-[20px] h-4.5 px-1.5 flex items-center justify-center',
            'bg-green-500 text-white text-[10px] font-bold rounded-full',
            'shadow-lg shadow-green-500/50',
            badgeClassName
          )}
        >
          +{bonusPoints}
        </span>
      )}
    </div>
  );
};
