import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  fps: number;
  renderTime: number;
  isSmooth: boolean;
}

export const usePerformanceMonitor = (enabled: boolean = false) => {
  const metricsRef = useRef<PerformanceMetrics>({ fps: 60, renderTime: 0, isSmooth: true });
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const renderStartRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    let animationId: number;
    
    const measurePerformance = () => {
      const now = performance.now();
      frameCountRef.current++;
      
      // Calculate FPS every second
      if (now - lastTimeRef.current >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / (now - lastTimeRef.current));
        
        metricsRef.current = {
          fps,
          renderTime: now - renderStartRef.current,
          isSmooth: fps >= 55 // Consider smooth if above 55fps
        };
        
        // Log performance warnings
        if (fps < 30) {
          console.warn(`⚠️ Low FPS detected: ${fps}fps - Animation performance may be poor`);
        } else if (fps < 55) {
          console.warn(`⚡ Moderate FPS: ${fps}fps - Consider optimizing animations`);
        } else {
          console.log(`✅ Smooth performance: ${fps}fps`);
        }
        
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }
      
      renderStartRef.current = now;
      animationId = requestAnimationFrame(measurePerformance);
    };

    animationId = requestAnimationFrame(measurePerformance);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [enabled]);

  const getMetrics = () => metricsRef.current;
  
  const startMonitoring = () => {
    console.log('🚀 Performance monitoring started - Watch console for FPS reports');
  };

  return { getMetrics, startMonitoring };
};