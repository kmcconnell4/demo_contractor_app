import { useState } from 'react';

// Helper to format history timestamp as 'Month Day, Year at XX:XXAM/PM'
function formatHistoryTimestamp(ts: string) {
  // Example: '2024-07-28 2:15 PM' => 'July 28, 2024 at 2:15PM'
  const dateTimeMatch = ts.match(/(\d{4})-(\d{2})-(\d{2}) (\d{1,2}):(\d{2}) ([AP]M)/);
  if (!dateTimeMatch) return ts;
  const year = dateTimeMatch[1];
  const month = dateTimeMatch[2];
  const day = dateTimeMatch[3];
  const hour = dateTimeMatch[4];
  const minute = dateTimeMatch[5];
  const ampm = dateTimeMatch[6];
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const monthName = months[parseInt(month, 10) - 1];
  return `${monthName} ${parseInt(day, 10)}, ${year} at ${hour}:${minute}${ampm}`;
}
import { useParams, useNavigate } from 'react-router-dom';
import { jobsData } from '@/lib/jobsData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { 
  ArrowLeft, Box, 
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
  Star,
  MoreVertical,
  Edit,
  Archive,
  Trash2,
  Share
} from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import { InstallationDetails } from './InstallationDetails';
import { getJobImage } from '@/lib/getJobImage';
import installationDetailsData from '../../lib/installationDetailsData';

function getJobProductDocs(jobId: string) {
  const jobDetails = installationDetailsData.find(j => j.jobId === jobId);
  if (!jobDetails) return [];
  // Example mapping for demo purposes
  return jobDetails.sections.flatMap(section =>
    section.products.map(product => ({
      product: product.name,
      safetyDataSheet: `/docs/sds/${product.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}-sds.pdf`,
      productDataSheet: `/docs/pds/${product.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}-pds.pdf`
    }))
  );
}

