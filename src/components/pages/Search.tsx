import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search as SearchIcon, Filter, Mic, MicOff, File, Package, Briefcase, Heart, Star } from 'lucide-react';

export function Search() {
  // Modal state for filters
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isVoiceActive, setIsVoiceActive] = useState(searchParams.get('voice') === 'true');
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'all');
  const [sortBy, setSortBy] = useState('relevance');
  const [filterStatus, setFilterStatus] = useState(searchParams.get('status') || 'all');
  // New filter states
  const [filterJob, setFilterJob] = useState('all');
  const [filterSystem, setFilterSystem] = useState('all');
  const [filterType, setFilterType] = useState('all');
  
  // Favorites state management
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem('favorite_jobs');
    return stored ? JSON.parse(stored) : [];
  });
  
  const toggleFavorite = (jobId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setFavorites(prev => {
      const newFavorites = prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId];
      localStorage.setItem('favorite_jobs', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };
  
  const isFavorite = (jobId: string) => favorites.includes(jobId);

  // Mock search results
  const mockResults = {
    documents: [
      { id: 1, type: 'document', title: 'Installation Manual - EPDM Membrane', category: 'Technical', size: '2.4 MB' },
      { id: 2, type: 'document', title: 'Safety Data Sheet - Primer XL', category: 'Safety', size: '1.1 MB' },
  { id: 3, type: 'document', title: 'Warranty Application - Downtown Office', category: 'Warranty', size: '0.8 MB' },
      // Examples from Job Details page
      { id: 4, type: 'document', title: 'Assembly Letter - Downtown Office Complex', category: 'Project', size: '1.2 MB' },
      { id: 5, type: 'document', title: 'Submittal Package - EPDM Roofing System', category: 'Project', size: '3.4 MB' },
      { id: 6, type: 'document', title: 'Sure-Seal EPDM Membrane Data Sheet', category: 'Data Sheet', size: '2.1 MB' },
      { id: 7, type: 'document', title: 'SecurShield HD Polyiso Insulation Data Sheet', category: 'Data Sheet', size: '1.8 MB' },
      { id: 8, type: 'document', title: 'FAST Adhesive Product Data Sheet', category: 'Data Sheet', size: '1.5 MB' },
      { id: 9, type: 'document', title: 'FAST Adhesive Safety Data Sheet', category: 'Safety', size: '0.8 MB' },
      { id: 10, type: 'document', title: 'Sure-Seal Lap Sealant SDS', category: 'Safety', size: '0.6 MB' },
      { id: 11, type: 'document', title: 'Sure-Weld Splicing Cement SDS', category: 'Safety', size: '0.7 MB' },
    ],
    products: [
      { id: 4, type: 'product', title: 'EPDM Membrane 60 mil', category: 'Membrane', code: 'EPD-60-BLK' },
      { id: 5, type: 'product', title: 'Polyiso Insulation 2"', category: 'Insulation', code: 'ISO-2-FG' },
      { id: 6, type: 'product', title: 'TPO Membrane 45 mil', category: 'Membrane', code: 'TPO-45-WHT' },
    ],
    jobs: [
      // Pending jobs
      { id: 7, type: 'job', title: 'New Construction Project', location: '123 Commerce Drive, Carlisle, PA', status: 'Pending' },
      
      // In Progress jobs
      { id: 2, type: 'job', title: 'Retail Shopping Center', location: '2750 Cumberland Parkway, Mechanicsburg, PA', status: 'Installation' },
      { id: 9, type: 'job', title: 'Corporate Headquarters', location: '555 Business Drive, Harrisburg, PA', status: 'Installation' },
      { id: 1, type: 'job', title: 'Downtown Office Complex', location: '450 Market Street, Philadelphia, PA', status: 'Installation' },
      { id: 10, type: 'job', title: 'Distribution Center', location: '2200 Logistics Way, York, PA', status: 'Installation' },
      { id: 4, type: 'job', title: 'Warehouse Facility', location: '890 Norristown Road, Blue Bell, PA', status: 'Awarded' },
      { id: 11, type: 'job', title: 'Data Center Expansion', location: '1800 Technology Circle, King of Prussia, PA', status: 'Installation' },
      { id: 12, type: 'job', title: 'Automotive Plant', location: '3400 Industrial Park Drive, Lancaster, PA', status: 'Installation' },
      
      // Completed jobs
      { id: 8, type: 'job', title: 'Hospital Renovation', location: '340 N 12th Street, Philadelphia, PA', status: 'Complete' },
      { id: 3, type: 'job', title: 'Manufacturing Plant', location: '1500 Industrial Boulevard, Carlisle, PA', status: 'Complete' },
      { id: 6, type: 'job', title: 'Medical Center', location: '100 N Academy Avenue, Danville, PA', status: 'Complete' },
      { id: 5, type: 'job', title: 'Tech Campus Building A', location: '1725 Duke Street, Camp Hill, PA', status: 'Complete' },
    ]
  };

  const allResults = [...mockResults.documents, ...mockResults.products, ...mockResults.jobs];

  const getFilteredResults = () => {
    let results = allResults;
    // Tab filtering
    if (activeTab === 'documents') {
      results = results.filter(item => item.type === 'document');
    } else if (activeTab === 'products') {
      results = results.filter(item => item.type === 'product');
    } else if (activeTab === 'jobs') {
      results = results.filter(item => item.type === 'job');
    }
    // Search query filtering
    if (query) {
      results = results.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        ('category' in item && item.category.toLowerCase().includes(query.toLowerCase()))
      );
    }
    // Jobs tab: filter by status
    if (filterStatus !== 'all' && activeTab === 'jobs') {
      results = results.filter(item => 'status' in item && item.status.toLowerCase() === filterStatus);
    }
    // Documents/Products tab: filter by Job, System, Type
    if ((activeTab === 'documents' || activeTab === 'products')) {
      if (filterJob !== 'all') {
        results = results.filter(item => item.title.toLowerCase().includes(filterJob.toLowerCase()));
      }
      if (filterSystem !== 'all') {
        results = results.filter(item => ('category' in item) && item.category.toLowerCase() === filterSystem);
      }
      if (filterType !== 'all') {
        results = results.filter(item => ('type' in item) && item.type.toLowerCase() === filterType);
      }
    }
    return results;
  };

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
    if (!isVoiceActive) {
      // Start voice recognition
      setTimeout(() => setIsVoiceActive(false), 3000);
    }
  };

  const getItemIcon = (type: string) => {
    const iconColor = "#012b64";
    const containerClass = "w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0";
    
    switch (type) {
      case 'document': 
        return (
          <div className={containerClass}>
            <File size={24} style={{ color: iconColor }} />
          </div>
        );
      case 'product': 
        return (
          <div className={containerClass}>
            <Package size={24} style={{ color: iconColor }} />
          </div>
        );
      case 'job': 
        return (
          <div className={containerClass}>
            <Briefcase size={24} style={{ color: iconColor }} />
          </div>
        );
      default: 
        return (
          <div className={containerClass}>
            <File size={24} style={{ color: iconColor }} />
          </div>
        );
    }
  };

  useEffect(() => {
    if (isVoiceActive) {
      // Simulate voice recognition
      setTimeout(() => {
        setQuery('EPDM membrane installation');
        setIsVoiceActive(false);
      }, 2000);
    }
  }, [isVoiceActive]);

  useEffect(() => {
    // Handle URL parameter changes
    const status = searchParams.get('status');
    const tab = searchParams.get('tab');
    
    if (status) {
      setFilterStatus(status);
    }
    
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <div className="h-full bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border safe-top">
        <div className="p-8">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Input
                placeholder="Search documents, products, or jobs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-12 h-12 rounded-full"
              />
              <SearchIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleVoice}
                className={`absolute right-1 top-1 h-10 w-10 ${
                  isVoiceActive ? 'text-destructive' : 'text-muted-foreground'
                }`}
              >
                {isVoiceActive ? <MicOff size={20} /> : <Mic size={20} />}
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mt-3">

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="min-w-[160px] w-48 pl-3">
                <span className="font-medium mr-1">Sort By:</span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="min-w-[160px] w-48">
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>


            <Button variant="outline" size="sm" onClick={() => setIsFilterModalOpen(true)} className="flex items-center gap-2 px-3">
              <Filter size={20} />
              <span className="font-medium">Filter</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-background rounded-lg shadow-lg w-full max-w-sm mx-4 p-6 relative">
            <button
              className="absolute top-3 right-3 text-muted-foreground hover:text-primary"
              onClick={() => setIsFilterModalOpen(false)}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            {/* All tab filters */}
            {activeTab === 'all' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Job</label>
                  <Select value={filterJob} onValueChange={setFilterJob}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Job" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Jobs</SelectItem>
                      <SelectItem value="Downtown Office">Downtown Office</SelectItem>
                      <SelectItem value="Retail Shopping Center">Retail Shopping Center</SelectItem>
                      <SelectItem value="Warehouse Facility">Warehouse Facility</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Job status</label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Job status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All job statuses</SelectItem>
                      <SelectItem value="installation">Installation</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="complete">Complete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">System</label>
                  <Select value={filterSystem} onValueChange={setFilterSystem}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="System" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Systems</SelectItem>
                      <SelectItem value="Technical">Technical</SelectItem>
                      <SelectItem value="Safety">Safety</SelectItem>
                      <SelectItem value="Warranty">Warranty</SelectItem>
                      <SelectItem value="Membrane">Membrane</SelectItem>
                      <SelectItem value="Insulation">Insulation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            {/* Jobs tab filters */}
            {activeTab === 'jobs' && (
              <div className="space-y-4">
                <label className="block text-sm font-medium mb-1">Job status</label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Job status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All job statuses</SelectItem>
                    <SelectItem value="installation">Installation</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="complete">Complete</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {/* Documents/Products tab filters */}
            {(activeTab === 'documents' || activeTab === 'products') && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Job</label>
                  <Select value={filterJob} onValueChange={setFilterJob}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Job" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Jobs</SelectItem>
                      <SelectItem value="Downtown Office">Downtown Office</SelectItem>
                      <SelectItem value="Retail Shopping Center">Retail Shopping Center</SelectItem>
                      <SelectItem value="Warehouse Facility">Warehouse Facility</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">System</label>
                  <Select value={filterSystem} onValueChange={setFilterSystem}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="System" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Systems</SelectItem>
                      <SelectItem value="Technical">Technical</SelectItem>
                      <SelectItem value="Safety">Safety</SelectItem>
                      <SelectItem value="Warranty">Warranty</SelectItem>
                      <SelectItem value="Membrane">Membrane</SelectItem>
                      <SelectItem value="Insulation">Insulation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <div className="mt-6 flex justify-end">
              <Button variant="default" size="sm" onClick={() => setIsFilterModalOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="px-8 py-4 pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="h-auto p-0 bg-transparent border-b border-border rounded-none w-full justify-start">
            <TabsTrigger value="all" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">All</TabsTrigger>
            <TabsTrigger value="documents" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">Documents</TabsTrigger>
            <TabsTrigger value="products" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">Products</TabsTrigger>
            <TabsTrigger value="jobs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary">Jobs</TabsTrigger>
          </TabsList>

          <div className="mt-4">
            {isVoiceActive && (
              <Card className="mb-4 border-destructive/50 bg-destructive/5">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="animate-pulse">
                      <Mic size={24} className="text-destructive" />
                    </div>
                    <span className="text-destructive font-medium">Listening...</span>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-3">
              {getFilteredResults().map((item) => (
                <Card 
                  key={item.id} 
                  className="cursor-pointer transition-material hover:elevation-2"
                  onClick={() => {
                    if (item.type === 'product') {
                      window.location.href = `/product/${item.id}`;
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      {getItemIcon(item.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-card-foreground truncate">
                            {item.title}
                          </h3>
                          {item.type === 'job' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => toggleFavorite(item.id.toString(), e)}
                              className="shrink-0 h-6 w-6 hover:bg-transparent"
                            >
                              <Star
                                size={14}
                                className={`transition-colors ${
                                  isFavorite(item.id.toString()) 
                                    ? "fill-yellow-500 text-yellow-500" 
                                    : "text-muted-foreground hover:text-yellow-500"
                                }`}
                              />
                            </Button>
                          )}
                        </div>
                        
                        <div className="flex items-start justify-between mt-1">
                          <div className="flex flex-wrap items-center gap-2">
                            {'status' in item && (
                              <Badge variant="outline" className="text-xs">
                                {item.status}
                              </Badge>
                            )}
                            {'category' in item && (
                              <Badge variant="outline" className="text-xs">
                                {item.category}
                              </Badge>
                            )}
                            {'location' in item && (
                              <span className="text-sm text-muted-foreground leading-relaxed">
                                {item.location.replace(/, [A-Z]{2} \d{5}/, '')}
                              </span>
                            )}
                            {'code' in item && (
                              <span className="text-sm text-muted-foreground">
                                {item.code}
                              </span>
                            )}
                            {'size' in item && (
                              <span className="text-sm text-muted-foreground">
                                {item.size}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {getFilteredResults().length === 0 && (
              <div className="text-center py-12">
                <SearchIcon size={48} className="mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold text-muted-foreground">
                  No results found
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your search terms or filters
                </p>
              </div>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
}