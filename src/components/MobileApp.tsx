import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Onboarding } from './pages/Onboarding';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Create } from './pages/Create';
import { Messages } from './pages/Messages';
import { Settings } from './pages/Settings';
import { JobDetails } from './pages/JobDetails';
import { InstallationDetails } from './pages/InstallationDetails';
import { ScheduleInspection } from './pages/ScheduleInspection';
import { ProductDetails } from './pages/ProductDetails';
import { BottomNavigation } from './navigation/BottomNavigation';
import { VoiceCommandButton } from './navigation/VoiceCommandButton';

function AppRoutes() {
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Check if user has completed onboarding
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    setIsFirstTime(!hasCompletedOnboarding);
    setIsLoggedIn(!!isAuthenticated);
  }, []);

  // Hide navigation on specific pages
  const hideNavigation = ['/', '/login', '/onboarding'].includes(location.pathname) || 
                        location.pathname.startsWith('/job/') || 
                        location.pathname.startsWith('/installation/') || 
                        location.pathname.startsWith('/product/');

  if (isFirstTime) {
    return <Onboarding onComplete={() => setIsFirstTime(false)} />;
  }

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="h-full bg-background relative overflow-hidden">
      <div className="mobile-page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/create" element={<Create />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/job/:id/schedule-inspection" element={<ScheduleInspection />} />
            <Route path="/installation/:id/:area" element={<InstallationDetails />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>

      {!hideNavigation && <BottomNavigation />}
      {!hideNavigation && <VoiceCommandButton />}
    </div>
  );
}

export function MobileApp() {
  return <AppRoutes />;
}