export function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  
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
  const getJobStatus = (jobId: string, defaultStatus: string) => {
    const stored = localStorage.getItem(`job_${jobId}_status`);
    return stored || defaultStatus;
  };

  // Job data that matches the Home page structure
  const getAllJobs = () => {
    // Use centralized jobsData for all job lists
    return jobsData.map(job => ({
      ...job,
      status: getJobStatus(job.id, job.status)
    }));
  };

  // Find the specific job by ID
  const getJobData = () => {
  const allJobs = getAllJobs();
  const stringId = String(id).trim();
  return allJobs.find(job => String(job.id).trim() === stringId) || allJobs.find(job => job.id === '1'); // Default to job 1 if not found
  };

  const jobData = getJobData();

  // Mock job data
  const job = {
    id,
    ...jobData,
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
    { id: 1, name: `Assembly Letter - ${job.title}`, category: 'Project', type: 'pdf', size: '1.2 MB', link: '#' },
    { id: 2, name: `Submittal Package - ${job.title}`, category: 'Project', type: 'pdf', size: '3.4 MB', link: '#' },
    { id: 3, name: `Warranty Application - ${job.title}`, category: 'Project', type: 'pdf', size: '1.0 MB', link: '#' },
    { id: 4, name: `Roof Drawing - ${job.title}`, category: 'Project', type: 'pdf', size: '2.2 MB', link: '#' },
    { id: 5, name: `Notice of Award - ${job.title}`, category: 'Project', type: 'pdf', size: '0.9 MB', link: '#' },
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

  const jobProductDocs = getJobProductDocs(id ?? '1');

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

  // Helper function to get product images based on product names
  const getProductImages = (products: any[]) => {
    const productImageMap: { [key: string]: string } = {
      'Sure-Seal EPDM Membrane': 'https://www.carlislesyntec.com/-/media/Project/SynTec/Images/Products/Membranes/EPDM/sure-seal-epdm-membrane.jpg',
      'SecurShield HD Polyiso': 'https://www.carlislesyntec.com/-/media/Project/SynTec/Images/Products/Insulation/securshield-hd-polyiso.jpg',
      'FAST Adhesive': 'https://www.carlislesyntec.com/-/media/Project/SynTec/Images/Products/Adhesives/fast-adhesive.jpg',
      'Sure-Seal Lap Sealant': 'https://www.carlislesyntec.com/-/media/Project/SynTec/Images/Products/Sealants/sure-seal-lap-sealant.jpg',
      'Pressure-Sensitive Walkway': 'https://www.carlislesyntec.com/-/media/Project/SynTec/Images/Products/Accessories/walkway-pads.jpg',
      'Sure-Weld Splicing': 'https://www.carlislesyntec.com/-/media/Project/SynTec/Images/Products/Adhesives/sure-weld-splicing-cement.jpg',
      'Seam Tape': 'https://www.carlislesyntec.com/-/media/Project/SynTec/Images/Products/Accessories/seam-tape.jpg',
      'Edge Metal': 'https://www.carlislesyntec.com/-/media/Project/SynTec/Images/Products/Accessories/edge-metal.jpg',
      'Heavy-Duty Fasteners': 'https://www.carlislesyntec.com/-/media/Project/SynTec/Images/Products/Accessories/fasteners.jpg'
    };

    // Get the first matching product image, fallback to a generic product image
    for (const product of products.slice(0, 3)) { // Show up to 3 product images
      for (const [key, image] of Object.entries(productImageMap)) {
        if (product.name.includes(key)) {
          return image;
        }
      }
    }
    return '/placeholder.jpg'; // Fallback to placeholder
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

  // Filter documents by category
  const filterDocumentsByCategory = (docs: any[], category: string) => {
    if (category === 'all') return docs;
    return docs.filter(doc => doc.category === category);
  };

  const renderContent = () => {
    switch (job.status) {
      case 'Awarded':
        return (
          <div className="space-y-8">
          {/* Orders */}
          <Card>
            <CardHeader className="pb-4 pt-3">
              <h2 className="text-xl font-semibold leading-none tracking-tight">Orders</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                  {(showAllOrders ? orders : orders.slice(0, 3)).map((order) => (
                    <Card key={order.id} className="cursor-pointer hover:elevation-2" onClick={() => navigate(`/order/${order.id}`)}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <Box size={24} style={{ color: "#012b64" }} />
                              </div>
                              <div>
                                <h3 className="font-semibold">{order.orderNumber}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {order.status === 'delivered' ? 'Delivered' : 'Placed on'} {new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • {order.productCount} {order.productCount === 1 ? 'product' : 'products'}
                                </p>
                              </div>
                            </div>
                            <ChevronRight size={20} className="text-muted-foreground" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                ))}
                {!showAllOrders && orders.length > 3 && (
                  <div className="pt-2">
                    <Button variant="outline" size="sm" onClick={() => setShowAllOrders(true)}>
                      Show more
                    </Button>
                  </div>
                )}
                {showAllOrders && orders.length > 3 && (
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
            <CardHeader className="pb-4 pt-3">
              <h2 className="text-xl font-semibold leading-none tracking-tight">Documents</h2>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="Project" className="space-y-4">
                <TabsList className="h-auto p-0 bg-transparent border-b border-border rounded-none w-full justify-start">
                  <TabsTrigger value="Project" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">Project</TabsTrigger>
                  <TabsTrigger value="Safety Data" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">Safety Data</TabsTrigger>
                  <TabsTrigger value="Product Info" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">Product Info</TabsTrigger>
                </TabsList>

                <TabsContent value="Project" className="space-y-3">
                  <div className="space-y-3">
                    {filterDocumentsByCategory(installationDocuments, 'Project').map((doc) => (
                      <Card key={doc.id} className="cursor-pointer transition-material hover:elevation-2">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                              <File size={24} style={{ color: "#012b64" }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-card-foreground truncate">
                                {doc.name}
                              </h3>
                              <div className="flex items-center justify-between">
                                {['Pending', 'Awarded', 'Installation', 'Inspection', 'Complete'].map((status, index, arr) => {
                                  const isActive = job.status === status;
                                  const isCompleted = arr.indexOf(job.status) > index;
                                  const isCurrentOrPast = isActive || isCompleted;
                                  return (
                                    <div key={status} className="flex items-center">
                                      {/* Left connecting line for all except first step */}
                                      {index > 0 && (
                                        <div className={`w-10 h-0.5 mx-2 flex-shrink-0 transition-colors ${
                                          isCompleted ? 'bg-primary' : 'bg-gray-300'
                                        }`} />
                                      )}
                                      <div className="flex flex-col items-center">
                                        {/* Status Circle */}
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                          isCompleted 
                                            ? 'bg-primary border-primary' 
                                            : isActive 
                                              ? 'bg-primary border-primary' 
                                              : 'bg-transparent border-gray-300'
                                        }`}>
                                          {isCompleted ? (
                                            <CheckCircle size={14} className="text-white" />
                                          ) : isActive ? (
                                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                          ) : (
                                            <div className="w-2 h-2 bg-gray-300 rounded-full" />
                                          )}
                                        </div>
                                        {/* Status Label */}
                                        <span className={`text-xs mt-1 font-medium transition-colors ${
                                          isCurrentOrPast ? 'text-foreground' : 'text-muted-foreground'
                                        }`}>
                                          {status}
                                        </span>
                                      </div>
                                      {/* Right connecting line for all except last step */}
                                      {index < arr.length - 1 && (
                                        <div className={`w-10 h-0.5 mx-2 flex-shrink-0 transition-colors ${
                                          isCompleted ? 'bg-primary' : 'bg-gray-300'
                                        }`} />
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className="text-xs">{doc.category}</Badge>
                                <span className="text-sm text-muted-foreground">{doc.size}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* History */}
          <Card className="mt-6">
            <CardHeader className="pb-4 pt-3">
              <h2 className="text-xl font-semibold leading-none tracking-tight">History</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(showAllHistory ? jobHistory : jobHistory.slice(0, 3)).map((entry) => (
                  <div key={entry.id} className="pb-6">
                    <div className="flex items-center mb-2">
                      <span className="font-semibold text-base mr-2">{entry.action}</span>
                      <span className="text-[14px] text-muted-foreground font-normal">{formatHistoryTimestamp(entry.timestamp)}</span>
                    </div>
                    <div className="mb-4">
                      <span className="text-base text-muted-foreground font-normal">{entry.description}</span>
                      <span className="block text-xs text-muted-foreground mt-1">by {entry.user}</span>
                    </div>
                    <hr className="border-t border-border" />
                  </div>
                ))}
                {!showAllHistory && jobHistory.length > 3 && (
                  <div className="pt-2">
                    <Button variant="outline" size="sm" onClick={() => setShowAllHistory(true)}>
                      Show more
                    </Button>
                  </div>
                )}
                {showAllHistory && jobHistory.length > 3 && (
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
            {/* Only show Job Complete section if status is not Installation */}
            {job.status !== 'Installation' && (
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="text-lg font-semibold mb-2">Job Complete</h3>
                  <p className="text-muted-foreground">All work has been completed and approved.</p>
                </CardContent>
              </Card>
            )}

            {/* Documents */}
            <Card>
              <CardHeader className="pb-4 pt-3">
                <h2 className="text-xl font-semibold leading-none tracking-tight">Documents</h2>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="Project" className="space-y-4">
                  <TabsList className="h-auto p-0 bg-transparent border-b border-border rounded-none w-full justify-start">
                    <TabsTrigger value="Project" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">Project</TabsTrigger>
                    <TabsTrigger value="Safety" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">Safety Data</TabsTrigger>
                    <TabsTrigger value="Data Sheet" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">Product Info</TabsTrigger>
                  </TabsList>

                  <TabsContent value="Project" className="space-y-3">
                    <div className="space-y-3">
                      {filterDocumentsByCategory(installationDocuments, 'Project').map((doc) => (
                        <Card key={doc.id} className="cursor-pointer transition-material hover:elevation-2">
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <File size={24} style={{ color: "#012b64" }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-card-foreground truncate">
                                  {doc.name}
                                </h3>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge variant="outline" className="text-xs">{doc.category}</Badge>
                                  <span className="text-sm text-muted-foreground">{doc.size}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="Safety" className="space-y-3">
                    <div className="space-y-3">
                      {filterDocumentsByCategory(installationDocuments, 'Safety').map((doc) => (
                        <Card key={doc.id} className="cursor-pointer transition-material hover:elevation-2">
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <File size={24} style={{ color: "#012b64" }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-card-foreground truncate">
                                  {doc.name}
                                </h3>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge variant="outline" className="text-xs">{doc.category}</Badge>
                                  <span className="text-sm text-muted-foreground">{doc.size}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="Data Sheet" className="space-y-3">
                    <div className="space-y-3">
                      {filterDocumentsByCategory(installationDocuments, 'Data Sheet').map((doc) => (
                        <Card key={doc.id} className="cursor-pointer transition-material hover:elevation-2">
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <File size={24} style={{ color: "#012b64" }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-card-foreground truncate">
                                  {doc.name}
                                </h3>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge variant="outline" className="text-xs">{doc.category}</Badge>
                                  <span className="text-sm text-muted-foreground">{doc.size}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Orders */}
            <Card>
              <CardHeader className="pb-4 pt-3">
                <h2 className="text-xl font-semibold leading-none tracking-tight">Orders</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(showAllOrders ? orders : orders.slice(0, 3)).map((order) => (
                    <Card key={order.id} className="cursor-pointer hover:elevation-2" onClick={() => navigate(`/order/${order.id}`)}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <Box size={24} style={{ color: "#012b64" }} />
                              </div>
                              <div>
                                <h3 className="font-semibold">{order.orderNumber}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {order.status === 'delivered' ? 'Delivered' : 'Placed on'} {new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • {order.productCount} {order.productCount === 1 ? 'product' : 'products'}
                                </p>
                              </div>
                            </div>
                            <ChevronRight size={20} className="text-muted-foreground" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {!showAllOrders && orders.length > 3 && (
                    <div className="pt-2">
                      <Button variant="outline" size="sm" onClick={() => setShowAllOrders(true)}>
                        Show more
                      </Button>
                    </div>
                  )}
                  {showAllOrders && orders.length > 3 && (
                    <div className="pt-2">
                      <Button variant="outline" size="sm" onClick={() => setShowAllOrders(false)}>
                        Show less
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-4 pt-3">
                <h2 className="text-xl font-semibold leading-none tracking-tight">History</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(showAllHistory ? jobHistory : jobHistory.slice(0, 3)).map((entry) => (
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
                  {!showAllHistory && jobHistory.length > 3 && (
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
    <div className="h-full">
      {/* Background Image that extends behind content */}
      <div className="relative">
        <div className="h-56">
          <img 
            src={getJobImage(job.title)} 
            alt={job.title}
            className="w-full h-full object-cover"
          />
          {/* Back Button Overlay */}
          <button 
            onClick={() => navigate(-1)} 
            className="absolute left-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-md"
            style={{ top: 'calc(env(safe-area-inset-top) + 3rem)' }}
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          {/* More Options Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-4 h-10 w-10 p-0 bg-white/90 hover:bg-white shadow-md rounded-full"
                style={{ top: 'calc(env(safe-area-inset-top) + 3rem)' }}
              >
                <MoreVertical size={20} className="text-gray-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer">
                Request inspection
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Manage job team
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Body Content Section with overlap and job info */}
      <div className="bg-background rounded-t-3xl px-8 pb-20 -mt-6 relative z-10 shadow-xl min-h-screen">
        {/* Job Info Section */}
        <div className="mb-6 pt-2">
          <div className="flex items-baseline mb-2">
            <h1 className="text-2xl font-bold text-foreground">{job.title}</h1>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => toggleFavorite(job.id)} 
              className="h-8 w-8 p-0 hover:bg-transparent ml-2"
            >
              <Star 
                size={20} 
                className={`transition-colors ${
                  isFavorite(job.id) 
                    ? "fill-yellow-500 text-yellow-500" 
                    : "text-gray-400 hover:text-yellow-500"
                }`} 
              />
            </Button>
          </div>
          
          <div className="flex items-center text-muted-foreground mb-4">
            <MapPin size={16} className="mr-1" />
            <span className="text-sm">{job.location}</span>
          </div>
          
          {/* Status Progress Tracker */}
          <div className="mb-6 max-w-md mx-auto">
            <div className="flex items-center justify-between">
              {['Pending', 'Awarded', 'Installation', 'Inspection', 'Complete'].map((status, index, arr) => {
                const isActive = job.status === status;
                const isCompleted = ['Pending', 'Awarded', 'Installation', 'Complete'].indexOf(job.status) > index;
                const isCurrentOrPast = isActive || isCompleted;
                
                return (
                  <div key={status} className="flex-1 flex items-center">
                    <div className="flex flex-col items-center">
                      {/* Status Circle */}
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-primary border-primary' 
                          : isActive 
                            ? 'bg-primary border-primary' 
                            : 'bg-transparent border-gray-300'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle size={14} className="text-white" />
                        ) : isActive ? (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        ) : (
                          <div className="w-2 h-2 bg-gray-300 rounded-full" />
                        )}
                      </div>
                      
                      {/* Status Label */}
                      <span className={`text-xs mt-1 font-medium transition-colors ${
                        isCurrentOrPast ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {status}
                      </span>
                    </div>
                    
                    {/* Connecting Line */}
                    {index < 3 && (
                      <div className={`flex-1 h-0.5 mx-2 transition-colors ${
                        isCompleted ? 'bg-primary' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Installation Instructions Section - Only show for Installation status */}
          {job.status === 'Installation' && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Installation instructions</h2>
              <div className="space-y-2">
                {roofAreas.map((area) => (
                  <div 
                    key={area.id} 
                    className="border border-gray-300 rounded-lg overflow-hidden"
                  >
                    <button 
                      className="w-full px-4 py-3 text-left font-medium text-foreground bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                      onClick={() => { setSelectedArea(area.id); setShowInstallModal(true); }}
                    >
                      <span>{area.name}</span>
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </button>
                  </div>
                ))}
              </div>
              <Dialog open={showInstallModal} onOpenChange={setShowInstallModal}>
                {selectedArea && (
                  <InstallationDetails id={job.id} area={selectedArea} onClose={() => setShowInstallModal(false)} />
                )}
              </Dialog>
            </div>
          )}
        </div>
        
        {/* Main Content */}
        {renderContent()}
        
      </div>
    </div>
  );
}