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
import { Briefcase, MapPin, Clock, IndianRupee, Loader2, Send, Upload, Search, ExternalLink } from 'lucide-react';

export default function JobsBoard() {
  /* Jobs Logic Removed as per requirement
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);
  
  useEffect(() => {
    fetchJobs(); // Removed
    fetchResumes(); // Removed
  }, [category]);
  */

  /* Helper functions removed as they are no longer used
  const fetchJobs = async () => { ... }
  const fetchResumes = async () => { ... }
  const handleApply = async () => { ... }
  */

  const [scanning, setScanning] = useState(false);
  const [keywordResults, setKeywordResults] = useState(null);

  const handleScanResume = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setScanning(true);
    setKeywordResults(null);
    try {
      const response = await resumeService.extractKeywords(file);
      setKeywordResults(response.data.data);
      toast.success('Resume analyzed for job keywords!');
    } catch (error) {
      toast.error('Failed to scan resume');
      console.error(error);
    } finally {
      setScanning(false);
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

          {/* Resume Scan Section */}
          <Card className="p-6 mb-8 border-primary/20 bg-primary/5">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  Find Jobs Matching Your Resume
                </h2>
                <p className="text-muted-foreground mb-4">
                  Upload your resume to automatically find relevant opportunities across major job platforms.
                </p>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors">
                    {scanning ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    {scanning ? 'Scanning Resume...' : 'Upload Resume & Scan'}
                    <input type="file" className="hidden" accept=".pdf,.docx,.txt" onChange={handleScanResume} disabled={scanning} />
                  </label>
                </div>
              </div>

              {keywordResults && (
                <div className="flex-1 w-full bg-background rounded-lg p-4 border shadow-sm">
                  <div className="mb-3">
                    <span className="text-sm font-semibold text-muted-foreground">Detected Role:</span>
                    <div className="font-bold text-lg text-primary">{keywordResults.role || 'Job Seeker'}</div>
                  </div>
                  <div className="mb-4">
                    <span className="text-sm font-semibold text-muted-foreground">Top Skills:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {keywordResults.skills?.map((skill, i) => (
                        <Badge key={i} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() => {
                        const query = `${keywordResults.role} ${keywordResults.skills?.slice(0, 2).join(' ')}`;
                        window.open(`https://internshala.com/internships/keywords-${query.replace(/\s+/g, '-')}`, '_blank');
                      }}
                    >
                      Internshala <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() => {
                        const query = `${keywordResults.role} ${keywordResults.skills?.slice(0, 2).join(' ')}`;
                        window.open(`https://www.naukri.com/${query.replace(/\s+/g, '-')}-jobs`, '_blank');
                      }}
                    >
                      Naukri <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() => {
                        const query = `${keywordResults.role}`;
                        window.open(`https://www.glassdoor.co.in/Job/jobs.htm?sc.keyword=${encodeURIComponent(query)}`, '_blank');
                      }}
                    >
                      Glassdoor <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() => {
                        const query = `${keywordResults.role}`;
                        window.open(`https://unstop.com/opportunities?searchTerm=${encodeURIComponent(query)}`, '_blank');
                      }}
                    >
                      Unstop <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}