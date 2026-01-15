import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { jobService, applicationService, resumeService } from '../services/api';
import { toast } from 'sonner';
import { Briefcase, MapPin, Clock, IndianRupee, Loader2, Send } from 'lucide-react';

export default function JobsBoard() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    fetchJobs();
    fetchResumes();
  }, [category]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await jobService.getAll(category);
      setJobs(response.data);
    } catch (error) {
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const fetchResumes = async () => {
    try {
      const response = await resumeService.getAll();
      setResumes(response.data);
    } catch (error) {
      console.error('Failed to load resumes');
    }
  };

  const handleApply = async () => {
    if (!selectedResume) {
      toast.error('Please select a resume');
      return;
    }
    setApplying(true);
    try {
      await applicationService.create({
        job_id: selectedJob.id,
        resume_id: selectedResume,
        cover_letter: coverLetter || null
      });
      toast.success('Application submitted successfully!');
      setSelectedJob(null);
      setSelectedResume('');
      setCoverLetter('');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Application failed');
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12" data-testid="jobs-board">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-3">
              Jobs & Internships
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse and apply to curated opportunities
            </p>
          </div>

          <Tabs defaultValue="all" className="mb-8" onValueChange={(v) => setCategory(v === 'all' ? null : v)}>
            <TabsList data-testid="category-tabs">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="internship">Internships</TabsTrigger>
              <TabsTrigger value="job">Jobs</TabsTrigger>
            </TabsList>
          </Tabs>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid gap-6">
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-all" data-testid={`job-card-${index}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary rounded-sm flex items-center justify-center flex-shrink-0">
                            <Briefcase className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">{job.title}</h3>
                            <p className="text-lg font-medium text-primary mb-3">{job.company}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {job.location}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {job.job_type}
                              </div>
                              {(job.stipend || job.salary) && (
                                <div className="flex items-center font-medium text-foreground">
                                  <IndianRupee className="w-4 h-4 mr-1" />
                                  {job.stipend || job.salary}
                                </div>
                              )}
                            </div>
                            <p className="text-muted-foreground mb-3">{job.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {job.requirements?.slice(0, 4).map((req, i) => (
                                <Badge key={i} variant="outline">{req}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Dialog open={selectedJob?.id === job.id} onOpenChange={(open) => !open && setSelectedJob(null)}>
                        <DialogTrigger asChild>
                          <Button onClick={() => setSelectedJob(job)} data-testid={`apply-button-${index}`}>
                            Apply Now
                          </Button>
                        </DialogTrigger>
                        <DialogContent data-testid="apply-dialog">
                          <DialogHeader>
                            <DialogTitle>Apply to {job.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <Label>Select Resume</Label>
                              <Select value={selectedResume} onValueChange={setSelectedResume}>
                                <SelectTrigger className="mt-2" data-testid="resume-select">
                                  <SelectValue placeholder="Choose a resume" />
                                </SelectTrigger>
                                <SelectContent>
                                  {resumes.map((resume) => (
                                    <SelectItem key={resume.id} value={resume.id}>{resume.title}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Cover Letter (Optional)</Label>
                              <Textarea
                                placeholder="Write a brief cover letter..."
                                value={coverLetter}
                                onChange={(e) => setCoverLetter(e.target.value)}
                                className="mt-2 min-h-[120px]"
                                data-testid="cover-letter-input"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={handleApply} disabled={applying} data-testid="submit-application-button">
                              {applying ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                              Submit Application
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}