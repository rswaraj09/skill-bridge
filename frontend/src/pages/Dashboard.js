import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { resumeService, jobService, applicationService } from '../services/api';
import { FileText, BarChart3, RefreshCw, Layout, Briefcase, FolderOpen, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ resumes: 0, applications: 0, jobs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [resumes, applications, jobs] = await Promise.all([
          resumeService.getAll(),
          applicationService.getAll(),
          jobService.getAll()
        ]);
        setStats({
          resumes: resumes.data.length,
          applications: applications.data.length,
          jobs: jobs.data.length
        });
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const features = [
    { icon: <BarChart3 className="w-6 h-6" />, title: 'Analyze Resume', desc: 'Get ATS score', to: '/analyze', color: 'bg-blue-100 text-blue-600' },
    { icon: <TrendingUp className="w-6 h-6" />, title: 'Job Match', desc: 'Match with jobs', to: '/match', color: 'bg-green-100 text-green-600' },
    { icon: <RefreshCw className="w-6 h-6" />, title: 'Rewrite Resume', desc: 'AI-powered', to: '/rewrite', color: 'bg-purple-100 text-purple-600' },
    { icon: <Layout className="w-6 h-6" />, title: 'Templates', desc: '8+ designs', to: '/templates', color: 'bg-orange-100 text-orange-600' },
    { icon: <Briefcase className="w-6 h-6" />, title: 'Browse Jobs', desc: 'Find opportunities', to: '/jobs', color: 'bg-indigo-100 text-indigo-600' },
    { icon: <FolderOpen className="w-6 h-6" />, title: 'Applications', desc: 'Track status', to: '/applications', color: 'bg-pink-100 text-pink-600' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12" data-testid="dashboard">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-heading font-bold text-foreground mb-3">
            Welcome back, {user?.full_name?.split(' ')[0] || 'there'}!
          </h1>
          <p className="text-lg text-muted-foreground">
            Let's continue building your career success
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <Card className="p-6" data-testid="stat-resumes">
              <div className="flex items-center justify-between mb-2">
                <FileText className="w-5 h-5 text-primary" />
                <span className="text-3xl font-heading font-bold text-foreground">{stats.resumes}</span>
              </div>
              <p className="text-sm text-muted-foreground">Saved Resumes</p>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Card className="p-6" data-testid="stat-applications">
              <div className="flex items-center justify-between mb-2">
                <FolderOpen className="w-5 h-5 text-primary" />
                <span className="text-3xl font-heading font-bold text-foreground">{stats.applications}</span>
              </div>
              <p className="text-sm text-muted-foreground">Applications</p>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Card className="p-6" data-testid="stat-jobs">
              <div className="flex items-center justify-between mb-2">
                <Briefcase className="w-5 h-5 text-primary" />
                <span className="text-3xl font-heading font-bold text-foreground">{stats.jobs}</span>
              </div>
              <p className="text-sm text-muted-foreground">Available Jobs</p>
            </Card>
          </motion.div>
        </div>

        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
              >
                <Link to={feature.to}>
                  <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group" data-testid={`action-card-${index}`}>
                    <div className={`w-12 h-12 rounded-sm flex items-center justify-center mb-4 ${feature.color} group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}