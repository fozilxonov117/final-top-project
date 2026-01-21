import { useTranslation } from 'react-i18next';

export const Explanatories = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#ffffff00] rounded-xl shadow-lg p-4" style={{ boxShadow: 'rgb(255 255 255 / 50%) 0px 2px 15px 0px' }}>
      <h3 className="text-base font-bold text-white mb-2 flex justify-center">{t('explanatories')}</h3>
      <div className="grid grid-cols-1 gap-2">
        <div className="text-center">
          <div className="text-white/70 text-xs font-medium">{t('explanatories')}</div>
        </div>
      </div>
    </div>
  );
};
