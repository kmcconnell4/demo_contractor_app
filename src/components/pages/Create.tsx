import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, X } from 'lucide-react';

export function Create() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: '',
    location: '',
    description: '',
    roofType: '',
    area: '',
    materials: [] as string[],
    notes: '',
    urgency: '',
    measurements: {
      length: '',
      width: '',
      height: ''
    }
  });

  const roofTypes = [
    'Commercial Flat Roof',
    'Commercial Pitched Roof',
    'Industrial Roof',
    'Warehouse Roof',
    'Retail Roof'
  ];

  const availableMaterials = [
    'EPDM Membrane',
    'TPO Membrane',
    'Modified Bitumen',
    'Polyiso Insulation',
    'Polyurethane Foam',
    'Metal Roofing',
    'Ballast',
    'Fasteners'
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Standard (2-3 weeks)' },
    { value: 'medium', label: 'Priority (1-2 weeks)' },
    { value: 'high', label: 'Urgent (3-5 days)' },
    { value: 'emergency', label: 'Emergency (24-48 hours)' }
  ];

  const handleMaterialToggle = (material: string) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.includes(material)
        ? prev.materials.filter(m => m !== material)
        : [...prev.materials, material]
    }));
  };

  const handleSubmit = () => {
    // Simulate quote request submission
    const quoteRequest = {
      id: `QR-${Date.now()}`,
      ...formData,
      status: 'Pending',
      submittedAt: new Date().toISOString()
    };
    
    // Save to localStorage for demo
    const existingRequests = JSON.parse(localStorage.getItem('quoteRequests') || '[]');
    existingRequests.push(quoteRequest);
    localStorage.setItem('quoteRequests', JSON.stringify(existingRequests));
    
    // Show success and navigate
    alert('Quote request submitted successfully! Your sales rep will review and respond soon.');
    navigate('/home');
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return formData.projectName && formData.location && formData.description;
      case 2: return formData.roofType && formData.area;
      case 3: return formData.materials.length > 0;
      case 4: return formData.urgency;
      default: return false;
    }
  };

  return (
    <div className="h-full bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border safe-top">
        <div className="p-8">
          <div className="flex items-start space-x-3">
            <button onClick={() => navigate('/home')} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors mt-1">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Request Quote</h1>
              <p className="text-sm text-muted-foreground">Step {step} of 4</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="flex space-x-1 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full transition-material ${
                  i <= step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-8 py-4 pb-20">
        {/* Step 1: Project Details */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                  id="projectName"
                  placeholder="e.g., Downtown Office Building"
                  value={formData.projectName}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., 123 Market St, Philadelphia, PA"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the scope of work needed..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Roof Details */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Roof Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Roof Type *</Label>
                <Select value={formData.roofType} onValueChange={(value) => setFormData(prev => ({ ...prev, roofType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select roof type" />
                  </SelectTrigger>
                  <SelectContent>
                    {roofTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="area">Approximate Area (sq ft) *</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="e.g., 25000"
                  value={formData.area}
                  onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Detailed Measurements</Label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="length" className="text-xs">Length (ft)</Label>
                    <Input
                      id="length"
                      type="number"
                      placeholder="Length"
                      value={formData.measurements.length}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        measurements: { ...prev.measurements, length: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="width" className="text-xs">Width (ft)</Label>
                    <Input
                      id="width"
                      type="number"
                      placeholder="Width"
                      value={formData.measurements.width}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        measurements: { ...prev.measurements, width: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="height" className="text-xs">Height (ft)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="Height"
                      value={formData.measurements.height}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        measurements: { ...prev.measurements, height: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Materials */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Materials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {availableMaterials.map((material) => (
                  <div key={material} className="flex items-center space-x-3">
                    <Checkbox
                      id={material}
                      checked={formData.materials.includes(material)}
                      onCheckedChange={() => handleMaterialToggle(material)}
                    />
                    <Label htmlFor={material} className="flex-1 cursor-pointer">
                      {material}
                    </Label>
                  </div>
                ))}
              </div>
              
              {formData.materials.length > 0 && (
                <div className="mt-4">
                  <Label className="text-sm font-medium">Selected Materials:</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.materials.map((material) => (
                      <Badge key={material} variant="secondary" className="pr-1">
                        {material}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1"
                          onClick={() => handleMaterialToggle(material)}
                        >
                          <X size={12} />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 4: Final Details */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Quote Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Timeline Urgency *</Label>
                <Select value={formData.urgency} onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any specific requirements, concerns, or additional information..."
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            Previous
          </Button>
          
          <Button
            onClick={step === 4 ? handleSubmit : () => setStep(step + 1)}
            disabled={!isStepValid()}
          >
            {step === 4 ? 'Submit Quote Request' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}