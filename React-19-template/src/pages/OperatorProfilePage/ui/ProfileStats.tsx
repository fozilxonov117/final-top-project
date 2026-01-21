import type { Operator } from 'shared/types';
import { PointsWithBadge } from 'shared/ui';

interface ProfileStatsProps {
  operator: Operator;
}

export const ProfileStats = ({ operator }: ProfileStatsProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 ">
      <div className="grid grid-cols-4 gap-6">
        {/* Count */}
        <div className="text-center">
          <div className="text-white/70 text-sm font-medium mb-2">Count</div>
          <div className="text-3xl font-bold text-white">{operator.count}</div>
        </div>

        {/* Monthly Average */}
        <div className="text-center">
          <div className="text-white/70 text-sm font-medium mb-2">Monthly Average</div>
          <div className="text-3xl font-bold text-white">{operator.average}</div>
        </div>

        {/* KPI */}
        <div className="text-center">
          <div className="text-white/70 text-sm font-medium mb-2">KPI</div>
          <div className="text-3xl font-bold text-white">{operator.kpi}</div>
        </div>

        {/* Points */}
        <div className="text-center">
          <div className="text-white/70 text-sm font-medium mb-2">Points</div>
          <div className="text-3xl font-bold text-white">
            <PointsWithBadge 
              operator={operator}
              className="text-3xl font-bold"
              badgeClassName="-top-3 -right-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
