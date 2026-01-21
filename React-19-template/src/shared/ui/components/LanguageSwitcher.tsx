import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from 'shared/lib';

const languages = [
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'uz', label: 'O\'zbekcha', flag: '🇺🇿' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
];

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsDropdownOpen(false);
  };

  return (
    <div className={cn('relative z-[100]', className)} ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
          'bg-[#ffffff14] backdrop-blur-md text-white hover:bg-[#ffffff30] border border-white/20',
          'group relative overflow-hidden'
        )}>
        <span className="text-base relative z-10">{currentLanguage.flag}</span>
        <span className="relative z-10">{currentLanguage.label}</span>
        <svg 
          className={cn(
            'w-4 h-4 transition-transform duration-200 relative z-10',
            isDropdownOpen && 'rotate-180'
          )}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute top-full mt-1 right-0 bg-[#ffffff14] backdrop-blur-md rounded-lg shadow-2xl border border-white/20 z-[9999] min-w-[160px] animate-slideInFromBottom">
          <div className="py-1 custom-scrollbar hide-scrollbar-x">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={cn(
                  'w-full text-left px-4 py-2 text-sm transition-colors duration-75 rounded-md mx-1 flex items-center gap-2',
                  i18n.language === language.code
                    ? 'bg-[#ffffff24] text-white font-medium'
                    : 'text-gray-200 hover:bg-[#ffffff20] hover:text-white',
                )}>
                <span className="text-base">{language.flag}</span>
                <span>{language.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
