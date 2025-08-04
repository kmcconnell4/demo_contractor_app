import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Search, 
  File, 
  Package, 
  Calendar as CalendarIcon, 
  MapPin, 
  Phone,
  User,
  Camera,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';

export function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Check if job status has been updated in localStorage
  const getJobStatus = () => {
    const storedStatus = localStorage.getItem(`job_status_${id}`);
    if (storedStatus) return storedStatus;
    
    // Default status based on job ID
    return id === '1' ? 'Installation' : id === '3' ? 'Complete' : id === '7' ? 'Complete' : 'Awarded';
  };

  // Mock job data based on status
  const job = {
    id,
    title: 'Downtown Office Complex',
    location: '450 Market Street, Philadelphia, PA 19106',
    status: getJobStatus(),
    progress: 65,
    area: '25,000 sq ft',
    startDate: '2024-07-15',
    estimatedCompletion: '2024-08-30'
  };

  const roofAreas = [
    { id: 'A', name: 'Roof Area A', status: 'complete', progress: 100 },
    { id: 'B', name: 'Roof Area B', status: 'in-progress', progress: 75 },
    { id: 'C', name: 'Roof Area C', status: 'pending', progress: 0 },
    { id: 'D', name: 'Roof Area D', status: 'pending', progress: 0 },
  ];

  const documents = [
    { id: 1, name: 'Sure-Seal EPDM Installation Manual', type: 'pdf', size: '2.4 MB', link: 'https://www.carlisle.com/docs/sure-seal-installation-guide' },
    { id: 2, name: 'FAST Adhesive Safety Data Sheet', type: 'pdf', size: '1.1 MB', link: 'https://www.carlisle.com/docs/fast-adhesive-sds' },
    { id: 3, name: 'Carlisle Warranty Certificate', type: 'pdf', size: '0.8 MB', link: 'https://www.carlisle.com/warranty' },
    { id: 4, name: 'Sure-Weld TPO Specification Sheet', type: 'pdf', size: '1.8 MB', link: 'https://www.carlisle.com/docs/sure-weld-tpo-specs' },
  ];

  const materials = [
    { id: 1, name: 'Sure-Seal EPDM Membrane 60 mil', quantity: '2,500 sq ft', status: 'delivered', specs: 'https://www.carlisle.com/specs/sure-seal-epdm-60mil' },
    { id: 2, name: 'SecurShield HD Polyiso Insulation 2"', quantity: '2,500 sq ft', status: 'delivered', specs: 'https://www.carlisle.com/specs/securshield-hd' },
    { id: 3, name: 'FAST Adhesive Primer', quantity: '15 gallons', status: 'pending', specs: 'https://www.carlisle.com/specs/fast-adhesive' },
    { id: 4, name: 'Sure-Seal Lap Sealant', quantity: '24 tubes', status: 'delivered', specs: 'https://www.carlisle.com/specs/sure-seal-lap-sealant' },
    { id: 5, name: 'Pressure-Sensitive Walkway Pads', quantity: '50 pads', status: 'pending', specs: 'https://www.carlisle.com/specs/walkway-pads' },
  ];

  const repairItems = [
    {
      id: 1,
      area: 'Section B-2',
      issue: 'Sure-Seal EPDM seam separation',
      description: 'EPDM seam requires re-welding with Sure-Weld splicing cement and additional FAST Adhesive',
      priority: 'high',
      photos: ['/api/placeholder/200/150'],
      recommendedProducts: ['Sure-Weld Splicing Cement', 'FAST Adhesive', 'Pressure-Sensitive Seam Tape']
    },
    {
      id: 2,
      area: 'Section A-4',
      issue: 'SecurShield insulation displacement',
      description: 'SecurShield HD insulation boards need repositioning and securing with proper fasteners',
      priority: 'medium',
      photos: ['/api/placeholder/200/150'],
      recommendedProducts: ['SecurShield HD Polyiso', 'Heavy-Duty Fasteners', 'Insulation Adhesive']
    }
  ];

  const contacts = [
    { name: 'John Smith', role: 'Project Manager', phone: '(555) 123-4567' },
    { name: 'Mike Johnson', role: 'Lead Installer', phone: '(555) 234-5678' },
    { name: 'Sarah Wilson', role: 'Sales Rep', phone: '(555) 345-6789' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Installation': return 'bg-warning text-warning-foreground';
      case 'Awarded': return 'bg-primary text-primary-foreground';
      case 'Complete': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getAreaStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'text-success';
      case 'in-progress': return 'text-warning';
      case 'pending': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const renderContent = () => {
    switch (job.status) {
      case 'Awarded':
        return (
          <Tabs defaultValue="documents" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>

            <TabsContent value="documents" className="space-y-4">
              <div className="relative">
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              </div>

              <div className="space-y-3">
                {documents.map((doc) => (
                  <Card key={doc.id} className="cursor-pointer hover:elevation-2">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <File size={24} className="text-accent" />
                        <div className="flex-1">
                          <h3 className="font-semibold">{doc.name}</h3>
                          <p className="text-sm text-muted-foreground">{doc.size}</p>
                          {doc.link && (
                            <p className="text-xs text-primary mt-1">View Specification Sheet</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="orders" className="space-y-4">
              <div className="space-y-3">
                {materials.map((material) => (
                  <Card key={material.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Package size={24} className="text-primary" />
                          <div className="flex-1">
                            <h3 className="font-semibold">{material.name}</h3>
                            <p className="text-sm text-muted-foreground">{material.quantity}</p>
                            {material.specs && (
                              <p className="text-xs text-primary mt-1 cursor-pointer hover:underline">
                                View Product Specifications
                              </p>
                            )}
                          </div>
                        </div>
                        <Badge className={material.status === 'delivered' ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'}>
                          {material.status.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        );

      case 'Installation':
        return (
          <div className="space-y-6">
            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Installation Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>{job.progress}%</span>
                  </div>
                  <Progress value={job.progress} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Roof Areas */}
            <Card>
              <CardHeader>
                <CardTitle>Roof Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {roofAreas.map((area) => (
                    <Card 
                      key={area.id} 
                      className="cursor-pointer hover:elevation-2"
                      onClick={() => navigate(`/installation/${job.id}/${area.id}`)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{area.name}</h3>
                          <div className={`${getAreaStatusColor(area.status)}`}>
                            {area.status === 'complete' && <CheckCircle size={20} />}
                            {area.status === 'in-progress' && <Clock size={20} />}
                            {area.status === 'pending' && <AlertTriangle size={20} />}
                          </div>
                        </div>
                        <Progress value={area.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1 capitalize">{area.status.replace('-', ' ')}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full mb-3"
                  onClick={() => navigate(`/job/${id}/schedule-inspection`)}
                >
                  <CalendarIcon size={20} className="mr-2" />
                  Request Inspection
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline">
                    <File size={20} className="mr-2" />
                    Documents
                  </Button>
                  <Button variant="outline">
                    <Package size={20} className="mr-2" />
                    Products
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contacts */}
            <Card>
              <CardHeader>
                <CardTitle>Project Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {contacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <User size={20} className="text-muted-foreground" />
                      <div>
                        <p className="font-semibold">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.role}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Phone size={20} />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-semibold mb-2">Job Complete</h3>
                <p className="text-muted-foreground">All work has been completed and approved.</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="h-full bg-background">
      {/* Header */}
      <div className="bg-gradient-primary safe-top">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/home')} className="text-white hover:bg-white/20">
              <ArrowLeft size={24} />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">{job.title}</h1>
              <div className="flex items-center space-x-3 mt-1">
                <div className="flex items-center text-white/80">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{job.location}</span>
                </div>
                <Badge className={getStatusColor(job.status)}>
                  {job.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        {renderContent()}
      </div>
    </div>
  );
}