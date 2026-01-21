import { cn } from 'shared/lib';

interface MedalCounterProps {
  count: number;
  className?: string;
}

export const MedalCounter = ({ count, className }: MedalCounterProps) => {
  if (count === 0) return null;

  return (
    <div 
      className={cn('flex items-center gap-2 group', className)}
      title={`Spent ${count} days in top-3 during 23 working days`}
    >
      {/* Golden Star Badge with TOP text - similar to reference image */}
      <div className="relative">
        {/* Star shape background */}
        <div className="relative flex items-center justify-center w-6 h-6 transition-[transform,scale] duration-300 group-hover:scale-110 group-hover:rotate-12">
          {/* Star SVG */}
          <svg 
            viewBox="0 0 24 24" 
            className="w-6 h-8 text-yellow-400 drop-shadow-lg transition-colors duration-300 group-hover:text-yellow-300"
            fill="currentColor"
          >
            <path d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z" />
          </svg>
          
          {/* TOP text overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[6px] font-black text-red-600 tracking-tight leading-none transform -mt-0.5">
              TOP
            </span>
          </div>
          
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-yellow-400/30 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 blur-sm"></div>
        </div>
        
        {/* Pulse animation ring */}
        <div className="absolute inset-0 border-2 border-yellow-400/50 rounded-full animate-ping opacity-0 group-hover:opacity-75"></div>
      </div>
      
      {/* Count Number - No background, just text */}
      <div className="relative">
        <div className={cn(
          'flex items-center justify-center text-white text-base font-bold',
          'transition-[transform,scale,color] duration-300 transform min-w-[22px] h-6',
          'group-hover:scale-110 group-hover:text-yellow-300',
          'relative overflow-hidden drop-shadow-lg'
        )}>
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          
          {/* Count number */}
          <span className="relative z-10 transition-transform duration-300 group-hover:scale-105 text-shadow">
            {count}
          </span>
        </div>
        
        {/* Floating particles effect */}
        <div className="absolute -top-1 -right-1 w-1 h-1 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-ping delay-100"></div>
        <div className="absolute -bottom-1 -left-1 w-0.5 h-0.5 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:animate-bounce delay-200"></div>
      </div>
    </div>
  );
};
