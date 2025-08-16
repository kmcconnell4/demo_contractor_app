import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft,
  Camera
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage.tsx';

export function Profile() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [profile, setProfile] = useState({
    name: 'Chris Contractor',
    email: 'chris@contractor.com',
    phone: '+1 (555) 123-4567',
    company: 'Elite Roofing Solutions',
    location: 'Carlisle, PA'
  });

  return (
    <div className="h-full bg-background">
      {/* Header */}
      <div className="bg-gradient-primary-two-color safe-top">
        <div className="p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <button onClick={() => navigate('/settings')} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white mt-1">
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-2xl font-bold text-white">{t('editProfile')}</h1>
            </div>
            <Button variant="ghost" className="text-white hover:bg-white/20">
              {t('save')}
            </Button>
          </div>
        </div>
      </div>

      <div className="px-8 py-4 space-y-8 pb-20">
        <Card>
          <CardContent className="space-y-4 pt-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/Chris-profile.jpeg" alt={profile.name} />
                  <AvatarFallback className="text-xl">
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
                <Label htmlFor="name">{t('fullName')}</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t('phone')}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">{t('company')}</Label>
                <Input
                  id="company"
                  value={profile.company}
                  onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">{t('location')}</Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
