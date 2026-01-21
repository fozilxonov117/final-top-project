import { useState, useEffect } from 'react';
import { cn } from 'shared/lib';

interface BackToTopProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export const BackToTop = ({ targetRef, className }: BackToTopProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (targetRef.current) {
        const { scrollTop } = targetRef.current;
        setIsVisible(scrollTop > 300);
      }
    };

    const scrollElement = targetRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [targetRef]);

  const scrollToTop = () => {
    if (targetRef.current) {
      targetRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-8 right-8 z-50 p-3 rounded-full bg-[#ffffff20] backdrop-blur-md',
        'text-white hover:bg-[#ffffff35] transition-[background-color,transform,box-shadow,border-color] duration-500 shadow-lg',
        'hover:scale-125 hover:shadow-2xl border border-white/20 hover:border-blue-400/50',
        'hover:rotate-12 active:scale-110 active:rotate-6',
        'animate-float hover:animate-glow group relative overflow-hidden',
        isVisible ? 'translate-y-0 opacity-100 animate-bounceIn' : 'translate-y-16 opacity-0',
        'pointer-events-auto',
        className
      )}
      aria-label="Back to top"
    >
      {/* Sparkle particles */}
      <div className="absolute top-1 right-1 w-1 h-1 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-sparkle"></div>
      <div className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-blue-300/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-100 animate-pulse"></div>
      
      <svg 
        className="w-5 h-5 relative z-10 transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 10l7-7m0 0l7 7m-7-7v18"
          className="transition-[stroke] duration-300 group-hover:stroke-blue-200"
        />
      </svg>
    </button>
  );
};
