import { useState, useCallback } from 'react';

export type SlideDirection = 'right' | 'left' | 'up' | 'down';

interface UseSlideAwayOptions {
  duration?: number;
  onComplete?: () => void;
}

export const useSlideAway = (options: UseSlideAwayOptions = {}) => {
  const { duration = 600, onComplete } = options;
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState<SlideDirection>('right');

  const slideAway = useCallback((direction: SlideDirection = 'right') => {
    if (isSliding) return;
    
    setIsSliding(true);
    setSlideDirection(direction);
    
    // Complete the slide-away after animation duration
    setTimeout(() => {
      setIsSliding(false);
      onComplete?.();
    }, duration);
  }, [isSliding, duration, onComplete]);

  const getSlideAwayClass = () => {
    if (!isSliding) return '';
    
    switch (slideDirection) {
      case 'right':
        return 'animate-slideAwayToRight';
      case 'left':
        return 'animate-slideAwayToLeft';
      case 'up':
        return 'animate-slideAwayUp';
      case 'down':
        return 'animate-slideAwayDown';
      default:
        return 'animate-slideAwayToRight';
    }
  };

  return {
    slideAway,
    isSliding,
    slideDirection,
    getSlideAwayClass
  };
};

// Enhanced slide-away with gesture detection
export const useSmartSlideAway = (options: UseSlideAwayOptions = {}) => {
  const slideAwayHook = useSlideAway(options);
  
  const handleSmartSlideAway = useCallback((event?: React.MouseEvent | KeyboardEvent) => {
    let direction: SlideDirection = 'right';
    
    // Determine slide direction based on interaction context
    if (event && 'clientX' in event) {
      const screenWidth = window.innerWidth;
      const clickX = event.clientX;
      
      if (clickX < screenWidth * 0.3) {
        direction = 'left';
      } else if (clickX > screenWidth * 0.7) {
        direction = 'right';
      } else {
        // Center clicks slide up for a clean effect
        direction = 'up';
      }
    }
    
    slideAwayHook.slideAway(direction);
  }, [slideAwayHook]);

  return {
    ...slideAwayHook,
    handleSmartSlideAway
  };
};