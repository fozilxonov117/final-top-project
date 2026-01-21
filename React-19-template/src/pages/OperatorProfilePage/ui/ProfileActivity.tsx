import type { Operator } from 'shared/types';

interface ProfileActivityProps {
  operator: Operator;
}

export const ProfileActivity = ({ operator }: ProfileActivityProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 h-full">
      {/* Profile Stock Chart with larger dimensions */}
      <div className="w-full h-full flex items-center justify-center min-h-[600px]">
        <div className="w-full h-full">
          {/* Note: ProfileStockChart is now defined in OperatorProfilePage.tsx */}
          <div className="text-white text-center">
            <p>Profile Stock Chart will be integrated here</p>
            <p className="text-sm text-gray-400 mt-2">Operator: {operator.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
