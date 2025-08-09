import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Calendar, MapPin, Star, CloudSun, CloudRain, Wrench, AlertTriangle, Clock, FileText, Shield, Clipboard, FileCheck, FolderOpen, Bell } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
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

  // Helper function to get job image based on title
  const getJobImage = (title: string) => {
    const lowerTitle = title.toLowerCase();
    
    if (lowerTitle.includes('office')) {
      return '/Job pictures/Office building 1.jpeg';
    } else if (lowerTitle.includes('warehouse')) {
      return '/Job pictures/Warehouse 1.jpeg';
    } else if (lowerTitle.includes('hospital') || lowerTitle.includes('medical')) {
      return '/Job pictures/Hospital 1.jpeg';
    } else if (lowerTitle.includes('manufacturing') || lowerTitle.includes('plant')) {
      return '/Job pictures/Warehouse 2.jpeg';
    } else if (lowerTitle.includes('retail') || lowerTitle.includes('shopping')) {
      return '/Job pictures/Shopping center 1.jpeg';
    } else if (lowerTitle.includes('tech') || lowerTitle.includes('campus')) {
      return '/Job pictures/Office building 3.jpeg';
    } else if (lowerTitle.includes('construction')) {
      return '/Job pictures/Skyscraper.jpeg';
    } else {
      // Default fallback for other job types
      return '/Job pictures/Office building 1.jpeg';
    }
  };

  // Helper function to get updated job status
  const getJobStatus = (jobId: string, defaultStatus: string) => {
    const storedStatus = localStorage.getItem(`job_status_${jobId}`);
    return storedStatus || defaultStatus;
  };

  // Dynamic greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    const name = "Chris";
    
    if (hour < 12) {
      return `Good morning, ${name}!`;
    } else if (hour < 17) {
      return `Good afternoon, ${name}!`;
    } else {
      return `Good evening, ${name}!`;
    }
  };

  // Mock data for jobs
  const jobs = {
    pending: [
      { id: '7', title: 'New Construction Project', location: '123 Commerce Drive, Carlisle, PA', status: getJobStatus('7', 'Pending'), dueDate: '2024-08-25' },
    ],
    inProgress: [
      { id: '2', title: 'Retail Shopping Center', location: '2750 Cumberland Parkway, Mechanicsburg, PA', status: getJobStatus('2', 'Installation'), progress: 40 },
      { id: '9', title: 'Corporate Headquarters', location: '555 Business Drive, Harrisburg, PA', status: getJobStatus('9', 'Installation'), progress: 75 },
      { id: '1', title: 'Downtown Office Complex', location: '450 Market Street, Philadelphia, PA', status: getJobStatus('1', 'Installation'), progress: 65 },
      { id: '10', title: 'Distribution Center', location: '2200 Logistics Way, York, PA', status: getJobStatus('10', 'Installation'), progress: 30 },
      { id: '4', title: 'Warehouse Facility', location: '890 Norristown Road, Blue Bell, PA', status: getJobStatus('4', 'Awarded'), startDate: '2024-08-20' },
      { id: '11', title: 'Data Center Expansion', location: '1800 Technology Circle, King of Prussia, PA', status: getJobStatus('11', 'Installation'), progress: 85 },
      { id: '12', title: 'Automotive Plant', location: '3400 Industrial Park Drive, Lancaster, PA', status: getJobStatus('12', 'Installation'), progress: 20 },
    ],
    completed: [
      { id: '8', title: 'Hospital Renovation', location: '340 N 12th Street, Philadelphia, PA', status: getJobStatus('8', 'Complete'), completedDate: '2024-08-10' },
      { id: '3', title: 'Manufacturing Plant', location: '1500 Industrial Boulevard, Carlisle, PA', status: getJobStatus('3', 'Complete'), completedDate: '2024-08-15' },
      { id: '6', title: 'Medical Center', location: '100 N Academy Avenue, Danville, PA', status: getJobStatus('6', 'Complete'), completedDate: '2024-07-15' },
      { id: '5', title: 'Tech Campus Building A', location: '1725 Duke Street, Camp Hill, PA', status: getJobStatus('5', 'Complete'), completedDate: '2024-07-28' },
    ]
  };

  // Get favorited jobs
  const getFavoriteJobs = () => {
    const allJobs = [...jobs.pending, ...jobs.inProgress, ...jobs.completed];
    return allJobs.filter(job => isFavorite(job.id));
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Installation': return 'bg-warning text-warning-foreground';
      case 'Awarded': return 'bg-primary text-primary-foreground';
      case 'Complete': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const JobCard = ({ job, section }: { job: any; section: string }) => (
    <Card 
      className="cursor-pointer transition-material hover:elevation-2"
      onClick={() => navigate(`/job/${job.id}`)}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2 flex-1">
              <h3 className="font-semibold text-card-foreground">{job.title}</h3>
              <Button 
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-0 hover:bg-transparent"
                onClick={(e) => toggleFavorite(job.id, e)}
              >
                <Star 
                  size={16} 
                  className={`transition-colors ${
                    isFavorite(job.id) 
                      ? 'fill-yellow-500 text-yellow-500 hover:text-[#00509e] hover:fill-[#00509e]' 
                      : 'text-muted-foreground hover:text-[#00509e]'
                  }`} 
                />
              </Button>
            </div>
            <Badge className={`${getStatusColor(job.status)} pointer-events-none`}>
              {job.status}
            </Badge>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin size={16} className="mr-1" />
            {job.location}
          </div>
          
          {job.dueDate && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar size={16} className="mr-1" />
              Due: {new Date(job.dueDate).toLocaleDateString()}
            </div>
          )}
          
          {job.completedDate && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar size={16} className="mr-1" />
              Completed: {new Date(job.completedDate).toLocaleDateString()}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="h-full bg-background">
      {/* Header */}
      <div className="bg-gradient-primary-two-color safe-top rounded-b-3xl">
        <div className="p-4 pb-6">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <Avatar 
                className="h-10 w-10 cursor-pointer" 
                onClick={() => navigate('/profile')}
              >
                <AvatarImage src="/Chris-profile.jpeg" alt="Chris Profile" />
                <AvatarFallback className="bg-white/20 text-white">C</AvatarFallback>
              </Avatar>
              <div className="flex-1 ml-4">
                <h1 className="text-2xl font-bold text-white">{getGreeting()}</h1>
                <div className="flex items-center text-white/80 text-sm">
                  <span>Carlisle, PA • 72°F</span>
                  <CloudSun size={16} className="ml-2" />
                </div>
              </div>
              <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Bell size={20} className="text-white" />
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Input
              placeholder="Search documents, products, or jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-full"
            />
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
          </div>
        </div>
      </div>

      {/* Job Dashboard */}
      <div className="home-page pt-8 px-4 space-y-8 pb-20">
        {/* Alerts Section */}
        <div>
          {/* Inspection Alert */}
          <div className="w-full max-w-[calc(100vw-2rem)] bg-blue-100 rounded-lg p-3 border border-blue-200">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-200 rounded-full p-1.5 flex-shrink-0">
                <Clock size={18} className="text-[#012b64]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#012b64] mb-1 text-sm">Inspection reminder</h3>
                <p className="text-xs text-[#012b64]/80 leading-relaxed">
                  You have an inspection scheduled at 4PM today at 450 Market Street
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Favorited Jobs */}
        {getFavoriteJobs().length > 0 && (
          <div className="-mt-2">
            <div className="mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">Favorites</h2>
                <Badge variant="secondary" className="text-xs bg-[#00509e] text-white hover:bg-[#00509e]">
                  {getFavoriteJobs().length}
                </Badge>
              </div>
            </div>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
              {getFavoriteJobs().map((job) => (
                <Card 
                  key={job.id}
                  className="cursor-pointer transition-material hover:elevation-2 w-[280px] flex-shrink-0"
                  onClick={() => navigate(`/job/${job.id}`)}
                >
                  <div className="relative">
                    <img 
                      src={getJobImage(job.title)} 
                      alt={job.title}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <Badge variant="outline" className="absolute top-2 left-2 text-xs bg-white/90 backdrop-blur-sm">
                      {getJobStatus(job.id, job.status)}
                    </Badge>
                    <Button 
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white backdrop-blur-sm"
                      onClick={(e) => toggleFavorite(job.id, e)}
                    >
                      <Star 
                        size={16} 
                        className={`transition-colors ${
                          isFavorite(job.id) 
                            ? 'fill-yellow-500 text-yellow-500' 
                            : 'text-gray-600'
                        }`} 
                      />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-card-foreground mb-1">{job.title}</h3>
                    <div className="flex items-start text-sm text-muted-foreground">
                      <MapPin size={14} className="mr-1 flex-shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{job.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Browse for Documents */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold">Browse for documents</h2>
            <button className="text-sm text-primary font-medium">View all</button>
          </div>
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2 pt-2">
            {/* Safety Data Sheets */}
            <div className="flex flex-col items-center text-center min-w-[80px] flex-shrink-0">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-md">
                <Shield size={28} className="text-[#00509e]" />
              </div>
              <span className="text-[10px] font-medium text-gray-700 leading-tight">Safety<br />Data Sheets</span>
            </div>
            
            {/* Product Data Sheets */}
            <div className="flex flex-col items-center text-center min-w-[80px] flex-shrink-0">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-md">
                <FileText size={28} className="text-[#00509e]" />
              </div>
              <span className="text-[10px] font-medium text-gray-700 leading-tight">Product<br />Data Sheets</span>
            </div>
            
            {/* Assembly Letters */}
            <div className="flex flex-col items-center text-center min-w-[80px] flex-shrink-0">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-md">
                <Clipboard size={28} className="text-[#00509e]" />
              </div>
              <span className="text-[10px] font-medium text-gray-700 leading-tight">Assembly<br />Letters</span>
            </div>
            
            {/* Warranty */}
            <div className="flex flex-col items-center text-center min-w-[80px] flex-shrink-0">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-md">
                <FileCheck size={28} className="text-[#00509e]" />
              </div>
              <span className="text-[10px] font-medium text-gray-700 leading-tight">Warranty</span>
            </div>
            
            {/* Other Documents */}
            <div className="flex flex-col items-center text-center min-w-[80px] flex-shrink-0">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-md">
                <FolderOpen size={28} className="text-[#00509e]" />
              </div>
              <span className="text-[10px] font-medium text-gray-700 leading-tight">Other<br />Documents</span>
            </div>
          </div>
        </div>

        {/* In Progress Jobs */}
        {jobs.inProgress.length > 0 && (
          <div className="pt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">In Progress</h2>
                <Badge variant="secondary" className="text-xs bg-[#00509e] text-white hover:bg-[#00509e]">
                  {jobs.inProgress.length}
                </Badge>
              </div>
              <button className="text-sm text-primary font-medium">View all jobs</button>
            </div>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
              {jobs.inProgress.map((job) => (
                <Card 
                  key={job.id}
                  className="cursor-pointer transition-material hover:elevation-2 w-[280px] flex-shrink-0"
                  onClick={() => navigate(`/job/${job.id}`)}
                >
                  <div className="relative">
                    <img 
                      src={getJobImage(job.title)} 
                      alt={job.title}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <Badge variant="outline" className="absolute top-2 left-2 text-xs bg-white/90 backdrop-blur-sm">
                      {getJobStatus(job.id, job.status)}
                    </Badge>
                    <Button 
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white backdrop-blur-sm"
                      onClick={(e) => toggleFavorite(job.id, e)}
                    >
                      <Star 
                        size={16} 
                        className={`transition-colors ${
                          isFavorite(job.id) 
                            ? 'fill-yellow-500 text-yellow-500' 
                            : 'text-gray-600'
                        }`} 
                      />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-card-foreground mb-1">{job.title}</h3>
                    <div className="flex items-start text-sm text-muted-foreground">
                      <MapPin size={14} className="mr-1 flex-shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{job.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Recently Completed Jobs */}
        {jobs.completed.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">Recently Completed</h2>
                <Badge variant="secondary" className="text-xs bg-[#00509e] text-white hover:bg-[#00509e]">
                  {jobs.completed.length}
                </Badge>
              </div>
              <button className="text-sm text-primary font-medium">View all jobs</button>
            </div>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
              {jobs.completed.map((job) => (
                <Card 
                  key={job.id}
                  className="cursor-pointer transition-material hover:elevation-2 w-[280px] flex-shrink-0"
                  onClick={() => navigate(`/job/${job.id}`)}
                >
                  <div className="relative">
                    <img 
                      src={getJobImage(job.title)} 
                      alt={job.title}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <Badge variant="outline" className="absolute top-2 left-2 text-xs bg-white/90 backdrop-blur-sm">
                      {getJobStatus(job.id, job.status)}
                    </Badge>
                    <Button 
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white backdrop-blur-sm"
                      onClick={(e) => toggleFavorite(job.id, e)}
                    >
                      <Star 
                        size={16} 
                        className={`transition-colors ${
                          isFavorite(job.id) 
                            ? 'fill-yellow-500 text-yellow-500' 
                            : 'text-gray-600'
                        }`} 
                      />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-card-foreground mb-1">{job.title}</h3>
                    <div className="flex items-start text-sm text-muted-foreground">
                      <MapPin size={14} className="mr-1 flex-shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{job.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}