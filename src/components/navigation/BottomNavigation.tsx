import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, MessageCircle, Menu, Monitor } from 'lucide-react';

export function BottomNavigation() {
  const location = useLocation();
  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/messages', icon: MessageCircle, label: 'Messages' },
    { path: '/settings', icon: Menu, label: 'Settings' },
  ];

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <nav
      className="win-taskbar safe-bottom"
      style={{ height: 36, zIndex: 50 }}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Start button */}
      <button
        className="win-start-btn"
        aria-label="Start menu"
        style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 'bold' }}
      >
        <Monitor size={14} />
        Start
      </button>

      {/* Separator */}
      <div className="win-sep" style={{ height: 24 }} />

      {/* Nav task buttons */}
      <div style={{ display: 'flex', gap: 2, flex: 1, overflow: 'hidden' }}>
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path || (path === '/home' && location.pathname === '/');
          return (
            <NavLink
              key={path}
              to={path}
              className="win-taskbar-nav-btn"
              style={{
                boxShadow: isActive
                  ? 'inset 1px 1px 0 #888, inset -1px -1px 0 #fff, inset 2px 2px 0 #555, inset -2px -2px 0 #dfdfdf'
                  : undefined,
                background: isActive ? '#C0C0C0' : '#D4D0C8',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                flex: 1,
                maxWidth: 80,
                height: 28,
                border: '2px solid',
                borderColor: isActive
                  ? '#888 #dfdfdf #dfdfdf #888'
                  : '#dfdfdf #888 #888 #dfdfdf',
                cursor: 'pointer',
                textDecoration: 'none',
                color: '#000',
                fontSize: 9,
                fontFamily: 'Tahoma, Arial, sans-serif',
              }}
              aria-label={label}
            >
              <Icon size={14} />
              <span>{label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Separator */}
      <div className="win-sep" style={{ height: 24 }} />

      {/* System tray */}
      <div className="win-tray" aria-label="System tray">
        <span title="Network connected">🌐</span>
        <span title="Notifications">🔔</span>
        <span style={{ fontSize: 10, fontFamily: 'Tahoma, Arial, sans-serif', color: '#000' }}>
          {timeStr}
        </span>
      </div>
    </nav>
  );
}
