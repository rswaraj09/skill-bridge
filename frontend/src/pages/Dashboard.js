import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { resumeService } from '../services/api';

import { BarChart3, RefreshCw, Layout, Briefcase, FolderOpen, TrendingUp, FileText, Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function Dashboard() {
  const { user } = useAuth();
  const [resume, setResume] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const response = await resumeService.getMyResume();
      if (response.data.success) {
        setResume(response.data.data);
      }
    } catch (error) {
      console.log('No resume found or error fetching resume');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a PDF, DOCX, or TXT file');
      return;
    }

    setIsUploading(true);
    try {
      const response = await resumeService.upload(file);
      if (response.data.success) {
        setResume(response.data.data);
        toast.success('Resume uploaded successfully!');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error(error.response?.data?.message || 'Failed to upload resume');
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };



  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'ATS Analysis',
      desc: [
        'Get instant insights into your resume’s strengths and weaknesses.',
        'Our AI checks ATS compatibility, keywords, and skill alignment.',
        'Know exactly what recruiters notice—and what they don’t.',
        'Optimize your resume before you apply.',
      ],
      to: '/analyze',
      color: 'bg-blue-100 text-blue-600',
      image: '/gif1.gif',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Resume Analyser',
      desc: [
        'Check how well your resume matches a job description.',
        'Get a clear match score with improvement suggestions.',
        'Identify missing skills and keywords instantly.',
        'Apply with confidence, backed by data.',
      ],
      to: '/match',
      color: 'bg-green-100 text-green-600',
      image: '/gif10.gif',
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: 'Rewrite Resume',
      desc: [
        'Transform your resume into a powerful career story.',
        'AI-enhanced rewriting highlights impact, achievements, and skills.',
        'Clear, professional, and recruiter-ready content in seconds.',
        'Let your resume speak with confidence.',
      ],
      to: '/rewrite',
      color: 'bg-purple-100 text-purple-600',
      image: '/gif9.gif',
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: 'Resume Templates',
      desc: [
        'Choose from modern, ATS-friendly resume templates.',
        'Designed for clarity, readability, and first impressions.',
        'Customize layouts to match your career goals.',
        'Professional design made simple.',
      ],
      to: '/templates',
      color: 'bg-orange-100 text-orange-600',
      image: '/gif8.gif',
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: 'Browse Jobs',
      desc: [
        'Discover jobs that align with your skills and interests.',
        'Explore opportunities across roles, companies, and industries.',
        'Smart filters help you find the right fit faster.',
        'Your next career move starts here.',
      ],
      to: '/jobs',
      color: 'bg-indigo-100 text-indigo-600',
      image: '/gif7.gif',
    },
  ];

  return (
    <div className="min-h-screen bg-pink-100 dark:bg-transparent transition-colors duration-300">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12" data-testid="dashboard">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-3">
            Welcome back, {user?.full_name?.split(' ')[0] || 'there'}!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Let's continue building your career success
          </p>
        </motion.div>

        {/* Resume Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-12"
        >
          <Card className="bg-white dark:bg-white/5 p-8 border border-gray-200 dark:border-white/10 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center">
                  <FileText className="w-8 h-8" />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">My Resume</h2>
                  {resume ? (
                    <div>
                      <p className="text-gray-600 dark:text-gray-300 font-medium mb-1 text-lg">{resume.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">
                      Upload your resume once and use it across all features instantly.
                    </p>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileUpload}
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg transition-all transform hover:scale-105"
                >
                  {isUploading ? (
                    <span className="flex items-center">
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Uploading...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Upload className="w-5 h-5 mr-2" />
                      {resume ? 'Update Resume' : 'Upload Resume'}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>



        <div className="space-y-8">
          <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-8">Quick Actions</h2>
          <div className="grid gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Card className="overflow-hidden bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:shadow-xl transition-all duration-300">
                  <div className={`flex flex-col md:flex-row items-center gap-8 p-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Text Section */}
                    <div className="flex-1 text-center md:text-left space-y-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${feature.color} mx-auto md:mx-0`}>
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                        <ul className="text-lg text-gray-600 dark:text-gray-400 mb-6 space-y-1 list-disc list-inside">
                          {feature.desc.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                        <Link to={feature.to}>
                          <Button className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-2 rounded-lg transition-colors">
                            {index % 2 === 0 ? 'Go to ' + feature.title : 'View ' + feature.title}
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Image Section */}
                    <div className="flex-1 w-full max-w-md">
                      <div className="rounded-xl overflow-hidden shadow-lg border border-border/50 bg-muted/30">
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}