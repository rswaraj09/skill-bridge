import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { templateService } from '../services/api';
import { toast } from 'sonner';
import { Eye, Download } from 'lucide-react';

export default function Templates() {
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
    toast.success(`Using ${template.name} template`);
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
              Choose from 8+ professional, ATS-friendly templates
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
                  <Card className="overflow-hidden hover:shadow-lg transition-all" data-testid={`template-card-${index}`}>
                    <div className="aspect-[3/4] bg-stone-100 relative overflow-hidden group">
                      <img
                        src={template.preview_url}
                        alt={template.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          data-testid={`preview-button-${index}`}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading font-semibold text-foreground mb-1">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                      <Button
                        onClick={() => handleUseTemplate(template)}
                        className="w-full"
                        size="sm"
                        data-testid={`use-template-button-${index}`}
                      >
                        <Download className="w-4 h-4 mr-2" />
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