import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
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
  Clock,
  ChevronDown,
  ChevronRight,
  ShoppingCart,
  Heart
} from 'lucide-react';

export function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  
  // Favorites state management
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem('favorite_jobs');
    return stored ? JSON.parse(stored) : [];
  });
  
  const toggleFavorite = (jobId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId];
      localStorage.setItem('favorite_jobs', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };
  
  const isFavorite = (jobId: string) => favorites.includes(jobId);

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
    { name: 'Chris Contractor', role: 'Contractor', phone: '(555) 123-4567' },
    { name: 'John Smith', role: 'Project Manager', phone: '(555) 123-4567' },
    { name: 'Mike Johnson', role: 'Lead Installer', phone: '(555) 234-5678' },
    { name: 'Sarah Wilson', role: 'Sales Rep', phone: '(555) 345-6789' },
  ];

  const orders = [
    {
      id: 'ORD-2024-001',
      orderNumber: 'PO-24-001',
      date: '2024-07-12',
      status: 'delivered',
      supplier: 'Carlisle SynTec',
      totalAmount: '$12,450.00',
      productCount: 5,
      products: [
        { name: 'Sure-Seal EPDM Membrane 60 mil', quantity: '2,500 sq ft', unitPrice: '$3.20', total: '$8,000.00' },
        { name: 'SecurShield HD Polyiso Insulation 2"', quantity: '2,500 sq ft', unitPrice: '$1.45', total: '$3,625.00' },
        { name: 'Sure-Seal Lap Sealant', quantity: '24 tubes', unitPrice: '$18.50', total: '$444.00' },
        { name: 'Pressure-Sensitive Walkway Pads', quantity: '50 pads', unitPrice: '$4.25', total: '$212.50' },
        { name: 'Heavy-Duty Fasteners', quantity: '200 pieces', unitPrice: '$0.84', total: '$168.50' }
      ]
    },
    {
      id: 'ORD-2024-002',
      orderNumber: 'PO-24-002',
      date: '2024-07-18',
      status: 'pending',
      supplier: 'Carlisle SynTec',
      totalAmount: '$2,850.00',
      productCount: 2,
      products: [
        { name: 'FAST Adhesive Primer', quantity: '15 gallons', unitPrice: '$165.00', total: '$2,475.00' },
        { name: 'Sure-Weld Splicing Cement', quantity: '15 tubes', unitPrice: '$25.00', total: '$375.00' }
      ]
    },
    {
      id: 'ORD-2024-003',
      orderNumber: 'PO-24-003',
      date: '2024-07-25',
      status: 'shipped',
      supplier: 'Roofing Supply Co.',
      totalAmount: '$1,245.00',
      productCount: 3,
      products: [
        { name: 'Seam Tape Rolls', quantity: '12 rolls', unitPrice: '$45.00', total: '$540.00' },
        { name: 'Edge Metal Strips', quantity: '25 pieces', unitPrice: '$18.50', total: '$462.50' },
        { name: 'Corner Reinforcement Pads', quantity: '20 pieces', unitPrice: '$12.13', total: '$242.60' }
      ]
    },
    {
      id: 'ORD-2024-004',
      orderNumber: 'PO-24-004',
      date: '2024-08-02',
      status: 'processing',
      supplier: 'Industrial Tools Ltd',
      totalAmount: '$875.50',
      productCount: 4,
      products: [
        { name: 'Roofing Roller Set', quantity: '2 sets', unitPrice: '$125.00', total: '$250.00' },
        { name: 'Membrane Cutting Blades', quantity: '50 pieces', unitPrice: '$8.50', total: '$425.00' },
        { name: 'Safety Harnesses', quantity: '4 pieces', unitPrice: '$35.50', total: '$142.00' },
        { name: 'Work Gloves - Heavy Duty', quantity: '12 pairs', unitPrice: '$4.88', total: '$58.50' }
      ]
    },
    {
      id: 'ORD-2024-005',
      orderNumber: 'PO-24-005',
      date: '2024-08-05',
      status: 'delivered',
      supplier: 'Carlisle SynTec',
      totalAmount: '$3,200.00',
      productCount: 2,
      products: [
        { name: 'Sure-Seal EPDM Cleaners', quantity: '8 gallons', unitPrice: '$95.00', total: '$760.00' },
        { name: 'Installation Tool Kit', quantity: '2 kits', unitPrice: '$1,220.00', total: '$2,440.00' }
      ]
    },
    {
      id: 'ORD-2024-006',
      orderNumber: 'PO-24-006',
      date: '2024-08-06',
      status: 'pending',
      supplier: 'Safety Supply Inc',
      totalAmount: '$450.75',
      productCount: 3,
      products: [
        { name: 'First Aid Kit - Construction', quantity: '2 kits', unitPrice: '$85.00', total: '$170.00' },
        { name: 'Safety Cones', quantity: '12 pieces', unitPrice: '$15.50', total: '$186.00' },
        { name: 'Warning Tape Rolls', quantity: '6 rolls', unitPrice: '$15.79', total: '$94.75' }
      ]
    }
  ];

  const jobHistory = [
    {
      id: 1,
      action: 'Created Assembly Letter',
      user: 'Sarah Wilson',
      timestamp: '2024-07-28 2:15 PM',
      description: 'Generated assembly letter for Downtown Office Complex project'
    },
    {
      id: 2,
      action: 'Updated status to Installation',
      user: 'John Smith',
      timestamp: '2024-07-25 9:30 AM',
      description: 'Project status changed from Awarded to Installation'
    },
    {
      id: 3,
      action: 'Added product specifications',
      user: 'Mike Johnson',
      timestamp: '2024-07-22 4:45 PM',
      description: 'Uploaded Sure-Seal EPDM and SecurShield HD product data sheets'
    },
    {
      id: 4,
      action: 'Updated project contacts',
      user: 'Sarah Wilson',
      timestamp: '2024-07-20 11:20 AM',
      description: 'Added lead installer contact information'
    },
    {
      id: 5,
      action: 'Created submittal package',
      user: 'John Smith',
      timestamp: '2024-07-18 1:00 PM',
      description: 'Compiled EPDM roofing system submittal documentation'
    },
    {
      id: 6,
      action: 'Updated status to Awarded',
      user: 'Sarah Wilson',
      timestamp: '2024-07-15 10:45 AM',
      description: 'Project status changed from Quote to Awarded'
    },
    {
      id: 7,
      action: 'Job created',
      user: 'Sarah Wilson',
      timestamp: '2024-07-10 3:30 PM',
      description: 'Initial job setup for Downtown Office Complex roofing project'
    }
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

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-success text-success-foreground';
      case 'shipped': return 'bg-info text-info-foreground';
      case 'processing': return 'bg-warning text-warning-foreground';
      case 'pending': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const toggleOrderExpansion = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  // Comprehensive documents array for Installation case with categories
  const installationDocuments = [
    { id: 1, name: 'Assembly Letter - Downtown Office Complex', category: 'Project', type: 'pdf', size: '1.2 MB' },
    { id: 2, name: 'Submittal Package - EPDM Roofing System', category: 'Project', type: 'pdf', size: '3.4 MB' },
    { id: 3, name: 'Sure-Seal EPDM Membrane Data Sheet', category: 'Data Sheet', type: 'pdf', size: '2.1 MB' },
    { id: 4, name: 'SecurShield HD Polyiso Insulation Data Sheet', category: 'Data Sheet', type: 'pdf', size: '1.8 MB' },
    { id: 5, name: 'FAST Adhesive Product Data Sheet', category: 'Data Sheet', type: 'pdf', size: '1.5 MB' },
    { id: 6, name: 'FAST Adhesive Safety Data Sheet', category: 'Safety', type: 'pdf', size: '0.8 MB' },
    { id: 7, name: 'Sure-Seal Lap Sealant SDS', category: 'Safety', type: 'pdf', size: '0.6 MB' },
    { id: 8, name: 'Sure-Weld Splicing Cement SDS', category: 'Safety', type: 'pdf', size: '0.7 MB' },
  ];

  // Filter documents based on search query
  const filterDocuments = (docs: any[], query: string) => {
    if (!query.trim()) return docs;
    return docs.filter(doc => 
      doc.name.toLowerCase().includes(query.toLowerCase()) ||
      (doc.category && doc.category.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const renderContent = () => {
    switch (job.status) {
      case 'Awarded':
        return (
          <div className="space-y-6">
          {/* Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(showAllOrders ? orders : orders.slice(0, 5)).map((order) => (
                  <Card key={order.id} className="cursor-pointer hover:elevation-2" onClick={() => toggleOrderExpansion(order.id)}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Package size={20} className="text-primary" />
                            <div>
                              <h3 className="font-semibold">{order.orderNumber}</h3>
                              <p className="text-sm text-muted-foreground">
                                {order.status === 'delivered' ? 'Delivered' : 'Placed on'} {new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • {order.productCount} {order.productCount === 1 ? 'product' : 'products'}
                              </p>
                            </div>
                          </div>
                          <Badge className={`${getOrderStatusColor(order.status)} pointer-events-none`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>

                        {expandedOrders.has(order.id) && (
                          <div className="border-t pt-3 mt-3">
                            <div className="space-y-2 mb-3">
                              {order.products.map((product, index) => (
                                <div key={index} className="flex justify-between items-center text-sm">
                                  <div className="flex-1">
                                    <p className="font-medium">{product.name}</p>
                                    <p className="text-muted-foreground">Qty: {product.quantity} @ {product.unitPrice}</p>
                                  </div>
                                  <span className="font-semibold">{product.total}</span>
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t">
                              <span className="text-sm font-semibold">Order Total</span>
                              <span className="text-sm font-semibold">{order.totalAmount}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {!showAllOrders && orders.length > 5 && (
                  <div className="pt-2">
                    <Button variant="outline" size="sm" onClick={() => setShowAllOrders(true)}>
                      Show more
                    </Button>
                  </div>
                )}
                {showAllOrders && orders.length > 5 && (
                  <div className="pt-2">
                    <Button variant="outline" size="sm" onClick={() => setShowAllOrders(false)}>
                      Show less
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-full"
                  />
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                </div>
                <Tabs defaultValue="all" className="space-y-4">
                <TabsList className="h-auto p-0 bg-transparent border-b border-border rounded-none w-full justify-start">
                  <TabsTrigger value="all" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">All</TabsTrigger>
                  <TabsTrigger value="project" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">Project</TabsTrigger>
                  <TabsTrigger value="data" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">Data Sheets</TabsTrigger>
                  <TabsTrigger value="safety" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">Safety</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-3">
                  <div className="space-y-3">
                    {filterDocuments(documents, searchQuery).map((doc) => (
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
                    {filterDocuments(documents, searchQuery).length === 0 && searchQuery && (
                      <div className="text-center py-8 text-muted-foreground">
                        <File size={48} className="mx-auto mb-2 opacity-50" />
                        <p>No documents found matching "{searchQuery}"</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="project" className="space-y-3">
                  <div className="space-y-3">
                    <Card className="cursor-pointer hover:elevation-2">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <File size={24} className="text-accent" />
                          <div className="flex-1">
                            <h3 className="font-semibold">Sure-Seal EPDM Installation Manual</h3>
                            <p className="text-sm text-muted-foreground">2.4 MB</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="cursor-pointer hover:elevation-2">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <File size={24} className="text-accent" />
                          <div className="flex-1">
                            <h3 className="font-semibold">Carlisle Warranty Certificate</h3>
                            <p className="text-sm text-muted-foreground">0.8 MB</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="data" className="space-y-3">
                  <div className="space-y-3">
                    <Card className="cursor-pointer hover:elevation-2">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <File size={24} className="text-accent" />
                          <div className="flex-1">
                            <h3 className="font-semibold">Sure-Weld TPO Specification Sheet</h3>
                            <p className="text-sm text-muted-foreground">1.8 MB</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="safety" className="space-y-3">
                  <div className="space-y-3">
                    <Card className="cursor-pointer hover:elevation-2">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <File size={24} className="text-accent" />
                          <div className="flex-1">
                            <h3 className="font-semibold">FAST Adhesive Safety Data Sheet</h3>
                            <p className="text-sm text-muted-foreground">1.1 MB</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
              </div>
            </CardContent>
          </Card>

          {/* History */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(showAllHistory ? jobHistory : jobHistory.slice(0, 5)).map((entry) => (
                  <div key={entry.id} className="pb-4 border-b border-border last:border-b-0 last:pb-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-semibold text-sm">{entry.action}</p>
                      <span className="text-xs text-muted-foreground">•</span>
                      <p className="text-xs text-muted-foreground">{entry.timestamp}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{entry.description}</p>
                    <p className="text-xs text-muted-foreground">by {entry.user}</p>
                  </div>
                ))}
                {!showAllHistory && jobHistory.length > 5 && (
                  <div className="pt-2">
                    <Button variant="outline" size="sm" onClick={() => setShowAllHistory(true)}>
                      Show more
                    </Button>
                  </div>
                )}
                {showAllHistory && (
                  <div className="pt-2">
                    <Button variant="outline" size="sm" onClick={() => setShowAllHistory(false)}>
                      Show less
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          </div>
        );

      case 'Installation':
        return (
          <div className="space-y-6">
            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>{job.progress}%</span>
                    </div>
                    <Progress value={job.progress} className="h-3" />
                  </div>
                  <Button 
                    className="w-full bg-success hover:bg-success/90 text-success-foreground"
                    onClick={() => navigate(`/job/${id}/schedule-inspection`)}
                  >
                    <CheckCircle size={20} className="mr-2 text-white" />
                    Mark complete and request inspection
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Roof Areas */}
            <Card>
              <CardHeader>
                <CardTitle>Installation</CardTitle>
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

            {/* Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(showAllOrders ? orders : orders.slice(0, 5)).map((order) => (
                    <Card key={order.id} className="cursor-pointer hover:elevation-2" onClick={() => toggleOrderExpansion(order.id)}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Package size={20} className="text-primary" />
                              <div>
                                <h3 className="font-semibold">{order.orderNumber}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {order.status === 'delivered' ? 'Delivered' : 'Placed on'} {new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • {order.productCount} {order.productCount === 1 ? 'product' : 'products'}
                                </p>
                              </div>
                            </div>
                            <Badge className={`${getOrderStatusColor(order.status)} pointer-events-none`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </div>

                          {expandedOrders.has(order.id) && (
                            <div className="border-t pt-3 mt-3">
                              <div className="space-y-2 mb-3">
                                {order.products.map((product, index) => (
                                  <div key={index} className="flex justify-between items-center text-sm">
                                    <div className="flex-1">
                                      <p className="font-medium">{product.name}</p>
                                      <p className="text-muted-foreground">Qty: {product.quantity} @ {product.unitPrice}</p>
                                    </div>
                                    <span className="font-semibold">{product.total}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="flex justify-between items-center pt-2 border-t">
                                <span className="text-sm font-semibold">Order Total</span>
                                <span className="text-sm font-semibold">{order.totalAmount}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {!showAllOrders && orders.length > 5 && (
                    <div className="pt-2">
                      <Button variant="outline" size="sm" onClick={() => setShowAllOrders(true)}>
                        Show more
                      </Button>
                    </div>
                  )}
                  {showAllOrders && orders.length > 5 && (
                    <div className="pt-2">
                      <Button variant="outline" size="sm" onClick={() => setShowAllOrders(false)}>
                        Show less
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 rounded-full"
                    />
                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  </div>
                  <Tabs defaultValue="all" className="space-y-4">
                  <TabsList className="h-auto p-0 bg-transparent border-b border-border rounded-none w-full justify-start">
                    <TabsTrigger value="all" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">All</TabsTrigger>
                    <TabsTrigger value="project" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">Project</TabsTrigger>
                    <TabsTrigger value="data" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">Data Sheets</TabsTrigger>
                    <TabsTrigger value="safety" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">Safety</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-3">
                    <div className="space-y-3">
                      {filterDocuments(installationDocuments, searchQuery).map((doc) => (
                        <Card key={doc.id} className="cursor-pointer transition-material hover:elevation-2">
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                              <File size={20} className="text-accent" />
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-card-foreground">{doc.name}</h3>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge variant="outline" className="text-xs">{doc.category}</Badge>
                                  <span className="text-sm text-muted-foreground">{doc.size}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      {filterDocuments(installationDocuments, searchQuery).length === 0 && searchQuery && (
                        <div className="text-center py-8 text-muted-foreground">
                          <File size={48} className="mx-auto mb-2 opacity-50" />
                          <p>No documents found matching "{searchQuery}"</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="project" className="space-y-3">
                    <div className="space-y-3">
                      <Card className="cursor-pointer transition-material hover:elevation-2">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <File size={20} className="text-accent" />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-card-foreground">Assembly Letter - Downtown Office Complex</h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className="text-xs">Project</Badge>
                                <span className="text-sm text-muted-foreground">1.2 MB</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="cursor-pointer transition-material hover:elevation-2">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <File size={20} className="text-accent" />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-card-foreground">Submittal Package - EPDM Roofing System</h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className="text-xs">Project</Badge>
                                <span className="text-sm text-muted-foreground">3.4 MB</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="data" className="space-y-3">
                    <div className="space-y-3">
                      <Card className="cursor-pointer transition-material hover:elevation-2">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <File size={20} className="text-accent" />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-card-foreground">Sure-Seal EPDM Membrane Data Sheet</h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className="text-xs">Data Sheet</Badge>
                                <span className="text-sm text-muted-foreground">2.1 MB</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="cursor-pointer transition-material hover:elevation-2">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <File size={20} className="text-accent" />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-card-foreground">SecurShield HD Polyiso Insulation Data Sheet</h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className="text-xs">Data Sheet</Badge>
                                <span className="text-sm text-muted-foreground">1.8 MB</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="cursor-pointer transition-material hover:elevation-2">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <File size={20} className="text-accent" />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-card-foreground">FAST Adhesive Product Data Sheet</h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className="text-xs">Data Sheet</Badge>
                                <span className="text-sm text-muted-foreground">1.5 MB</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="safety" className="space-y-3">
                    <div className="space-y-3">
                      <Card className="cursor-pointer transition-material hover:elevation-2">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <File size={20} className="text-accent" />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-card-foreground">FAST Adhesive Safety Data Sheet</h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className="text-xs">Safety</Badge>
                                <span className="text-sm text-muted-foreground">0.8 MB</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="cursor-pointer transition-material hover:elevation-2">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <File size={20} className="text-accent" />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-card-foreground">Sure-Seal Lap Sealant SDS</h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className="text-xs">Safety</Badge>
                                <span className="text-sm text-muted-foreground">0.6 MB</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="cursor-pointer transition-material hover:elevation-2">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <File size={20} className="text-accent" />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-card-foreground">Sure-Weld Splicing Cement SDS</h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className="text-xs">Safety</Badge>
                                <span className="text-sm text-muted-foreground">0.7 MB</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
                </div>
              </CardContent>
            </Card>

            {/* Products */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Products</CardTitle>
                  <Button variant="outline" size="sm">
                    View all products
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {/* Sure-Seal EPDM Membrane */}
                  <Card className="cursor-pointer hover:elevation-2">
                    <CardContent className="p-4">
                      <div className="flex space-x-4">
                        <img 
                          src="/placeholder.jpg" 
                          alt="Sure-Seal EPDM Membrane" 
                          className="w-16 h-16 object-cover rounded-lg bg-muted"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">Sure-Seal EPDM Membrane 60 mil</h3>
                          <p className="text-sm text-muted-foreground">Premium single-ply roofing membrane with superior durability and weather resistance for long-lasting protection.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* SecurShield HD Polyiso */}
                  <Card className="cursor-pointer hover:elevation-2">
                    <CardContent className="p-4">
                      <div className="flex space-x-4">
                        <img 
                          src="/placeholder.jpg" 
                          alt="SecurShield HD Polyiso Insulation" 
                          className="w-16 h-16 object-cover rounded-lg bg-muted"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">SecurShield HD Polyiso Insulation 2"</h3>
                          <p className="text-sm text-muted-foreground">High-performance polyisocyanurate insulation board providing excellent thermal efficiency and dimensional stability.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* FAST Adhesive */}
                  <Card className="cursor-pointer hover:elevation-2">
                    <CardContent className="p-4">
                      <div className="flex space-x-4">
                        <img 
                          src="/placeholder.jpg" 
                          alt="FAST Adhesive" 
                          className="w-16 h-16 object-cover rounded-lg bg-muted"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">FAST Adhesive Primer</h3>
                          <p className="text-sm text-muted-foreground">Quick-drying adhesive primer designed for optimal bonding of EPDM membrane systems to various substrates.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sure-Seal Lap Sealant */}
                  <Card className="cursor-pointer hover:elevation-2">
                    <CardContent className="p-4">
                      <div className="flex space-x-4">
                        <img 
                          src="/placeholder.jpg" 
                          alt="Sure-Seal Lap Sealant" 
                          className="w-16 h-16 object-cover rounded-lg bg-muted"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">Sure-Seal Lap Sealant</h3>
                          <p className="text-sm text-muted-foreground">Premium sealant for creating watertight seals at membrane overlaps and around penetrations in EPDM systems.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Walkway Pads */}
                  <Card className="cursor-pointer hover:elevation-2">
                    <CardContent className="p-4">
                      <div className="flex space-x-4">
                        <img 
                          src="/placeholder.jpg" 
                          alt="Pressure-Sensitive Walkway Pads" 
                          className="w-16 h-16 object-cover rounded-lg bg-muted"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">Pressure-Sensitive Walkway Pads</h3>
                          <p className="text-sm text-muted-foreground">Durable walkway protection pads that provide safe foot traffic areas while protecting the membrane surface.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
                      <Avatar className="h-8 w-8">
                        {contact.name === 'Chris Contractor' && (
                          <AvatarImage src="/Chris-profile.jpeg" alt={contact.name} />
                        )}
                        <AvatarFallback className="bg-gray-200 text-gray-600 text-sm font-medium">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
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

            {/* History */}
            <Card>
              <CardHeader>
                <CardTitle>History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(showAllHistory ? jobHistory : jobHistory.slice(0, 5)).map((entry) => (
                    <div key={entry.id} className="pb-4 border-b border-border last:border-b-0 last:pb-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-semibold text-sm">{entry.action}</p>
                        <span className="text-xs text-muted-foreground">•</span>
                        <p className="text-xs text-muted-foreground">{entry.timestamp}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{entry.description}</p>
                      <p className="text-xs text-muted-foreground">by {entry.user}</p>
                    </div>
                  ))}
                  {!showAllHistory && jobHistory.length > 5 && (
                    <div className="pt-2">
                      <Button variant="outline" size="sm" onClick={() => setShowAllHistory(true)}>
                        Show more
                      </Button>
                    </div>
                  )}
                  {showAllHistory && (
                    <div className="pt-2">
                      <Button variant="outline" size="sm" onClick={() => setShowAllHistory(false)}>
                        Show less
                      </Button>
                    </div>
                  )}
                </div>
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

            {/* Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(showAllOrders ? orders : orders.slice(0, 5)).map((order) => (
                    <Card key={order.id} className="cursor-pointer hover:elevation-2" onClick={() => toggleOrderExpansion(order.id)}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Package size={20} className="text-primary" />
                              <div>
                                <h3 className="font-semibold">{order.orderNumber}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {order.status === 'delivered' ? 'Delivered' : 'Placed on'} {new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • {order.productCount} {order.productCount === 1 ? 'product' : 'products'}
                                </p>
                              </div>
                            </div>
                            <Badge className={`${getOrderStatusColor(order.status)} pointer-events-none`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </div>

                          {expandedOrders.has(order.id) && (
                            <div className="border-t pt-3 mt-3">
                              <div className="space-y-2 mb-3">
                                {order.products.map((product, index) => (
                                  <div key={index} className="flex justify-between items-center text-sm">
                                    <div className="flex-1">
                                      <p className="font-medium">{product.name}</p>
                                      <p className="text-muted-foreground">Qty: {product.quantity} @ {product.unitPrice}</p>
                                    </div>
                                    <span className="font-semibold">{product.total}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="flex justify-between items-center pt-2 border-t">
                                <span className="text-sm font-semibold">Order Total</span>
                                <span className="text-sm font-semibold">{order.totalAmount}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {!showAllOrders && orders.length > 5 && (
                    <div className="pt-2">
                      <Button variant="outline" size="sm" onClick={() => setShowAllOrders(true)}>
                        Show more
                      </Button>
                    </div>
                  )}
                  {showAllOrders && orders.length > 5 && (
                    <div className="pt-2">
                      <Button variant="outline" size="sm" onClick={() => setShowAllOrders(false)}>
                        Show less
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 rounded-full"
                    />
                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  </div>
                  <Tabs defaultValue="all" className="space-y-4">
                  <TabsList className="h-auto p-0 bg-transparent border-b border-border rounded-none w-full justify-start">
                    <TabsTrigger value="all" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">All</TabsTrigger>
                    <TabsTrigger value="project" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">Project</TabsTrigger>
                    <TabsTrigger value="data" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">Data Sheets</TabsTrigger>
                    <TabsTrigger value="safety" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">Safety</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-3">
                    <div className="space-y-3">
                      {filterDocuments(documents, searchQuery).map((doc) => (
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
                      {filterDocuments(documents, searchQuery).length === 0 && searchQuery && (
                        <div className="text-center py-8 text-muted-foreground">
                          <File size={48} className="mx-auto mb-2 opacity-50" />
                          <p>No documents found matching "{searchQuery}"</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="project" className="space-y-3">
                    <div className="space-y-3">
                      <Card className="cursor-pointer hover:elevation-2">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <File size={24} className="text-accent" />
                            <div className="flex-1">
                              <h3 className="font-semibold">Sure-Seal EPDM Installation Manual</h3>
                              <p className="text-sm text-muted-foreground">2.4 MB</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="cursor-pointer hover:elevation-2">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <File size={24} className="text-accent" />
                            <div className="flex-1">
                              <h3 className="font-semibold">Carlisle Warranty Certificate</h3>
                              <p className="text-sm text-muted-foreground">0.8 MB</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="data" className="space-y-3">
                    <div className="space-y-3">
                      <Card className="cursor-pointer hover:elevation-2">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <File size={24} className="text-accent" />
                            <div className="flex-1">
                              <h3 className="font-semibold">Sure-Weld TPO Specification Sheet</h3>
                              <p className="text-sm text-muted-foreground">1.8 MB</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="safety" className="space-y-3">
                    <div className="space-y-3">
                      <Card className="cursor-pointer hover:elevation-2">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <File size={24} className="text-accent" />
                            <div className="flex-1">
                              <h3 className="font-semibold">FAST Adhesive Safety Data Sheet</h3>
                              <p className="text-sm text-muted-foreground">1.1 MB</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
                </div>
              </CardContent>
            </Card>

            {/* History */}
            <Card>
              <CardHeader>
                <CardTitle>History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(showAllHistory ? jobHistory : jobHistory.slice(0, 5)).map((entry) => (
                    <div key={entry.id} className="pb-4 border-b border-border last:border-b-0 last:pb-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-semibold text-sm">{entry.action}</p>
                        <span className="text-xs text-muted-foreground">•</span>
                        <p className="text-xs text-muted-foreground">{entry.timestamp}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{entry.description}</p>
                      <p className="text-xs text-muted-foreground">by {entry.user}</p>
                    </div>
                  ))}
                  {!showAllHistory && jobHistory.length > 5 && (
                    <div className="pt-2">
                      <Button variant="outline" size="sm" onClick={() => setShowAllHistory(true)}>
                        Show more
                      </Button>
                    </div>
                  )}
                  {showAllHistory && (
                    <div className="pt-2">
                      <Button variant="outline" size="sm" onClick={() => setShowAllHistory(false)}>
                        Show less
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="h-full bg-background">
      {/* Header */}
      <div className="bg-gradient-primary-two-color safe-top">
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
                <Badge className={`${getStatusColor(job.status)} pointer-events-none`}>
                  {job.status}
                </Badge>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => toggleFavorite(job.id)} 
              className="text-white hover:bg-transparent"
            >
              <Heart 
                size={24} 
                className={`transition-colors ${
                  isFavorite(job.id) 
                    ? "fill-red-500 text-red-500 hover:text-[#00509e] hover:fill-[#00509e]" 
                    : "text-white hover:text-[#00509e]"
                }`} 
              />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 pb-20">
        {renderContent()}
      </div>
    </div>
  );
}