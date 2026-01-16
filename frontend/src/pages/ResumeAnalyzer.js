import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Progress } from '../components/ui/progress';
import { resumeService } from '../services/api';
import { toast } from 'sonner';
import { Loader2, FileText, CheckCircle, XCircle, Lightbulb, Upload } from 'lucide-react';

export default function ResumeAnalyzer() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf' || selectedFile.type === 'text/plain' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        toast.success('File selected successfully');
      } else {
        toast.error('Please upload a PDF, TXT, or DOCX file');
        setFile(null);
        setFileName('');
      }
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error('Please upload your resume');
      return;
    }
    setLoading(true);
    try {
      const response = await resumeService.analyzeFile(file);
      // Extract the data object from the response
      const analysisData = response.data.data || response.data;
      setResult(analysisData);
      console.log('Analysis result:', analysisData);
      toast.success('Analysis complete!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    const numScore = typeof score === 'number' ? score : parseInt(score) || 0;
    if (numScore >= 80) return 'text-green-600';
    if (numScore >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12" data-testid="resume-analyzer">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-3">
              ATS Resume Analyzer
            </h1>
            <p className="text-lg text-muted-foreground">
              Get instant feedback on your resume's ATS compatibility
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-8" data-testid="input-card">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="resume">Upload Your Resume</Label>
                  <div className="mt-2 border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <input
                      id="resume"
                      type="file"
                      accept=".pdf,.txt,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      data-testid="resume-file-input"
                    />
                    <label htmlFor="resume" className="cursor-pointer flex flex-col items-center gap-3">
                      <Upload className="w-12 h-12 text-muted-foreground" />
                      <div>
                        <p className="font-semibold text-foreground">Click to upload or drag and drop</p>
                        <p className="text-sm text-muted-foreground mt-1">PDF, TXT, or DOCX (Max 5MB)</p>
                      </div>
                      {fileName && (
                        <p className="text-sm text-green-600 font-medium mt-2">
                          ✓ {fileName}
                        </p>
                      )}
                    </label>
                  </div>
                </div>
                <Button
                  onClick={handleAnalyze}
                  disabled={loading || !file}
                  className="w-full btn-primary h-12"
                  data-testid="analyze-button"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5 mr-2" />
                      Analyze Resume
                    </>
                  )}
                </Button>
              </div>
            </Card>

            <Card className="p-8" data-testid="result-card">
              {!result ? (
                <div className="flex items-center justify-center h-full text-center">
                  <div>
                    <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Your ATS score will appear here</p>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <div className="text-center" data-testid="ats-score-display">
                    <div className={`text-6xl font-heading font-bold mb-2 ${getScoreColor(result.score)}`}>
                      {result.score && !isNaN(result.score) ? Math.round(result.score) : '—'}%
                    </div>
                    <p className="text-muted-foreground mb-4">ATS Compatibility Score</p>
                    <Progress value={result.score && !isNaN(result.score) ? result.score : 0} className="h-2" />
                    <Button 
                      onClick={() => navigate('/job-match')}
                      className="mt-6 bg-primary hover:bg-primary/90"
                    >
                      Match with Job Descriptions
                    </Button>
                  </div>

                  {result.strengths?.length > 0 && (
                    <div data-testid="strengths-section">
                      <div className="flex items-center space-x-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <h3 className="font-heading font-semibold text-foreground">Strengths</h3>
                      </div>
                      <ul className="space-y-2">
                        {result.strengths.map((strength, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <span className="mr-2">•</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.weaknesses?.length > 0 && (
                    <div data-testid="weaknesses-section">
                      <div className="flex items-center space-x-2 mb-3">
                        <XCircle className="w-5 h-5 text-red-600" />
                        <h3 className="font-heading font-semibold text-foreground">Weaknesses</h3>
                      </div>
                      <ul className="space-y-2">
                        {result.weaknesses.map((weakness, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <span className="mr-2">•</span>
                            <span>{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.suggestions?.length > 0 && (
                    <div data-testid="suggestions-section">
                      <div className="flex items-center space-x-2 mb-3">
                        <Lightbulb className="w-5 h-5 text-yellow-600" />
                        <h3 className="font-heading font-semibold text-foreground">Suggestions</h3>
                      </div>
                      <ul className="space-y-2">
                        {result.suggestions.map((suggestion, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <span className="mr-2">•</span>
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}