import { useParams, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState, useMemo } from 'react';
import { BackToTop } from 'shared/ui';
import { OptimizedStockChart } from '../../shared/ui/OptimizedStockChart/OptimizedStockChart';
import { mockOperatorGroups } from 'shared/lib/mock/operatorData';
import { ProfileHeader } from './ui/ProfileHeader';
import { ProfileStats } from './ui/ProfileStats';
import { YesterdayStats } from './ui/YesterdayStats';
import { BonusScoreDetails } from 'features/operator-ranking';
import type { Operator } from 'shared/types';
import { usePerformantStagger, useHardwareAcceleration } from '../../shared/hooks/usePerformantAnimation';
import { usePerformanceMonitor } from '../../shared/hooks/usePerformanceMonitor';
import { useSmartSlideAway } from '../../shared/hooks/useSlideAway';




export const OperatorProfilePage = () => {
  const { operatorId } = useParams<{ operatorId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Performance state management
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  // Performance optimized staggered animation system
  const { isVisible } = usePerformantStagger(6, 40); // 6 elements, 40ms stagger
  
  // Hardware acceleration for the main container
  useHardwareAcceleration(containerRef as React.RefObject<HTMLElement>);
  
  // Performance monitoring (disabled by default, can be enabled for testing)
  const { startMonitoring } = usePerformanceMonitor(false);
  
  // Smart slide-away animation system with optimized timing
  const { handleSmartSlideAway, getSlideAwayClass, isSliding } = useSmartSlideAway({
    duration: 800, // Match the CSS animation duration
    onComplete: () => {
      navigate(-1);
    }
  });
  
  // Start performance monitoring on development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      startMonitoring();
    }
    setIsPageLoaded(true);
  }, [startMonitoring]);

  // Memoized operator finder for performance
  const operator = useMemo((): Operator | undefined => {
    for (const group of mockOperatorGroups) {
      const foundOperator = group.operators.find(op => op.id === operatorId);
      if (foundOperator) return foundOperator;
    }
    return undefined;
  }, [operatorId]);

  if (!operator) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">{t('operatorNotFound')}</h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('backToDashboard')}
          </button>
        </div>
      </div>
    );
  }

  const handleBack = (event?: React.MouseEvent) => {
    event?.preventDefault();
    handleSmartSlideAway(event);
  };

  return (
    <div 
      ref={scrollRef}
      className={`min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-black overflow-auto ${getSlideAwayClass()}`}
      style={{
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      }}
    >
      <div className="container mx-auto px-4 py-6">
        <div 
          ref={containerRef}
          style={{
            width: '100%',
            maxWidth: '1792px',
            minWidth: '1792px',
            margin: '0 auto',
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform, opacity'
          }}
          className="space-y-6"
        >
          {/* Back Button */}
          <button
            onClick={handleBack}
            className={`flex items-center gap-2 text-white hover:text-gray-300 transition-all duration-200 mb-6 ${
              !isSliding && isVisible(0) && isPageLoaded
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
            style={{
              transform: (!isSliding && isVisible(0) && isPageLoaded) ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'transform, opacity'
            }}
          >
            <span className="text-lg">←</span>
            <span className="font-medium">{t('back')}</span>
          </button>

          {/* Profile Header */}
          <div 
            className={`transition-all duration-200 ${
              !isSliding && isVisible(1) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
            style={{
              transform: (!isSliding && isVisible(1)) ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'transform, opacity'
            }}
          >
            <ProfileHeader operator={operator} />
          </div>

          {/* Profile Stats */}
          <div 
            className={`transition-all duration-200 ${
              !isSliding && isVisible(2) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
            style={{
              transform: (!isSliding && isVisible(2)) ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'transform, opacity'
            }}
          >
            <ProfileStats operator={operator} />
          </div>

          {/* Yesterday Stats */}
          <div 
            className={`transition-all duration-200 ${
              !isSliding && isVisible(3) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
            style={{
              transform: (!isSliding && isVisible(3)) ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'transform, opacity'
            }}
          >
            <YesterdayStats operator={operator} />
          </div>

          {/* Bonus Score Details */}
          <div 
            className={`transition-all duration-200 ${
              !isSliding && isVisible(4) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
            style={{
              transform: (!isSliding && isVisible(4)) ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'transform, opacity'
            }}
          >
            <BonusScoreDetails operator={operator} />
          </div>

          {/* Activity Section with Dedicated Profile Stock Chart */}
          <div 
            className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transition-all duration-200 ${
              !isSliding && isVisible(5) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
            style={{
              transform: (!isSliding && isVisible(5)) ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'transform, opacity'
            }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Activity Chart</h3>
            <div className="w-full h-[500px]">
              <OptimizedStockChart
                trend={(() => {
                  const change = operator.rankChange || 0;
                  if (change > 0) return 'up';
                  if (change < 0) return 'down';
                  return 'neutral';
                })()}
                currentRank={operator.rank}
                previousRank={operator.rank + (operator.rankChange || 0)}
                className="w-full h-full"
                fullSize={true}
                profileInfoMode={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <BackToTop targetRef={scrollRef} />
    </div>
  );
};
