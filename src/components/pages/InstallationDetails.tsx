import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Play,
  File,
  Package,
  ChevronDown,
  ChevronRight
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
      products: ['Deck Cleaner & Primer', 'Safety Equipment', 'Surface Preparation Tools'],
      videoUrl: '/api/video/deck-prep',
      documents: ['Carlisle Deck Preparation Guide.pdf', 'Safety Checklist.pdf'],
      specs: ['https://www.carlislesyntec.com/Search?tabFilter=document-tab&media_type=Detail&limit=100&q=deck+preparation']
    },
    {
      id: 2,
      name: 'FAST Adhesive Application',
      description: 'Apply FAST Adhesive system to ensure proper membrane adhesion',
      status: 'complete',
      products: ['FAST Adhesive Primer', 'Application Rollers', 'Spray Equipment'],
      videoUrl: '/api/video/fast-adhesive-application',
      documents: ['FAST Adhesive Application Guide.pdf', 'FAST Technical Data Sheet.pdf'],
      specs: ['https://www.carlislesyntec.com/Document-Viewer/flexible-fast-adhesive-product-data-sheet-pds/rw1957auuUyaOyb-gEUuiA']
    },
    {
      id: 3,
      name: 'SecurShield Base Installation',
      description: 'Install SecurShield base layer for membrane foundation',
      status: 'in-progress',
      products: ['SecurShield Base Sheet', 'Heavy-Duty Fasteners', 'Pressure-Sensitive Sealing Tape'],
      videoUrl: '/api/video/securshield-base',
      documents: ['SecurShield Installation Guide.pdf', 'Fastening Pattern Specifications.pdf'],
      specs: ['https://www.carlislesyntec.com/Search?tabFilter=document-tab&media_type=Product+Data+Sheet&limit=100&q=SecurShield']
    },
    {
      id: 4,
      name: 'Bottom SecurShield HD Insulation',
      description: 'Install first layer of SecurShield HD polyiso insulation',
      status: 'pending',
      products: ['SecurShield HD Polyiso 2"', 'FAST Adhesive', 'Insulation Fasteners'],
      videoUrl: '/api/video/securshield-hd-bottom',
      documents: ['SecurShield HD Installation Manual.pdf', 'R-Value Performance Chart.pdf'],
      specs: ['https://www.carlislesyntec.com/Search?tabFilter=document-tab&media_type=Product+Data+Sheet&limit=100&q=SecurShield+HD']
    },
    {
      id: 5,
      name: 'Top SecurShield HD Insulation',
      description: 'Install second layer of SecurShield HD with offset joints',
      status: 'pending',
      products: ['SecurShield HD Polyiso 2"', 'FAST Adhesive', 'Pressure-Sensitive Joint Tape'],
      videoUrl: '/api/video/securshield-hd-top',
      documents: ['SecurShield HD Installation Manual.pdf', 'Joint Sealing Best Practices.pdf'],
      specs: ['https://www.carlislesyntec.com/Search?tabFilter=document-tab&media_type=Product+Data+Sheet&limit=100&q=SecurShield+HD']
    },
    {
      id: 6,
      name: 'SecurShield Cover Board',
      description: 'Install SecurShield cover board for membrane protection',
      status: 'pending',
      products: ['SecurShield Cover Board', 'Heavy-Duty Fasteners', 'Pressure-Sensitive Joint Tape'],
      videoUrl: '/api/video/securshield-cover-board',
      documents: ['SecurShield Cover Board Installation.pdf', 'Membrane Protection Guidelines.pdf'],
      specs: ['https://www.carlislesyntec.com/Search?tabFilter=document-tab&media_type=Product+Data+Sheet&limit=100&q=SecurShield+cover+board']
    },
    {
      id: 7,
      name: 'Sure-Seal EPDM Installation',
      description: 'Install Sure-Seal EPDM membrane with proper seaming',
      status: 'pending',
      products: ['Sure-Seal EPDM 60 mil', 'Pressure-Sensitive Seaming Tape', 'Sure-Weld Splicing Cement', 'Sure-Seal Lap Sealant'],
      videoUrl: '/api/video/sure-seal-epdm',
      documents: ['Sure-Seal Installation Manual.pdf', 'EPDM Seaming Procedures.pdf', 'Carlisle Warranty Information.pdf'],
      specs: ['https://www.carlislesyntec.com/Search?q=sure-seal&tabFilter=document-tab&system_type=EPDM&media_type=Product+Data+Sheet%7CMembrane']
    }
  ];

  // Initialize collapsed state - complete steps are collapsed by default
  const [collapsedSteps, setCollapsedSteps] = useState<Record<number, boolean>>(() => {
    const initialState: Record<number, boolean> = {};
    installationSteps.forEach(step => {
      // Complete steps start collapsed, others start expanded
      initialState[step.id] = step.status === 'complete';
    });
    return initialState;
  });

  const toggleStep = (stepId: number) => {
    setCollapsedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

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

  return (
    <div className="h-full bg-background">
      {/* Header */}
      <div className="bg-gradient-primary-two-color safe-top rounded-b-3xl">
        <div className="p-4 pb-6">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(`/job/${id}`)} 
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft size={24} />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">Roof Area {area}</h1>
              <p className="text-white/80 text-sm">
                {completedSteps} of {installationSteps.length} steps completed
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 px-4 pb-20">
        <div className="space-y-4">
          {installationSteps.map((step) => (
            <Collapsible 
              key={step.id} 
              open={!collapsedSteps[step.id]}
              onOpenChange={() => toggleStep(step.id)}
            >
              <Card 
                className={`transition-material ${
                  step.status === 'in-progress' 
                    ? 'border-warning bg-warning/5' 
                    : step.status === 'complete' 
                      ? 'border-success bg-success/5' 
                      : ''
                }`}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="pb-3 cursor-pointer hover:bg-muted/20 transition-colors">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center space-x-3">
                        {getStepIcon(step.status)}
                        <span>Step {step.id}: {step.name}</span>
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          className={`${
                            step.status === 'complete' 
                              ? 'bg-success text-success-foreground'
                              : step.status === 'in-progress'
                                ? 'bg-warning text-warning-foreground'
                                : 'bg-muted text-muted-foreground'
                          } pointer-events-none`}
                        >
                          {step.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                        {collapsedSteps[step.id] ? (
                          <ChevronRight size={20} className="text-muted-foreground" />
                        ) : (
                          <ChevronDown size={20} className="text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent>
                <Tabs defaultValue="products" className="space-y-4">
                  <TabsList className="h-auto p-0 bg-transparent border-b border-border rounded-none w-full justify-start">
                    <TabsTrigger value="products" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">Products</TabsTrigger>
                    <TabsTrigger value="video" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">Video</TabsTrigger>
                    <TabsTrigger value="docs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">Documents</TabsTrigger>
                  </TabsList>

                  <TabsContent value="products" className="space-y-3">
                    <div className="grid grid-cols-1 gap-3">
                      {step.products.map((product, index) => (
                        <Card key={index} className="cursor-pointer hover:elevation-2">
                          <CardContent className="p-4">
                            <div className="flex space-x-4">
                              <img 
                                src="/placeholder.jpg" 
                                alt={product} 
                                className="w-12 h-12 object-cover rounded-lg bg-muted"
                              />
                              <div className="flex-1">
                                <h3 className="font-semibold text-sm">{product}</h3>
                                <p className="text-xs text-muted-foreground">Carlisle product required for this installation step</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
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
                    <div className="space-y-3">
                      {step.documents.map((doc, index) => (
                        <Card key={index} className="cursor-pointer transition-material hover:elevation-2">
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                              <File size={20} className="text-accent" />
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-sm">{doc}</h3>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge variant="outline" className="text-xs">Technical</Badge>
                                  <span className="text-xs text-muted-foreground">PDF</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
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
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
}