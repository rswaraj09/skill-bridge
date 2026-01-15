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
import { Loader2, FileText, CheckCircle, XCircle, Lightbulb } from 'lucide-react';

export default function ResumeAnalyzer() {
  const [content, setContent] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!content.trim()) {
      toast.error('Please paste your resume content');
      return;
    }
    setLoading(true);
    try {
      const response = await resumeService.analyze(content);
      setResult(response.data);
      toast.success('Analysis complete!');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
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
                  <Label htmlFor="resume">Paste Your Resume Content</Label>
                  <Textarea
                    id="resume"
                    placeholder="Copy and paste your resume text here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="mt-2 min-h-[400px] font-mono text-sm"
                    data-testid="resume-content-input"
                  />
                </div>
                <Button
                  onClick={handleAnalyze}
                  disabled={loading}
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
                      {Math.round(result.score)}
                    </div>
                    <p className="text-muted-foreground mb-4">ATS Compatibility Score</p>
                    <Progress value={result.score} className="h-2" />
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