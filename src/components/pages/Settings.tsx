import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Globe, 
  Bell, 
  Shield, 
  Info, 
  LogOut,
  ChevronRight,
  Key,
  HelpCircle
} from 'lucide-react';

export function Settings() {
  const [profile, setProfile] = useState({
    name: 'Chris Contractor',
    email: 'chris@contractor.com',
    phone: '+1 (555) 123-4567',
    company: 'Elite Roofing Solutions',
    location: 'Carlisle, PA'
  });

  const [preferences, setPreferences] = useState({
    language: 'en',
    notifications: true,
    emailAlerts: true,
    pushNotifications: true
  });

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr-ca', label: 'Français (Canada)' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userToken');
    window.location.reload();
  };

  const SettingsSection = ({ title, children }: { 
    title: string; 
    children: React.ReactNode; 
  }) => (
    <Card>
      <CardHeader>
        <CardTitle>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );

  return (
    <div className="h-full bg-background">
      {/* Header */}
      <div className="bg-gradient-primary-two-color safe-top">
        <div className="p-4">
          <h1 className="text-xl font-bold text-white">Settings</h1>
          <p className="text-white/80">Manage your account and preferences</p>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* Profile Link */}
        <Card className="cursor-pointer transition-material hover:elevation-2" onClick={() => window.location.href = '/profile'}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/Chris-profile.jpeg" alt={profile.name} />
                <AvatarFallback className="text-lg">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{profile.name}</h3>
                <p className="text-muted-foreground">View profile</p>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <SettingsSection title="Settings">
          <div className="space-y-3">
            <Card className="cursor-pointer transition-material hover:elevation-1" onClick={() => window.location.href = '/notifications'}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Bell size={20} className="text-muted-foreground" />
                  <div className="flex-1">
                    <h4 className="font-medium">Notifications</h4>
                    <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer transition-material hover:elevation-1" onClick={() => window.location.href = '/language'}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Globe size={20} className="text-muted-foreground" />
                  <div className="flex-1">
                    <h4 className="font-medium">Language</h4>
                    <p className="text-sm text-muted-foreground">Change your language preferences</p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer transition-material hover:elevation-1" onClick={() => window.location.href = '/change-password'}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Key size={20} className="text-muted-foreground" />
                  <div className="flex-1">
                    <h4 className="font-medium">Change password</h4>
                    <p className="text-sm text-muted-foreground">Update your account password</p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer transition-material hover:elevation-1" onClick={() => window.location.href = '/about'}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Info size={20} className="text-muted-foreground" />
                  <div className="flex-1">
                    <h4 className="font-medium">About</h4>
                    <p className="text-sm text-muted-foreground">App information and version details</p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer transition-material hover:elevation-1" onClick={() => window.location.href = '/support'}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <HelpCircle size={20} className="text-muted-foreground" />
                  <div className="flex-1">
                    <h4 className="font-medium">Support</h4>
                    <p className="text-sm text-muted-foreground">Get help and contact support</p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </SettingsSection>

        {/* Logout */}
        <Card>
          <CardContent className="p-4">
            <Button 
              variant="default" 
              className="w-full"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}