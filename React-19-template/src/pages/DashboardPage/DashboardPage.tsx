import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import type { MonthFilter, Month, OperatorGroup } from 'shared/types';
import { QuarterTabs, LanguageSwitcher } from 'shared/ui';
import { OperatorGroup as OperatorGroupComponent } from 'widgets/OperatorGroup';
import { OperatorTable } from 'widgets/OperatorTable';
import { mockOperatorGroups } from 'shared/lib/mock/operatorData';

export const DashboardPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<MonthFilter>('current-month');
  const [selectedMonth, setSelectedMonth] = useState<Month | undefined>(undefined);
  const [selectedGroup, setSelectedGroup] = useState<OperatorGroup | null>(null);
  const [showTable, setShowTable] = useState(false);
  const [animateGroups, setAnimateGroups] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Trigger groups animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateGroups(true);
    }, 300); // Wait for header animation to start first
    
    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (filter: MonthFilter, month?: Month) => {
    setActiveFilter(filter);
    if (month) {
      setSelectedMonth(month);
    }
    console.log('Filter changed:', filter, month ? `Month: ${month}` : '');
    // TODO: Filter operators data based on the selected month/filter
  };

  const handleSeeAll = (groupId: string) => {
    navigate(`/operators/${groupId}`);
  };

  const handleOperatorClick = (operatorId: string) => {
    // Find the group containing this operator
    const operatorGroup = mockOperatorGroups.find(group => 
      group.operators.some(op => op.id === operatorId)
    );
    
    if (operatorGroup) {
      // Navigate to the operator table page with the specific operator profile open
      navigate(`/operators/${operatorGroup.id}/profile/${operatorId}`);
    }
  };

  const handleBackToGrid = () => {
    setShowTable(false);
    setSelectedGroup(null);
  };

  return (
    <div 
      className="relative h-screen bg-gray-50 flex flex-col overflow-hidden"
      style={{
        backgroundImage: "url('/assets/background (1)/255/green.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Header - Fixed */}
      <div className="relative z-50 bg-[#ffffff14] shadow-[0px_2px_15px_0px_rgba(0,0,0,0.5)] px-4 sm:px-8 py-4 flex-shrink-0 animate-slideInFromLeft">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-white animate-bounceIn">{t('topOperators')}</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap animation-delay-600">
            <QuarterTabs 
              activeFilter={activeFilter} 
              selectedMonth={selectedMonth}
              onFilterChange={handleFilterChange} 
            />
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto overflow-x-auto main-content-scroll smooth-scroll scroll-fade scrollable"
      >
        <div className="py-4 px-16  min-h-full flex items-center justify-center">
          {!showTable ? (
            /* Grid View */
            <div
              style={{
                width: '100%',
                maxWidth: '1792px',
                minWidth: '1792px',
                margin: '0 auto'
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-10 auto-rows-max"
            >
              {mockOperatorGroups.map((group) => (
                <div
                  key={group.id}
                  className={`opacity-0 transition-opacity duration-300 ${
                    animateGroups ? 'animate-modernFadeInUp' : ''
                  }`}
                >
                  <OperatorGroupComponent 
                    group={group} 
                    onSeeAll={() => handleSeeAll(group.id)}
                    onOperatorClick={handleOperatorClick}
                    animationDelay={200}
                  />
                </div>
              ))}
            </div>
          ) : (
            /* Table View */
            <div 
            style={{
                width: '100%',
                maxWidth: '1792px',
                minWidth: '1792px',
                margin: '0 auto'
              }}>
              {/* Back to Grid Button */}
              <div className="mb-3 flex items-center gap-4">
                <button
                  onClick={handleBackToGrid}
                  className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                >
                  <span className="text-lg">←</span>
                  <span className="font-medium">{t('back')}</span>
                </button>
                
                <div className="h-6 w-px bg-white/20" />
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  {t('operators')} - {selectedGroup?.title}
                </h1>
              </div>
              {/* Operator Table */}
              {selectedGroup && (
                <OperatorTable operators={selectedGroup.operators} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
