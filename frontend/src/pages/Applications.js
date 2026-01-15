import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { applicationService, jobService } from '../services/api';
import { toast } from 'sonner';
import { Loader2, Briefcase, Calendar, FileText } from 'lucide-react';
import { format } from 'date-fns';

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [jobsMap, setJobsMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appsResponse, jobsResponse] = await Promise.all([
          applicationService.getAll(),
          jobService.getAll()
        ]);
        setApplications(appsResponse.data);
        const jobsById = {};
        jobsResponse.data.forEach(job => {
          jobsById[job.id] = job;
        });
        setJobsMap(jobsById);
      } catch (error) {
        toast.error('Failed to load applications');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-700';
      case 'reviewing': return 'bg-yellow-100 text-yellow-700';
      case 'accepted': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12" data-testid="applications-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-3">
              My Applications
            </h1>
            <p className="text-lg text-muted-foreground">
              Track all your job applications in one place
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          ) : applications.length === 0 ? (
            <Card className="p-12 text-center" data-testid="no-applications">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">No Applications Yet</h3>
              <p className="text-muted-foreground">Start applying to jobs to see them here</p>
            </Card>
          ) : (
            <div className="grid gap-6">
              {applications.map((application, index) => {
                const job = jobsMap[application.job_id];
                return (
                  <motion.div
                    key={application.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                  >
                    <Card className="p-6" data-testid={`application-card-${index}`}>
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary rounded-sm flex items-center justify-center flex-shrink-0">
                              <Briefcase className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-heading font-semibold text-foreground mb-1">
                                {job?.title || 'Job Title'}
                              </h3>
                              <p className="text-lg font-medium text-primary mb-3">{job?.company || 'Company'}</p>
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  Applied {format(new Date(application.applied_at), 'MMM dd, yyyy')}
                                </div>
                                <div className="flex items-center">
                                  <FileText className="w-4 h-4 mr-1" />
                                  Resume ID: {application.resume_id.slice(0, 8)}
                                </div>
                              </div>
                              {application.cover_letter && (
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {application.cover_letter}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <Badge className={getStatusColor(application.status)} data-testid={`status-badge-${index}`}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </Badge>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}