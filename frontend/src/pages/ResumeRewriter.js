import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { resumeService } from '../services/api';
import { toast } from 'sonner';
import { Loader2, RefreshCw, Copy, Download } from 'lucide-react';

export default function ResumeRewriter() {
  const [originalContent, setOriginalContent] = useState('');
  const [rewrittenContent, setRewrittenContent] = useState('');
  const [tone, setTone] = useState('professional');
  const [loading, setLoading] = useState(false);

  const handleRewrite = async () => {
    if (!originalContent.trim()) {
      toast.error('Please paste your resume content');
      return;
    }
    setLoading(true);
    try {
      const response = await resumeService.rewrite(originalContent, tone);
      setRewrittenContent(response.data.rewritten_content);
      toast.success('Resume rewritten successfully!');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Rewrite failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rewrittenContent);
    toast.success('Copied to clipboard!');
  };

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
              Transform your resume with AI-powered improvements
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-8" data-testid="original-resume-card">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="original">Original Resume</Label>
                  <Textarea
                    id="original"
                    placeholder="Paste your current resume content..."
                    value={originalContent}
                    onChange={(e) => setOriginalContent(e.target.value)}
                    className="mt-2 min-h-[400px] font-mono text-sm"
                    data-testid="original-resume-input"
                  />
                </div>
                <div>
                  <Label htmlFor="tone">Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="mt-2" data-testid="tone-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="executive">Executive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleRewrite}
                  disabled={loading}
                  className="w-full btn-primary h-12"
                  data-testid="rewrite-button"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Rewriting...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2" />
                      Rewrite Resume
                    </>
                  )}
                </Button>
              </div>
            </Card>

            <Card className="p-8" data-testid="rewritten-resume-card">
              {!rewrittenContent ? (
                <div className="flex items-center justify-center h-full text-center">
                  <div>
                    <RefreshCw className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Your rewritten resume will appear here</p>
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
                    <Label>Rewritten Resume</Label>
                    <Textarea
                      value={rewrittenContent}
                      onChange={(e) => setRewrittenContent(e.target.value)}
                      className="mt-2 min-h-[400px] font-mono text-sm"
                      data-testid="rewritten-resume-output"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      onClick={handleCopy}
                      variant="outline"
                      className="flex-1"
                      data-testid="copy-button"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      onClick={() => toast.info('Download feature coming soon!')}
                      variant="outline"
                      className="flex-1"
                      data-testid="download-button"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </motion.div>
              )}
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}