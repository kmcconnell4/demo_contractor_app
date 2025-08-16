import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  ArrowLeft, 
  CalendarIcon,
  Clock,
  CheckCircle
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage.tsx';

export function ScheduleInspection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [timePreference, setTimePreference] = useState<string>('');
  const [additionalDetails, setAdditionalDetails] = useState('');

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDates(prev => {
      const isAlreadySelected = prev.some(d => d.toDateString() === date.toDateString());
      if (isAlreadySelected) {
        return prev.filter(d => d.toDateString() !== date.toDateString());
      } else {
        return [...prev, date];
      }
    });
  };

  const handleSubmit = () => {
    if (selectedDates.length === 0) {
      toast({
        title: t('selectDateToast'),
        variant: "destructive"
      });
      return;
    }

    if (!timePreference) {
      toast({
        title: t('selectTimeToast'),
        variant: "destructive"
      });
      return;
    }

    // Update job status to "Complete"
    const inspectionData = {
      jobId: id,
      preferredDates: selectedDates,
      timePreference,
      additionalDetails,
      submittedAt: new Date().toISOString()
    };

    // Store inspection request data
    localStorage.setItem(`inspection_${id}`, JSON.stringify(inspectionData));
    
    // Update job status
    localStorage.setItem(`job_status_${id}`, 'Complete');

    toast({
      title: t('inspectionScheduledToastTitle'),
      description: t('inspectionScheduledToastDescription')
    });

    navigate(`/job/${id}`);
  };

  const isDateSelected = (date: Date) => {
    return selectedDates.some(d => d.toDateString() === date.toDateString());
  };

  return (
    <div className="h-full bg-background">
      {/* Header */}
      <div className="bg-gradient-primary-two-color safe-top rounded-b-3xl">
        <div className="p-4">
          <div className="flex items-start space-x-3 mb-4">
            <button 
              onClick={() => navigate(`/job/${id}`)} 
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white mt-1"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">{t('scheduleInspectionTitle')}</h1>
              <p className="text-white/80 text-sm">{t('scheduleInspectionSubtitle')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 px-4 space-y-8 pb-20">
        {/* Date Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon size={20} />
              <span>{t('preferredDates')}</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {t('preferredDatesDescription')}
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={undefined}
                onSelect={handleDateSelect}
                disabled={(date) => date < new Date() || date < new Date(Date.now() - 86400000)}
                className="rounded-md border pointer-events-auto"
                modifiers={{
                  selected: isDateSelected
                }}
                modifiersClassNames={{
                  selected: 'bg-primary text-primary-foreground'
                }}
              />
            </div>
            
            {selectedDates.length > 0 && (
              <div className="mt-4">
                <Label className="text-sm font-medium">{t('selectedDates')}</Label>
                <div className="mt-2 space-y-2">
                  {selectedDates.map((date, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle size={16} className="text-success" />
                      <span>{date.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Time Preference */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock size={20} />
              <span>{t('timePreference')}</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {t('timePreferenceDescription')}
            </p>
          </CardHeader>
          <CardContent>
            <RadioGroup value={timePreference} onValueChange={setTimePreference}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="morning" id="morning" />
                <Label htmlFor="morning">{t('morningTime')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="afternoon" id="afternoon" />
                <Label htmlFor="afternoon">{t('afternoonTime')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="flexible" id="flexible" />
                <Label htmlFor="flexible">{t('flexibleTime')}</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Additional Details */}
        <Card>
          <CardHeader>
            <CardTitle>{t('additionalDetails')}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {t('additionalDetailsDescription')}
            </p>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder={t('additionalDetailsPlaceholder')}
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="pt-4">
          <Button onClick={handleSubmit} className="w-full h-12">
            {t('requestInspection')}
          </Button>
        </div>
      </div>
    </div>
  );
}