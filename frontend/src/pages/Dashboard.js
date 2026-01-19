import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';

import { BarChart3, RefreshCw, Layout, Briefcase, FolderOpen, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export default function Dashboard() {
  const { user } = useAuth();



  const features = [
    { icon: <BarChart3 className="w-6 h-6" />, title: 'Analyze Resume', desc: 'Get ATS score', to: '/analyze', color: 'bg-blue-100 text-blue-600', image: '/gif1.gif' },
    { icon: <TrendingUp className="w-6 h-6" />, title: 'Job Match', desc: 'Match with jobs', to: '/match', color: 'bg-green-100 text-green-600', image: '/gif10.gif' },
    { icon: <RefreshCw className="w-6 h-6" />, title: 'Rewrite Resume', desc: 'AI-powered', to: '/rewrite', color: 'bg-purple-100 text-purple-600', image: '/gif9.gif' },
    { icon: <Layout className="w-6 h-6" />, title: 'Templates', desc: '10+ designs', to: '/templates', color: 'bg-orange-100 text-orange-600', image: '/gif8.gif' },
    { icon: <Briefcase className="w-6 h-6" />, title: 'Browse Jobs', desc: 'Find opportunities', to: '/jobs', color: 'bg-indigo-100 text-indigo-600', image: '/gif7.gif' },
  ];

  return (
    <div className="min-h-screen">
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
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{feature.desc}</p>
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