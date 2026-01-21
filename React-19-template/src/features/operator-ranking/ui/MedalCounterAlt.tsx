import { cn } from 'shared/lib';

interface MedalCounterAltProps {
  count: number;
  className?: string;
}

export const MedalCounterAlt = ({ count, className }: MedalCounterAltProps) => {
  if (count === 0) return null;

  return (
    <div className={cn('flex items-center gap-1.5 group cursor-pointer', className)}>
      {/* Modern Badge Design - Alternative Option */}
      <div className="relative">
        {/* Main badge container */}
        <div className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-full',
          'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600',
          'shadow-lg border border-amber-300/50',
          'transition-[transform,scale,background-color,box-shadow] duration-300 transform',
          'group-hover:scale-105 group-hover:shadow-xl',
          'group-hover:from-amber-300 group-hover:via-yellow-400 group-hover:to-amber-500',
          'relative overflow-hidden'
        )}>
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          {/* Trophy/Medal Icon */}
          <svg 
            viewBox="0 0 24 24" 
            className="w-4 h-4 text-red-700 relative z-10 transition-transform duration-300 group-hover:rotate-12"
            fill="currentColor"
          >
            <path d="M5 16L3 8h2.5l1.5 8zm4.5 0L8 8h8l-1.5 8zM19 16L17.5 8H20l-2 8zM12 20c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2z"/>
            <circle cx="12" cy="4" r="2"/>
          </svg>
          
          {/* TOP text */}
          <span className="text-xs font-black text-red-700 tracking-wide relative z-10">
            TOP
          </span>
          
          {/* Count */}
          <span className="text-sm font-bold text-white relative z-10 transition-transform duration-300 group-hover:scale-110">
            {count}
          </span>
          
          {/* Sparkle effects */}
          <div className="absolute top-0 right-1 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-ping"></div>
          <div className="absolute bottom-1 left-2 w-0.5 h-0.5 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 group-hover:animate-pulse"></div>
        </div>
        
        {/* Outer glow ring */}
        <div className="absolute inset-0 border-2 border-amber-400/30 rounded-full scale-0 group-hover:scale-125 transition-transform duration-500 blur-sm"></div>
      </div>
    </div>
  );
};
