import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Play,
  File,
  Package
} from 'lucide-react';

export function InstallationDetails() {
  const { id, area } = useParams();
  const navigate = useNavigate();

  const installationSteps = [
    {
      id: 1,
      name: 'Deck Preparation',
      description: 'Clean and prepare the roof deck surface',
      status: 'complete',
      materials: ['Deck Cleaner & Primer', 'Safety Equipment', 'Surface Preparation Tools'],
      videoUrl: '/api/video/deck-prep',
      documents: ['Carlisle Deck Preparation Guide.pdf', 'Safety Checklist.pdf'],
      specs: ['https://www.carlislesyntec.com/Search?tabFilter=document-tab&media_type=Detail&limit=100&q=deck+preparation']
    },
    {
      id: 2,
      name: 'FAST Adhesive Application',
      description: 'Apply FAST Adhesive system to ensure proper membrane adhesion',
      status: 'complete',
      materials: ['FAST Adhesive Primer', 'Application Rollers', 'Spray Equipment'],
      videoUrl: '/api/video/fast-adhesive-application',
      documents: ['FAST Adhesive Application Guide.pdf', 'FAST Technical Data Sheet.pdf'],
      specs: ['https://www.carlislesyntec.com/Document-Viewer/flexible-fast-adhesive-product-data-sheet-pds/rw1957auuUyaOyb-gEUuiA']
    },
    {
      id: 3,
      name: 'SecurShield Base Installation',
      description: 'Install SecurShield base layer for membrane foundation',
      status: 'in-progress',
      materials: ['SecurShield Base Sheet', 'Heavy-Duty Fasteners', 'Pressure-Sensitive Sealing Tape'],
      videoUrl: '/api/video/securshield-base',
      documents: ['SecurShield Installation Guide.pdf', 'Fastening Pattern Specifications.pdf'],
      specs: ['https://www.carlislesyntec.com/Search?tabFilter=document-tab&media_type=Product+Data+Sheet&limit=100&q=SecurShield']
    },
    {
      id: 4,
      name: 'Bottom SecurShield HD Insulation',
      description: 'Install first layer of SecurShield HD polyiso insulation',
      status: 'pending',
      materials: ['SecurShield HD Polyiso 2"', 'FAST Adhesive', 'Insulation Fasteners'],
      videoUrl: '/api/video/securshield-hd-bottom',
      documents: ['SecurShield HD Installation Manual.pdf', 'R-Value Performance Chart.pdf'],
      specs: ['https://www.carlislesyntec.com/Search?tabFilter=document-tab&media_type=Product+Data+Sheet&limit=100&q=SecurShield+HD']
    },
    {
      id: 5,
      name: 'Top SecurShield HD Insulation',
      description: 'Install second layer of SecurShield HD with offset joints',
      status: 'pending',
      materials: ['SecurShield HD Polyiso 2"', 'FAST Adhesive', 'Pressure-Sensitive Joint Tape'],
      videoUrl: '/api/video/securshield-hd-top',
      documents: ['SecurShield HD Installation Manual.pdf', 'Joint Sealing Best Practices.pdf'],
      specs: ['https://www.carlislesyntec.com/Search?tabFilter=document-tab&media_type=Product+Data+Sheet&limit=100&q=SecurShield+HD']
    },
    {
      id: 6,
      name: 'SecurShield Cover Board',
      description: 'Install SecurShield cover board for membrane protection',
      status: 'pending',
      materials: ['SecurShield Cover Board', 'Heavy-Duty Fasteners', 'Pressure-Sensitive Joint Tape'],
      videoUrl: '/api/video/securshield-cover-board',
      documents: ['SecurShield Cover Board Installation.pdf', 'Membrane Protection Guidelines.pdf'],
      specs: ['https://www.carlislesyntec.com/Search?tabFilter=document-tab&media_type=Product+Data+Sheet&limit=100&q=SecurShield+cover+board']
    },
    {
      id: 7,
      name: 'Sure-Seal EPDM Installation',
      description: 'Install Sure-Seal EPDM membrane with proper seaming',
      status: 'pending',
      materials: ['Sure-Seal EPDM 60 mil', 'Pressure-Sensitive Seaming Tape', 'Sure-Weld Splicing Cement', 'Sure-Seal Lap Sealant'],
      videoUrl: '/api/video/sure-seal-epdm',
      documents: ['Sure-Seal Installation Manual.pdf', 'EPDM Seaming Procedures.pdf', 'Carlisle Warranty Information.pdf'],
      specs: ['https://www.carlislesyntec.com/Search?q=sure-seal&tabFilter=document-tab&system_type=EPDM&media_type=Product+Data+Sheet%7CMembrane']
    }
  ];

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'text-success';
      case 'in-progress': return 'text-warning';
      case 'pending': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'complete': return <CheckCircle size={24} className="text-success" />;
      case 'in-progress': return <Clock size={24} className="text-warning" />;
      case 'pending': return <AlertTriangle size={24} className="text-muted-foreground" />;
      default: return <AlertTriangle size={24} className="text-muted-foreground" />;
    }
  };

  const completedSteps = installationSteps.filter(step => step.status === 'complete').length;
  const progressPercentage = (completedSteps / installationSteps.length) * 100;

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
              <h1 className="text-xl font-bold text-white">Roof Area {area}</h1>
              <p className="text-white/80 text-sm">Installation Progress</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex justify-between text-white text-sm mb-2">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-white/20" />
            <p className="text-white/80 text-xs mt-1">
              {completedSteps} of {installationSteps.length} steps completed
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 pb-20">
        <div className="space-y-4">
          {installationSteps.map((step) => (
            <Card 
              key={step.id}
              className={`transition-material ${
                step.status === 'in-progress' 
                  ? 'border-warning bg-warning/5' 
                  : step.status === 'complete' 
                    ? 'border-success bg-success/5' 
                    : ''
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center space-x-3">
                    {getStepIcon(step.status)}
                    <span>Step {step.id}: {step.name}</span>
                  </CardTitle>
                  <Badge 
                    className={
                      step.status === 'complete' 
                        ? 'bg-success text-success-foreground'
                        : step.status === 'in-progress'
                          ? 'bg-warning text-warning-foreground'
                          : 'bg-muted text-muted-foreground'
                    }
                  >
                    {step.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="materials" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="materials">Materials</TabsTrigger>
                    <TabsTrigger value="video">Video</TabsTrigger>
                    <TabsTrigger value="docs">Documents</TabsTrigger>
                  </TabsList>

                  <TabsContent value="materials" className="space-y-3">
                    <h4 className="font-semibold text-sm">Required Materials:</h4>
                    <div className="space-y-2">
                      {step.materials.map((material, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                          <div className="flex items-center space-x-2">
                            <Package size={16} className="text-primary" />
                            <span className="text-sm">{material}</span>
                          </div>
                          {step.specs && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs"
                              onClick={() => window.open(step.specs[0], '_blank')}
                            >
                              Specs
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    {step.specs && (
                      <p 
                        className="text-xs text-primary mt-2 cursor-pointer hover:underline"
                        onClick={() => window.open(step.specs[0], '_blank')}
                      >
                        View complete product specifications
                      </p>
                    )}
                  </TabsContent>

                  <TabsContent value="video" className="space-y-3">
                    <div className="bg-muted/30 rounded-lg p-4 text-center">
                      <Play size={48} className="mx-auto text-primary mb-2" />
                      <h4 className="font-semibold mb-1">Installation Video</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Step-by-step video tutorial for {step.name.toLowerCase()}
                      </p>
                      <Button>
                        <Play size={16} className="mr-2" />
                        Watch Tutorial
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="docs" className="space-y-3">
                    <h4 className="font-semibold text-sm">Documentation:</h4>
                    <div className="space-y-2">
                      {step.documents.map((doc, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-muted/20 rounded">
                          <File size={16} className="text-accent" />
                          <span className="text-sm flex-1">{doc}</span>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>

                {step.status === 'in-progress' && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <Button className="w-full">
                      Mark Step as Complete
                    </Button>
                  </div>
                )}

                {step.status === 'pending' && step.id === completedSteps + 1 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <Button className="w-full" variant="outline">
                      Start This Step
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}