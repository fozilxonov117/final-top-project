import { useEffect, useState, useRef } from 'react';

interface PerformantAnimationOptions {
  delay?: number;
  duration?: number;
  easing?: string;
}

export const usePerformantStagger = (itemCount: number, baseDelay: number = 50) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // Clear any existing timeouts
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current = [];

    // Use requestAnimationFrame for smooth timing
    const scheduleAnimation = (index: number) => {
      const timeout = setTimeout(() => {
        requestAnimationFrame(() => {
          setVisibleItems(prev => new Set([...prev, index]));
        });
      }, index * baseDelay);
      
      timeoutsRef.current.push(timeout);
    };

    // Schedule all animations
    for (let i = 0; i < itemCount; i++) {
      scheduleAnimation(i);
    }

    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    };
  }, [itemCount, baseDelay]);

  const isVisible = (index: number) => visibleItems.has(index);

  return { isVisible };
};

export const useHardwareAcceleration = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Force hardware acceleration
    element.style.willChange = 'transform, opacity';
    element.style.backfaceVisibility = 'hidden';
    element.style.perspective = '1000px';
    element.style.transformStyle = 'preserve-3d';

    return () => {
      if (element) {
        element.style.willChange = 'auto';
      }
    };
  }, [ref]);
};

export const createPerformantAnimation = (
  element: HTMLElement,
  options: PerformantAnimationOptions = {}
): Promise<void> => {
  return new Promise((resolve) => {
    const {
      delay = 0,
      duration = 300,
      easing = 'cubic-bezier(0.4, 0, 0.2, 1)'
    } = options;

    // Set initial state
    element.style.transform = 'translate3d(0, 20px, 0) scale3d(0.98, 0.98, 1)';
    element.style.opacity = '0';
    element.style.willChange = 'transform, opacity';
    element.style.backfaceVisibility = 'hidden';

    setTimeout(() => {
      requestAnimationFrame(() => {
        // Apply transition
        element.style.transition = `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}`;
        
        // Animate to final state
        element.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1)';
        element.style.opacity = '1';

        // Clean up after animation
        setTimeout(() => {
          element.style.willChange = 'auto';
          element.style.transition = '';
          resolve();
        }, duration);
      });
    }, delay);
  });
};