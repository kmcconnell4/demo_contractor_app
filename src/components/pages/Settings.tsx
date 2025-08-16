import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage.tsx';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Globe, Key, Info, HelpCircle, ChevronRight } from 'lucide-react';
export function Settings() {
  const { language, setLanguage, t } = useLanguage();
  const [profile] = useState({
    name: 'Chris Contractor',
    email: 'chris@contractor.com',
    phone: '+1 (555) 123-4567',
    company: 'Elite Roofing Solutions',
    location: 'Carlisle, PA'
  });
  const [preferences, setPreferences] = useState({
    language: language,
    notifications: true,
    emailAlerts: true,
    pushNotifications: true
  });
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "es" | "fr-ca">(language);
  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  // Removed duplicate declarations
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
    const SettingsSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">{children}</CardContent>
      </Card>
    );
    return (
      <div className="h-full bg-background">
        <div className="bg-gradient-primary-two-color safe-top rounded-b-3xl">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-white">{t('settings')}</h1>
            <p className="text-white/80">{t('manageAccount')}</p>
          </div>
        </div>
        <div className="pt-8 px-8 space-y-8 pb-20">
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
                <ChevronRight size={20} className="text-[#012b64]" />
              </div>
            </CardContent>
          </Card>
          <SettingsSection title={t('settings')}>
            <div className="space-y-3">
              <Card className="cursor-pointer transition-material hover:elevation-1" onClick={() => window.location.href = '/notifications'}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Bell size={20} className="text-[#012b64]" />
                    <div className="flex-1">
                      <h4 className="font-medium">{t('notifications')}</h4>
                      <p className="text-sm text-muted-foreground">{t('notificationPrefs')}</p>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              <Card className="cursor-pointer transition-material hover:elevation-1" onClick={() => setLanguageModalOpen(true)}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Globe size={20} className="text-[#012b64]" />
                    <div className="flex-1">
                      <h4 className="font-medium">{t('language')}</h4>
                      <p className="text-sm text-muted-foreground">{t('languagePrefs')}</p>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
      {/* Language Picker Modal - completely outside the Card */}
      {languageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-background rounded-lg shadow-lg w-full max-w-sm mx-4 p-6 relative">
            <button
              className="absolute top-3 right-3 text-muted-foreground hover:text-primary"
              onClick={() => setLanguageModalOpen(false)}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <h2 className="text-lg font-semibold mb-4">Change your language preference</h2>
            <div className="space-y-4">
              {languages.map(lang => (
                <Button
                  key={lang.value}
                  variant={selectedLanguage === lang.value ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setSelectedLanguage(lang.value as 'en' | 'es' | 'fr-ca')}
                >
                  {lang.label}
                </Button>
              ))}
            </div>
            <Button
              variant="default"
              className="w-full mt-6"
              onClick={() => {
                setPreferences(prev => ({ ...prev, language: selectedLanguage }));
                setLanguage(selectedLanguage);
                setLanguageModalOpen(false);
              }}
              disabled={selectedLanguage === language}
            >
              Save
            </Button>
          </div>
        </div>
      )}
              <Card className="cursor-pointer transition-material hover:elevation-1" onClick={() => window.location.href = '/change-password'}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Key size={20} className="text-[#012b64]" />
                    <div className="flex-1">
                      <h4 className="font-medium">{t('changePassword')}</h4>
                      <p className="text-sm text-muted-foreground">{t('updatePassword')}</p>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              <Card className="cursor-pointer transition-material hover:elevation-1" onClick={() => window.location.href = '/about'}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Info size={20} className="text-[#012b64]" />
                    <div className="flex-1">
                      <h4 className="font-medium">{t('about')}</h4>
                      <p className="text-sm text-muted-foreground">{t('appInfo')}</p>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              <Card className="cursor-pointer transition-material hover:elevation-1" onClick={() => window.location.href = '/support'}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <HelpCircle size={20} className="text-[#012b64]" />
                    <div className="flex-1">
                      <h4 className="font-medium">{t('support')}</h4>
                      <p className="text-sm text-muted-foreground">{t('getHelp')}</p>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </SettingsSection>
          <Card>
            <CardContent className="p-4">
              <Button 
                variant="default" 
                className="w-full"
                onClick={handleLogout}
              >
                {t('signOut')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }