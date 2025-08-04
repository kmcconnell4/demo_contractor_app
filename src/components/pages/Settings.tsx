import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Camera,
  Mail,
  Phone,
  MapPin
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
    pushNotifications: true,
    darkMode: false
  });

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'it', label: 'Italiano' },
    { value: 'pt', label: 'Português' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userToken');
    window.location.reload();
  };

  const SettingsSection = ({ icon: Icon, title, children }: { 
    icon: React.ElementType; 
    title: string; 
    children: React.ReactNode; 
  }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Icon size={20} />
          <span>{title}</span>
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
      <div className="bg-gradient-primary safe-top">
        <div className="p-4">
          <h1 className="text-xl font-bold text-white">Settings</h1>
          <p className="text-white/80">Manage your account and preferences</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Section */}
        <SettingsSection icon={User} title="Profile">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/api/placeholder/80/80" alt={profile.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
              >
                <Camera size={16} />
              </Button>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{profile.name}</h3>
              <p className="text-muted-foreground">{profile.company}</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={profile.company}
                onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
          </div>

          <Button className="w-full">Update Profile</Button>
        </SettingsSection>

        {/* Language & Preferences */}
        <SettingsSection icon={Globe} title="Language & Preferences">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select 
                value={preferences.language} 
                onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Switch to dark theme</p>
              </div>
              <Switch
                checked={preferences.darkMode}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, darkMode: checked }))}
              />
            </div>
          </div>
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection icon={Bell} title="Notifications">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
              </div>
              <Switch
                checked={preferences.pushNotifications}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, pushNotifications: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Email Alerts</Label>
                <p className="text-sm text-muted-foreground">Get updates via email</p>
              </div>
              <Switch
                checked={preferences.emailAlerts}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, emailAlerts: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Job Notifications</Label>
                <p className="text-sm text-muted-foreground">Updates about your projects</p>
              </div>
              <Switch
                checked={preferences.notifications}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, notifications: checked }))}
              />
            </div>
          </div>
        </SettingsSection>

        {/* Security */}
        <SettingsSection icon={Shield} title="Security">
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <span>Change Password</span>
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <span>Two-Factor Authentication</span>
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <span>Privacy Settings</span>
            </Button>
          </div>
        </SettingsSection>

        {/* About */}
        <SettingsSection icon={Info} title="About">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">App Version</span>
              <span>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Build</span>
              <span>2024.07.30</span>
            </div>
            <Separator />
            <Button variant="outline" className="w-full justify-start">
              <span>Terms of Service</span>
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <span>Privacy Policy</span>
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <span>Contact Support</span>
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <span>Rate App</span>
            </Button>
          </div>
        </SettingsSection>

        {/* Logout */}
        <Card>
          <CardContent className="p-4">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut size={20} className="mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}