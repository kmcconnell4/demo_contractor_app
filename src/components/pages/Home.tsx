import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Search, Calendar, MapPin, Heart, CloudSun, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

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
      { id: '7', title: 'New Construction Project', location: '123 Commerce Drive, Carlisle, PA 17013', status: getJobStatus('7', 'Pending'), dueDate: '2024-08-25' },
    ],
    inProgress: [
      { id: '1', title: 'Downtown Office Complex', location: '450 Market Street, Philadelphia, PA 19106', status: getJobStatus('1', 'Installation'), progress: 65 },
      { id: '2', title: 'Retail Shopping Center', location: '2750 Cumberland Parkway, Mechanicsburg, PA 17055', status: getJobStatus('2', 'Installation'), progress: 40 },
      { id: '4', title: 'Warehouse Facility', location: '890 Norristown Road, Blue Bell, PA 19422', status: getJobStatus('4', 'Awarded'), startDate: '2024-08-20' },
    ],
    completed: [
      { id: '3', title: 'Manufacturing Plant', location: '1500 Industrial Boulevard, Carlisle, PA 17015', status: getJobStatus('3', 'Complete'), completedDate: '2024-08-15' },
      { id: '5', title: 'Tech Campus Building A', location: '1725 Duke Street, Camp Hill, PA 17011', status: getJobStatus('5', 'Complete'), completedDate: '2024-07-28' },
      { id: '6', title: 'Medical Center', location: '100 N Academy Avenue, Danville, PA 17822', status: getJobStatus('6', 'Complete'), completedDate: '2024-07-15' },
      { id: '8', title: 'Hospital Renovation', location: '340 N 12th Street, Philadelphia, PA 19107', status: getJobStatus('8', 'Complete'), completedDate: '2024-08-10' },
    ]
  };

  // Mock data for alerts
  const alerts = [
    {
      id: 'alert-1',
      type: 'warning',
      title: 'Weather Alert',
      message: 'Heavy rain expected tomorrow. Review outdoor installation schedules.',
      icon: AlertTriangle,
      color: 'text-red-500'
    },
    {
      id: 'alert-2',
      type: 'info',
      title: 'Material Delivery',
      message: 'Roofing materials for Downtown Office Complex arriving Thursday.',
      icon: Clock,
      color: 'text-yellow-500'
    },
    {
      id: 'alert-3',
      type: 'success',
      title: 'Inspection Complete',
      message: 'Manufacturing Plant passed final safety inspection.',
      icon: CheckCircle,
      color: 'text-green-500'
    }
  ];

  // Get favorited jobs
  const getFavoriteJobs = () => {
    const allJobs = [...jobs.pending, ...jobs.inProgress, ...jobs.completed];
    return allJobs.filter(job => isFavorite(job.id));
  };

  // Get alert color based on type
  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'text-red-500';
      case 'info': return 'text-blue-500';
      case 'success': return 'text-green-500';
      default: return 'text-yellow-500';
    }
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
            <h3 className="font-semibold text-card-foreground">{job.title}</h3>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost"
                size="icon"
                className="h-8 w-8 p-0 hover:bg-transparent"
                onClick={(e) => toggleFavorite(job.id, e)}
              >
                <Heart 
                  size={18} 
                  className={`transition-colors ${
                    isFavorite(job.id) 
                      ? 'fill-red-500 text-red-500 hover:text-[#00509e] hover:fill-[#00509e]' 
                      : 'text-muted-foreground hover:text-[#00509e]'
                  }`} 
                />
              </Button>
              <Badge className={`${getStatusColor(job.status)} pointer-events-none`}>
                {job.status}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin size={16} className="mr-1" />
            {job.location}
          </div>
          
          {job.progress && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{job.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${job.progress}%` }}
                />
              </div>
            </div>
          )}
          
          {job.dueDate && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar size={16} className="mr-1" />
              Due: {new Date(job.dueDate).toLocaleDateString()}
            </div>
          )}
          
          {job.startDate && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar size={16} className="mr-1" />
              Starts: {new Date(job.startDate).toLocaleDateString()}
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
                <h1 className="text-xl font-bold text-white">{getGreeting()}</h1>
                <div className="flex items-center text-white/80 text-sm">
                  <span>Carlisle, PA • 72°F</span>
                  <CloudSun size={16} className="ml-2" />
                </div>
              </div>
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
      <div className="p-4 space-y-6 pb-20">
        {/* Timely Alerts Carousel */}
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {alerts.map((alert) => {
                const IconComponent = alert.icon;
                return (
                  <CarouselItem key={alert.id}>
                    <div className={`p-4 rounded-lg border-l-4 ${
                      alert.type === 'warning' ? 'bg-red-50 border-l-red-500 text-red-800' :
                      alert.type === 'info' ? 'bg-blue-50 border-l-blue-500 text-blue-800' :
                      'bg-green-50 border-l-green-500 text-green-800'
                    }`}>
                      <div className="flex items-start space-x-3">
                        <IconComponent size={20} className={
                          alert.type === 'warning' ? 'text-red-500' :
                          alert.type === 'info' ? 'text-blue-500' :
                          'text-green-500'
                        } />
                        <div className="flex-1">
                          <h3 className="font-semibold">{alert.title}</h3>
                          <p className="text-sm mt-1 opacity-90">{alert.message}</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Favorited Jobs */}
        {getFavoriteJobs().length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Favorite Jobs</h2>
              <Badge variant="secondary">{getFavoriteJobs().length}</Badge>
            </div>
            <div className="space-y-3">
              {getFavoriteJobs().map((job) => (
                <JobCard key={job.id} job={job} section="favorites" />
              ))}
            </div>
          </div>
        )}

        {/* Job Status Tabs */}
        <div>
          <h2 className="text-lg font-semibold mb-3">My Jobs</h2>
          <Tabs defaultValue="inProgress" className="w-full">
            <TabsList className="h-auto p-0 bg-transparent border-b border-border rounded-none w-full justify-start">
              <TabsTrigger 
                value="inProgress" 
                className="flex items-center space-x-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary"
              >
                <span>In Progress</span>
                <Badge variant="secondary" className="ml-2">{jobs.inProgress.length}</Badge>
              </TabsTrigger>
              <TabsTrigger 
                value="completed" 
                className="flex items-center space-x-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary"
              >
                <span>Completed</span>
                <Badge variant="secondary" className="ml-2">{jobs.completed.length}</Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="inProgress" className="space-y-3 mt-4">
              {jobs.inProgress.map((job) => (
                <JobCard key={job.id} job={job} section="inProgress" />
              ))}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-3 mt-4">
              {jobs.completed.map((job) => (
                <JobCard key={job.id} job={job} section="completed" />
              ))}
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/search?tab=jobs&status=complete')}
                >
                  View all completed jobs
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}