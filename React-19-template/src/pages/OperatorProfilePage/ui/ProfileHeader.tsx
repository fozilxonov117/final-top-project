import type { Operator } from 'shared/types';

interface ProfileHeaderProps {
  operator: Operator;
}

export const ProfileHeader = ({ operator }: ProfileHeaderProps) => {

  // Calculate position suffix (1st, 2nd, 3rd, etc.)
  const getPositionSuffix = (rank: number) => {
    if (rank % 10 === 1 && rank % 100 !== 11) return 'st';
    if (rank % 10 === 2 && rank % 100 !== 12) return 'nd';
    if (rank % 10 === 3 && rank % 100 !== 13) return 'rd';
    return 'th';
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between">
        {/* Left side - Profile Info */}
        <div className="flex items-center gap-6">
          {/* Profile Picture */}
          <div className="relative">
            <img
              src={operator.avatar}
              alt={operator.name}
              className="w-20 h-20 rounded-full border-4 border-white/20 object-cover"
            />
            {/* Rank badge */}
            <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center border-2 border-white">
              {operator.rank}
            </div>
          </div>

          {/* Name and ID */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">
              {operator.name}
            </h1>
            <p className="text-white/70 text-sm">
              ID: {operator.id.padStart(7, '0')}
            </p>
          </div>
        </div>

        {/* Right side - Leaderboard Button */}
        <div className="flex items-center gap-4">
          <div className="bg-transparent border border-green-500/50 hover:border-green-400/70 transition-colors rounded-lg px-6 py-3 text-white font-semibold">
            <div className="text-center">
              <div className="text-sm opacity-80">Leaderboard</div>
              <div className="text-lg font-bold text-green-400">
                {operator.rank}{getPositionSuffix(operator.rank)} place
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
