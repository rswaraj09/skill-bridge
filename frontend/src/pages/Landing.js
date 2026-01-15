import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { FileText, BarChart3, RefreshCw, Layout, Briefcase, Target, Zap, Shield } from 'lucide-react';

export default function Landing() {
  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'ATS Score Analysis',
      description: 'Get instant feedback on your resume ATS compatibility with AI-powered analysis'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Job Description Match',
      description: 'See how well your resume matches specific job requirements'
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: 'AI Resume Rewriter',
      description: 'Transform your resume with GPT-5.2 powered rewriting'
    },
    {
      icon: <Layout className="w-8 h-8" />,
      title: '8+ Professional Templates',
      description: 'Choose from diverse, ATS-friendly resume templates'
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Jobs & Internships',
      description: 'Browse and apply to curated opportunities'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Real-time Tracking',
      description: 'Track all your applications in one place'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-20 pb-32 px-4"
        data-testid="hero-section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight"
              >
                Land Your Dream Job with
                <span className="text-primary"> AI-Powered</span> Resume Optimization
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-lg text-muted-foreground max-w-xl"
              >
                Transform your resume into an ATS-friendly masterpiece. Get instant feedback, match with jobs, and access hundreds of opportunities.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/signup">
                  <Button size="lg" className="btn-primary h-12 px-8 text-base" data-testid="hero-cta-button">
                    Start Building Free
                  </Button>
                </Link>
                <Link to="/jobs">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base" data-testid="browse-jobs-button">
                    Browse Jobs
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="flex items-center space-x-6 pt-4"
              >
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Powered by GPT-5.2</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">100% Free</span>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1653669487404-09c3617c2b6c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkaXZlcnNlJTIwc3R1ZGVudHMlMjB3b3JraW5nJTIwbGFwdG9wfGVufDB8fHx8MTc2ODQxODM1OXww&ixlib=rb-4.1.0&q=85"
                alt="Students working"
                className="rounded-sm shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="py-20 px-4 bg-white" data-testid="features-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              Everything You Need to Get Hired
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From resume optimization to job applications, we've got you covered
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Card className="p-8 h-full hover:shadow-lg transition-all duration-300" data-testid={`feature-card-${index}`}>
                  <div className="w-14 h-14 bg-accent rounded-sm flex items-center justify-center mb-6 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4" data-testid="cta-section">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary text-white rounded-sm p-12 sm:p-16 shadow-2xl"
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-6">
              Ready to Build Your Future?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of job seekers optimizing their resumes with AI
            </p>
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="h-12 px-8 text-base font-semibold" data-testid="footer-cta-button">
                Get Started Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-stone-200" data-testid="footer">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 Skill Builder. Empowering careers with AI.</p>
        </div>
      </footer>
    </div>
  );
}