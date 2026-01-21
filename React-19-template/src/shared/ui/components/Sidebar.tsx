import { cn } from 'shared/lib';

interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

interface SidebarProps {
  items: SidebarItem[];
  onItemClick?: (id: string) => void;
  className?: string;
}

export const Sidebar = ({ items, onItemClick, className }: SidebarProps) => {
  return (
    <div className={cn('w-64 bg-white border-r border-gray-200', className)}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
            <span className="text-sm font-bold text-white">LO</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">Groups</span>
          <button className="ml-auto text-gray-400 hover:text-gray-600">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="p-4 space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick?.(item.id)}
            className={cn(
              'flex w-full items-center gap-3 px-3 py-2 text-left text-sm font-medium rounded-lg transition-colors',
              item.isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100',
            )}>
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
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
    </div>
  );
};
