import { cn } from 'shared/lib';

interface TutorialButtonProps {
  className?: string;
}

export const TutorialButton = ({ className }: TutorialButtonProps) => {
  return (
    <div className={cn('p-4', className)}>
      <button className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        Tutorials
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4 ml-auto">
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className="mt-2 text-xs text-gray-500 px-3">Learn and growth as an operator</div>
    </div>
  );
};
