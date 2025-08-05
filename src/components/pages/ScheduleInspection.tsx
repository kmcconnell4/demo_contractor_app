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

export function ScheduleInspection() {
  const { id } = useParams();
  const navigate = useNavigate();
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
        title: "Please select at least one preferred date",
        variant: "destructive"
      });
      return;
    }

    if (!timePreference) {
      toast({
        title: "Please select a time preference",
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
      title: "Inspection scheduled successfully",
      description: "Job has been marked as complete and we'll contact you within 24 hours to confirm the appointment."
    });

    navigate(`/job/${id}`);
  };

  const isDateSelected = (date: Date) => {
    return selectedDates.some(d => d.toDateString() === date.toDateString());
  };

  return (
    <div className="h-full bg-background">
      {/* Header */}
      <div className="bg-gradient-primary safe-top">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(`/job/${id}`)} 
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft size={24} />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">Schedule Inspection</h1>
              <p className="text-white/80 text-sm">Select your preferred dates and times</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* Date Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon size={20} />
              <span>Preferred Dates</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Select one or more dates that work for you. You can select multiple dates to increase scheduling flexibility.
            </p>
          </CardHeader>
          <CardContent>
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
            
            {selectedDates.length > 0 && (
              <div className="mt-4">
                <Label className="text-sm font-medium">Selected Dates:</Label>
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
              <span>Time Preference</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Select your preferred time of day for the inspection.
            </p>
          </CardHeader>
          <CardContent>
            <RadioGroup value={timePreference} onValueChange={setTimePreference}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="morning" id="morning" />
                <Label htmlFor="morning">Morning (8:00 AM - 12:00 PM)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="afternoon" id="afternoon" />
                <Label htmlFor="afternoon">Afternoon (12:00 PM - 5:00 PM)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="flexible" id="flexible" />
                <Label htmlFor="flexible">Flexible (Any time during business hours)</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Additional Details */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
            <p className="text-sm text-muted-foreground">
              Any special requirements, access instructions, or other important information for the inspector.
            </p>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter any additional details, special requirements, or access instructions..."
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="pt-4">
          <Button onClick={handleSubmit} className="w-full h-12">
            <CalendarIcon size={20} className="mr-2" />
            Schedule Inspection
          </Button>
        </div>
      </div>
    </div>
  );
}