import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { resumeService } from '../services/api';
import { toast } from 'sonner';
import { Loader2, RefreshCw, Copy, Download, Upload, FileText } from 'lucide-react';

export default function ResumeRewriter() {
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeContent, setResumeContent] = useState('');
  const [rewrittenContent, setRewrittenContent] = useState('');
  const [analysisReport, setAnalysisReport] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [loading, setLoading] = useState(false);
  const [atsScore, setATSScore] = useState(null);
  const [jobMatch, setJobMatch] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!jobDescription.trim()) {
      toast.error('Please provide a job description first');
      return;
    }

    setResumeFile(file);
    setLoading(true);

    try {
      // Extract text from file
      const text = await file.text();
      setResumeContent(text);

      // Analyze and rewrite resume with job description
      const response = await resumeService.matchJobFile(file, jobDescription);

      setAnalysisReport(response.data);

      // Extract job match percentage if available
      if (response.data.data && response.data.data.match_percentage) {
        setJobMatch(response.data.data.match_percentage);
      }

      // Generate rewritten resume with the job description alignment
      const rewriteResponse = await resumeService.rewrite(text, 'professional', jobDescription);
      setRewrittenContent(rewriteResponse.data.rewritten_content);
      setATSScore(rewriteResponse.data.ats_score);

      const scoreEmoji = rewriteResponse.data.ats_score >= 95 ? '🎉' : rewriteResponse.data.ats_score >= 85 ? '✅' : '📝';
      toast.success(`${scoreEmoji} Resume rewritten! ATS Score: ${rewriteResponse.data.ats_score}%`);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to process resume');
      setResumeFile(null);
      setResumeContent('');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rewrittenContent);
    toast.success('Copied to clipboard!');
  };

  const handleDownload = () => {
    const doc = new jsPDF();

    // Set font size and type
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    // Split text to fit page
    // 180 is roughly the width of A4 (210mm) minus margins
    const splitText = doc.splitTextToSize(rewrittenContent, 180);

    // Add text to PDF with some margin
    doc.text(splitText, 15, 15);

    // Save PDF
    doc.save('rewritten_resume.pdf');
    toast.success('Resume downloaded as PDF!');
  };

  const handleUseTemplates = () => {
    navigate('/templates', { state: { resumeContent: rewrittenContent } });
  };

  const templates = [
    { value: 'modern', label: 'Modern' },
    { value: 'classic', label: 'Classic' },
    { value: 'minimal', label: 'Minimal' },
    { value: 'creative', label: 'Creative' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12" data-testid="resume-rewriter">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-3">
              AI Resume Rewriter
            </h1>
            <p className="text-lg text-muted-foreground">
              Transform your resume with AI-powered improvements based on job description
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Job Description & Resume Upload */}
            <Card className="p-8" data-testid="job-description-card">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="jobdesc">Job Description</Label>
                  <Textarea
                    id="jobdesc"
                    placeholder="Paste the job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="mt-2 min-h-[250px] font-mono text-sm"
                    data-testid="job-description-input"
                  />
                </div>

                <div>
                  <Label htmlFor="resume-upload" className="block mb-2">
                    Upload Your Resume
                  </Label>
                  <div className="relative">
                    <input
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                      disabled={loading || !jobDescription.trim()}
                      className="hidden"
                      data-testid="resume-file-input"
                    />
                    <label
                      htmlFor="resume-upload"
                      className={`flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${loading || !jobDescription.trim()
                        ? 'bg-muted border-muted-foreground/20 cursor-not-allowed'
                        : 'bg-muted hover:bg-accent border-border hover:border-primary'
                        }`}
                    >
                      <div className="text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm font-medium text-foreground">
                          {resumeFile ? resumeFile.name : 'Click to upload resume'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PDF, DOC, DOCX, or TXT
                        </p>
                      </div>
                    </label>
                  </div>
                  {jobDescription.trim() === '' && (
                    <p className="text-xs text-yellow-600 mt-2">
                      ⚠️ Please enter a job description first
                    </p>
                  )}
                </div>

                {resumeContent && (
                  <div className="pt-4 border-t">
                    <Label className="text-xs text-muted-foreground">Uploaded Resume Preview</Label>
                    <div className="mt-2 p-4 bg-muted rounded max-h-32 overflow-y-auto text-xs text-foreground">
                      {resumeContent.substring(0, 300)}...
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Right Column - Rewritten Resume */}
            <Card className="p-8" data-testid="rewritten-resume-card">
              {!rewrittenContent ? (
                <div className="flex items-center justify-center h-full text-center">
                  <div>
                    <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-2">
                      Your rewritten resume will appear here
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Upload a resume to get started
                    </p>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Rewritten Resume</Label>
                      <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {templates.map((t) => (
                            <SelectItem key={t.value} value={t.value}>
                              {t.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Textarea
                      value={rewrittenContent}
                      onChange={(e) => setRewrittenContent(e.target.value)}
                      className="mt-2 min-h-[400px] font-mono text-sm"
                      data-testid="rewritten-resume-output"
                    />
                  </div>

                  {analysisReport && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className={`p-4 rounded-lg border-2 ${atsScore && atsScore >= 85 ? 'bg-green-50 dark:bg-green-950 border-green-300 dark:border-green-700' : 'bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-700'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-sm">ATS Score</h3>
                          <span className={`text-2xl font-bold ${atsScore && atsScore >= 85 ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
                            {atsScore ? `${atsScore}%` : 'Analyzing...'}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {atsScore
                            ? (atsScore >= 95 ? '✅ Excellent ATS Compatibility' : atsScore >= 85 ? '⚠️ Good ATS Score' : '📝 Needs Improvement')
                            : '⏳ Calculating ATS score...'}
                        </p>
                      </div>

                      <div className={`p-4 rounded-lg border-2 ${jobMatch ? (jobMatch >= 85 ? 'bg-purple-50 dark:bg-purple-950 border-purple-300 dark:border-purple-700' : 'bg-amber-50 dark:bg-amber-950 border-amber-300 dark:border-amber-700') : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-sm">Job Match</h3>
                          <span className={`text-2xl font-bold ${jobMatch ? (jobMatch >= 85 ? 'text-purple-600 dark:text-purple-400' : 'text-amber-600 dark:text-amber-400') : 'text-gray-500'}`}>
                            {jobMatch ? `${jobMatch}%` : 'Analyzing...'}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {jobMatch
                            ? (jobMatch >= 85 ? '✅ Strong Alignment' : jobMatch >= 70 ? '⚠️ Good Fit' : '📝 Room for Improvement')
                            : '⏳ Calculating match score...'}
                        </p>
                      </div>
                    </div>
                  )}

                  {analysisReport && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h3 className="font-semibold text-sm mb-2">Optimization Summary</h3>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>✓ Resume optimized for ATS parsing</p>
                        <p>✓ Aligned with job description keywords</p>
                        <p>✓ Applied professional formatting</p>
                        {atsScore && atsScore >= 95 && <p className="text-green-700 dark:text-green-300 font-medium">✓ ATS Score exceeds 95% - Ready to submit!</p>}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={handleCopy}
                      variant="outline"
                      className="w-full"
                      data-testid="copy-button"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      onClick={handleDownload}
                      variant="outline"
                      className="w-full"
                      data-testid="download-button"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <Button
                    onClick={handleUseTemplates}
                    className="w-full btn-primary"
                  >
                    Use Multiple Templates to Create Resume
                  </Button>
                </motion.div>
              )}
            </Card>
          </div>

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 rounded-lg"
            >
              <Card className="p-8 text-center">
                <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-foreground font-medium">Analyzing and rewriting your resume...</p>
                <p className="text-sm text-muted-foreground mt-2">
                  This may take a moment
                </p>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}