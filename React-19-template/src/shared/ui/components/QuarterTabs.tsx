import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { MonthFilter, Month } from 'shared/types';
import { cn } from 'shared/lib';

interface MonthTabsProps {
  activeFilter: MonthFilter;
  selectedMonth?: Month;
  onFilterChange: (filter: MonthFilter, month?: Month) => void;
  className?: string;
}

export const QuarterTabs = ({ activeFilter, selectedMonth, onFilterChange, className }: MonthTabsProps) => {
  const { t } = useTranslation();
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

  const months = [
    { value: '01' as Month, label: t('months.january') },
    { value: '02' as Month, label: t('months.february') },
    { value: '03' as Month, label: t('months.march') },
    { value: '04' as Month, label: t('months.april') },
    { value: '05' as Month, label: t('months.may') },
    { value: '06' as Month, label: t('months.june') },
    { value: '07' as Month, label: t('months.july') },
    { value: '08' as Month, label: t('months.august') },
    { value: '09' as Month, label: t('months.september') },
    { value: '10' as Month, label: t('months.october') },
    { value: '11' as Month, label: t('months.november') },
    { value: '12' as Month, label: t('months.december') },
  ];

  const handleMonthSelect = (month: Month) => {
    onFilterChange('select-month', month);
    setIsDropdownOpen(false);
  };

  const getSelectedMonthLabel = () => {
    if (selectedMonth) {
      return months.find(m => m.value === selectedMonth)?.label || t('selectMonth');
    }
    return t('selectMonth');
  };

  return (
    <div className={cn('flex gap-2 items-center', className)}>
      {/* Last Month Button */}
      <button
        onClick={() => onFilterChange('last-month')}
        className={cn(
          'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
          activeFilter === 'last-month'
            ? 'bg-[#ffffff24] text-white'
            : 'text-gray-200 hover:text-gray-900 hover:bg-gray-100',
        )}>
        {t('lastMonth')}
      </button>

      {/* Current Month Button */}
      <button
        onClick={() => onFilterChange('current-month')}
        className={cn(
          'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
          activeFilter === 'current-month'
            ? 'bg-[#ffffff24] text-white'
            : 'text-gray-200 hover:text-gray-900 hover:bg-gray-100',
        )}>
        {t('currentMonth')}
      </button>

      {/* Month Selector Dropdown */}
      <div className="relative z-[100]" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2',
            activeFilter === 'select-month'
              ? 'bg-[#ffffff24] text-white'
              : 'text-gray-200 hover:text-gray-900 hover:bg-gray-100',
          )}>
          {activeFilter === 'select-month' ? getSelectedMonthLabel() : t('selectMonth')}
          <svg 
            className={cn('w-4 h-4 transition-transform', isDropdownOpen && 'rotate-180')}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full mt-1 right-0 bg-[#ffffff14] backdrop-blur-md rounded-lg shadow-2xl border border-white/20 z-[9999] min-w-[160px]">
            <div className="py-1 max-h-48 overflow-y-auto custom-scrollbar hide-scrollbar-x">
              {months.map((month) => (
                <button
                  key={month.value}
                  onClick={() => handleMonthSelect(month.value)}
                  className={cn(
                    'w-full text-left px-4 py-2 text-sm transition-colors rounded-md mx-1',
                    selectedMonth === month.value
                      ? 'bg-[#ffffff24] text-white font-medium'
                      : 'text-gray-200 hover:bg-[#ffffff14] hover:text-white',
                  )}>
                  {month.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
