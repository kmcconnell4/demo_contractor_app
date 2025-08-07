import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search as SearchIcon, Filter, Mic, MicOff, File, Package, Briefcase } from 'lucide-react';

export function Search() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isVoiceActive, setIsVoiceActive] = useState(searchParams.get('voice') === 'true');
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'all');
  const [sortBy, setSortBy] = useState('relevance');
  const [filterStatus, setFilterStatus] = useState(searchParams.get('status') || 'all');

  // Mock search results
  const mockResults = {
    documents: [
      { id: 1, type: 'document', title: 'Installation Manual - EPDM Membrane', category: 'Technical', size: '2.4 MB' },
      { id: 2, type: 'document', title: 'Safety Data Sheet - Primer XL', category: 'Safety', size: '1.1 MB' },
      { id: 3, type: 'document', title: 'Warranty Certificate - Downtown Office', category: 'Warranty', size: '0.8 MB' },
    ],
    products: [
      { id: 4, type: 'product', title: 'EPDM Membrane 60 mil', category: 'Membrane', code: 'EPD-60-BLK' },
      { id: 5, type: 'product', title: 'Polyiso Insulation 2"', category: 'Insulation', code: 'ISO-2-FG' },
      { id: 6, type: 'product', title: 'TPO Membrane 45 mil', category: 'Membrane', code: 'TPO-45-WHT' },
    ],
    jobs: [
      { id: 7, type: 'job', title: 'Downtown Office Complex', location: '450 Market Street, Philadelphia, PA 19106', status: 'Installation' },
      { id: 8, type: 'job', title: 'Retail Shopping Center', location: '2750 Cumberland Parkway, Mechanicsburg, PA 17055', status: 'Pending' },
      { id: 9, type: 'job', title: 'Tech Campus Building A', location: '1725 Duke Street, Camp Hill, PA 17011', status: 'Complete' },
    ]
  };

  const allResults = [...mockResults.documents, ...mockResults.products, ...mockResults.jobs];

  const getFilteredResults = () => {
    let results = activeTab === 'all' ? allResults : mockResults[activeTab as keyof typeof mockResults] || [];
    
    if (query) {
      results = results.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        ('category' in item && item.category.toLowerCase().includes(query.toLowerCase()))
      );
    }

    if (filterStatus !== 'all' && activeTab === 'jobs') {
      results = results.filter(item => 'status' in item && item.status.toLowerCase() === filterStatus);
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
    switch (type) {
      case 'document': return <File size={20} className="text-accent" />;
      case 'product': return <Package size={20} className="text-primary" />;
      case 'job': return <Briefcase size={20} className="text-[#008ce6]" />;
      default: return <File size={20} />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Installation': return 'bg-warning text-warning-foreground';
      case 'Pending': return 'bg-accent text-accent-foreground';
      case 'Complete': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
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
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Input
                placeholder="Search documents, products, or jobs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-12 h-12"
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
          <div className="flex items-center space-x-3 mt-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>

            {activeTab === 'jobs' && (
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="installation">Installation</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="complete">Complete</SelectItem>
                </SelectContent>
              </Select>
            )}

            <Button variant="outline" size="icon">
              <Filter size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="p-4 pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
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
                <Card key={item.id} className="cursor-pointer transition-material hover:elevation-2">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      {getItemIcon(item.type)}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-card-foreground truncate">
                          {item.title}
                        </h3>
                        
                        <div className="flex items-center space-x-2 mt-1">
                          {'category' in item && (
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                          )}
                          {'status' in item && (
                            <Badge className={`text-xs ${getStatusColor(item.status)} pointer-events-none`}>
                              {item.status}
                            </Badge>
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
                        
                        {'location' in item && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {getFilteredResults().length === 0 && (
              <div className="text-center py-12">
                <SearchIcon size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground">
                  No results found
                </h3>
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