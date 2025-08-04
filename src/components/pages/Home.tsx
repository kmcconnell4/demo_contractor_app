import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Calendar, MapPin, User } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Helper function to get updated job status
  const getJobStatus = (jobId: string, defaultStatus: string) => {
    const storedStatus = localStorage.getItem(`job_status_${jobId}`);
    return storedStatus || defaultStatus;
  };

  // Mock data for jobs
  const jobs = {
    pending: [
      { id: '7', title: 'New Construction Project', location: '123 Commerce Drive, Carlisle, PA 17013', status: getJobStatus('7', 'Pending'), dueDate: '2024-08-25' },
    ],
    inProgress: [
      { id: '1', title: 'Downtown Office Complex', location: '450 Market Street, Philadelphia, PA 19106', status: getJobStatus('1', 'Installation'), progress: 65 },
      { id: '2', title: 'Retail Shopping Center', location: '2750 Cumberland Parkway, Mechanicsburg, PA 17055', status: getJobStatus('2', 'Installation'), progress: 40 },
      { id: '3', title: 'Manufacturing Plant', location: '1500 Industrial Boulevard, Carlisle, PA 17015', status: getJobStatus('3', 'Pending Inspection'), dueDate: '2024-08-15' },
      { id: '4', title: 'Warehouse Facility', location: '890 Norristown Road, Blue Bell, PA 19422', status: getJobStatus('4', 'Awarded'), startDate: '2024-08-20' },
      { id: '8', title: 'Hospital Renovation', location: '340 N 12th Street, Philadelphia, PA 19107', status: getJobStatus('8', 'Repairs needed'), dueDate: '2024-08-10' },
    ],
    completed: [
      { id: '5', title: 'Tech Campus Building A', location: '1725 Duke Street, Camp Hill, PA 17011', status: getJobStatus('5', 'Complete'), completedDate: '2024-07-28' },
      { id: '6', title: 'Medical Center', location: '100 N Academy Avenue, Danville, PA 17822', status: getJobStatus('6', 'Complete'), completedDate: '2024-07-15' },
    ]
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Installation': return 'bg-warning text-warning-foreground';
      case 'Pending Inspection': return 'bg-accent text-accent-foreground';
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
            <Badge className={getStatusColor(job.status)}>
              {job.status}
            </Badge>
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
      <div className="bg-gradient-primary safe-top">
        <div className="p-4 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-white">Good morning!</h1>
              <p className="text-white/80">Ready to manage your projects?</p>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <User size={24} />
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Input
              placeholder="Search documents, products, or jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
          </div>
        </div>
      </div>

      {/* Job Dashboard */}
      <div className="p-4 space-y-6">
        {/* In Progress */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">In Progress</h2>
            <Badge variant="secondary">{jobs.inProgress.length}</Badge>
          </div>
          <div className="space-y-3">
            {jobs.inProgress.map((job) => (
              <JobCard key={job.id} job={job} section="inProgress" />
            ))}
          </div>
        </div>

        {/* Pending */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Pending</h2>
            <Badge variant="secondary">{jobs.pending.length}</Badge>
          </div>
          <div className="space-y-3">
            {jobs.pending.map((job) => (
              <JobCard key={job.id} job={job} section="pending" />
            ))}
          </div>
        </div>

        {/* Completed */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Recently Completed</h2>
            <Badge variant="secondary">{jobs.completed.length}</Badge>
          </div>
          <div className="space-y-3">
            {jobs.completed.map((job) => (
              <JobCard key={job.id} job={job} section="completed" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}