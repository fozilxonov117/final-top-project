import { useLang } from 'shared/lib/hooks/useLang';
import { cn } from 'shared/lib';

interface LanguageStatusProps {
  className?: string;
}

export const LanguageStatus = ({ className }: LanguageStatusProps) => {
  const { locale, t, formatDate, supportedLanguages, isLoading } = useLang();

  if (isLoading) {
    return (
      <div className={cn('text-sm text-gray-400', className)}>
        {t('loading')}
      </div>
    );
  }

  const languageNames = {
    ru: 'Русский',
    uz: 'O\'zbekcha',
    en: 'English'
  };

  return (
    <div className={cn('flex items-center gap-3 text-sm', className)}>
      <div className="flex items-center gap-1">
        <span className="text-gray-400">{t('language')}:</span>
        <span className="font-medium text-white">
          {languageNames[locale as keyof typeof languageNames] || locale}
        </span>
      </div>
      <div className="text-gray-500">•</div>
      <div className="text-gray-400">
        {formatDate(new Date(), { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </div>
      <div className="text-gray-500">•</div>
      <div className="text-gray-400">
        {supportedLanguages.length} {t('languagesSupported')}
      </div>
    </div>
  );
};
