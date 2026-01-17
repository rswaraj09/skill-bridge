import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import TemplatePreview from '../components/TemplatePreview';
import { templateService } from '../services/api';
import { toast } from 'sonner';
import { Eye } from 'lucide-react';

export default function Templates() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await templateService.getAll();
        setTemplates(response.data);
      } catch (error) {
        toast.error('Failed to load templates');
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const handleUseTemplate = (template) => {
    // Map template IDs to their routes
    const templateRoutes = {
      1: '/professional-classic',
      2: '/modern-minimalist',
      3: '/creative-bold',
      4: '/executive-summary',
      5: '/tech-professional',
      6: '/academic-focus',
      7: '/chronological-order',
      8: '/functional-format',
      9: '/hybrid-structure',
      10: '/creative-designer',
      11: '/corporate-professional',
      12: '/startup-oriented',
      13: '/one-page-resume',
      14: '/two-column-layout',
      15: '/infographic-style',
      16: '/healthcare-professional',
      17: '/finance-executive',
      18: '/marketing-manager'
    };

    const route = templateRoutes[template.id];
    if (route) {
      navigate(route);
    } else {
      navigate(`/template-editor?id=${template.id}&name=${encodeURIComponent(template.name)}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12" data-testid="templates-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-3">
              Resume Templates
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose from 18 professional, ATS-friendly templates
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all h-full flex flex-col" data-testid={`template-card-${index}`}>
                    <div className="aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden group">
                      <TemplatePreview templateId={template.id} templateName={template.name} />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                        <Button
                          onClick={() => handleUseTemplate(template)}
                          variant="secondary"
                          className="opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          data-testid={`template-button-${index}`}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Use Template
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-heading font-semibold text-foreground mb-1">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 flex-1">{template.description}</p>
                      <Button
                        onClick={() => handleUseTemplate(template)}
                        className="w-full"
                        size="sm"
                        data-testid={`use-template-button-${index}`}
                      >
                        Use Template
                      </Button>
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