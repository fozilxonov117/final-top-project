import { useTranslation } from 'react-i18next';
import type { Operator } from 'shared/types';

interface BonusScoreDetailsProps {
  operator: Operator;
}

export const BonusScoreDetails = ({ operator }: BonusScoreDetailsProps) => {
  const { t } = useTranslation();

  const bonusScores = operator.bonusScores || [];
  const totalBonus = bonusScores.reduce((sum, bonus) => sum + bonus.amount, 0);

  if (bonusScores.length === 0) {
    return null;
  }

  return (
    <div 
      className="bg-[#ffffff00] rounded-xl shadow-lg p-4" 
      style={{ boxShadow: 'rgb(255 255 255 / 50%) 0px 2px 15px 0px' }}
    >
      <h3 className="text-base font-bold text-white mb-3 flex justify-center">
        {t('bonusScores')}
      </h3>
      
      <div className="space-y-2">
        {bonusScores.map((bonus) => (
          <div 
            key={bonus.id} 
            className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
          >
            <div className="flex-1">
              <div className="text-white/90 text-sm font-medium">
                {t(`bonusTypes.${bonus.type}`)}
              </div>
              {bonus.description && (
                <div className="text-white/60 text-xs mt-0.5">
                  {bonus.description}
                </div>
              )}
            </div>
            <div className="text-green-400 font-bold text-sm ml-3">
              +{bonus.amount}
            </div>
          </div>
        ))}
        
        {bonusScores.length > 1 && (
          <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between">
            <div className="text-white/90 font-semibold text-sm">
              {t('totalBonus')}:
            </div>
            <div className="text-green-400 font-bold text-base">
              +{totalBonus}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
