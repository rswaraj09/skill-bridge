import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Progress } from '../components/ui/progress';
import { resumeService } from '../services/api';
import { toast } from 'sonner';
import { Loader2, Target, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';

export default function JobMatch() {
  const [resumeContent, setResumeContent] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    if (!resumeContent.trim() || !jobDescription.trim()) {
      toast.error('Please provide both resume and job description');
      return;
    }
    setLoading(true);
    try {
      const response = await resumeService.matchJob(resumeContent, jobDescription);
      setResult(response.data);
      toast.success('Match analysis complete!');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Match analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12" data-testid="job-match">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-3">
              Job Description Match
            </h1>
            <p className="text-lg text-muted-foreground">
              See how well your resume matches a specific job
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card className="p-6" data-testid="resume-input-card">
              <Label htmlFor="resume">Your Resume</Label>
              <Textarea
                id="resume"
                placeholder="Paste your resume content..."
                value={resumeContent}
                onChange={(e) => setResumeContent(e.target.value)}
                className="mt-2 min-h-[300px] font-mono text-sm"
                data-testid="resume-input"
              />
            </Card>
            <Card className="p-6" data-testid="job-input-card">
              <Label htmlFor="job">Job Description</Label>
              <Textarea
                id="job"
                placeholder="Paste the job description..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="mt-2 min-h-[300px] font-mono text-sm"
                data-testid="job-description-input"
              />
            </Card>
          </div>

          <div className="mb-8">
            <Button
              onClick={handleMatch}
              disabled={loading}
              className="w-full btn-primary h-12"
              data-testid="match-button"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Analyzing Match...
                </>
              ) : (
                <>
                  <Target className="w-5 h-5 mr-2" />
                  Analyze Match
                </>
              )}
            </Button>
          </div>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-8" data-testid="match-result-card">
                <div className="space-y-8">
                  <div className="text-center" data-testid="match-percentage-display">
                    <div className={`text-6xl font-heading font-bold mb-2 ${getMatchColor(result.match_percentage)}`}>
                      {Math.round(result.match_percentage)}%
                    </div>
                    <p className="text-muted-foreground mb-4">Match Percentage</p>
                    <Progress value={result.match_percentage} className="h-2" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {result.matching_skills?.length > 0 && (
                      <div data-testid="matching-skills-section">
                        <div className="flex items-center space-x-2 mb-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <h3 className="font-heading font-semibold text-foreground">Matching Skills</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {result.matching_skills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {result.missing_skills?.length > 0 && (
                      <div data-testid="missing-skills-section">
                        <div className="flex items-center space-x-2 mb-3">
                          <XCircle className="w-5 h-5 text-red-600" />
                          <h3 className="font-heading font-semibold text-foreground">Missing Skills</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {result.missing_skills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {result.recommendations?.length > 0 && (
                    <div data-testid="recommendations-section">
                      <div className="flex items-center space-x-2 mb-3">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        <h3 className="font-heading font-semibold text-foreground">Recommendations</h3>
                      </div>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <span className="mr-2">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}