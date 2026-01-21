import { useTranslation } from 'react-i18next';
import type { OperatorGroup as OperatorGroupType } from 'shared/types';
import { OperatorCard } from 'shared/ui/components/OperatorCard';
import { cn } from 'shared/lib';

interface OperatorGroupProps {
  group: OperatorGroupType;
  onSeeAll?: () => void;
  onOperatorClick?: (operatorId: string) => void;
  className?: string;
  animationDelay?: number;
}

export const OperatorGroup = ({ group, onSeeAll, onOperatorClick, className, animationDelay = 0 }: OperatorGroupProps) => {
  const { t } = useTranslation();
  // Get top 3 operators and sort them for display: 2nd, 1st, 3rd
  const topOperators = group.operators.slice(0, 3);
  const sortedForDisplay = [
    topOperators.find((op) => op.rank === 2), // Left position
    topOperators.find((op) => op.rank === 1), // Center position
    topOperators.find((op) => op.rank === 3), // Right position
  ].filter((operator): operator is NonNullable<typeof operator> => operator !== undefined);

  return (
    <div 
      className={cn(
        'rounded-lg bg-[#ffffff24] hover:scale-102 transition-all duration-300 ease-out pt-3 pb-3 px-4 rounded-xl shadow-lg hover:shadow-xl animate-modernFadeInUp',
        className
      )}
      style={{
        boxShadow: 'rgb(0 0 0 / 50%) 0px 2px 15px 0px',
        animationDelay: `${animationDelay}ms`
      }}
    >
      {/* Header */}
      <div className="mb-4 px-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white transition-colors duration-300">{group.title}</h2>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSeeAll?.();
          }}
          className="text-sm font-medium text-white hover:text-gray-400 transition-colors duration-300 cursor-pointer">
          {t('seeAll')}
        </button>
      </div>

      {/* Operators Grid */}
      <div className="flex justify-center items-end gap-0 operator-layout">
        {sortedForDisplay.map((operator) => (
          <OperatorCard 
            key={operator.id} 
            operator={operator} 
            className="operator-layout"
            onClick={onOperatorClick ? () => onOperatorClick(operator.id) : undefined}
          />
        ))}
      </div>
    </div>
  );
};
