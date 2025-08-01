import { NavLink } from 'react-router-dom';
import { Home, Search, Plus, MessageCircle, Settings } from 'lucide-react';

export function BottomNavigation() {
  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/create', icon: Plus, label: 'Create' },
    { path: '/messages', icon: MessageCircle, label: 'Messages' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border safe-bottom z-40">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-material-fast min-w-0 flex-1 ${
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`
            }
          >
            <Icon size={20} />
            <span className="text-xs mt-1 font-medium truncate">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}