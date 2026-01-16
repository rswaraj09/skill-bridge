import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { FileText, BarChart3, RefreshCw, Layout, Briefcase, Target, Zap, Shield } from 'lucide-react';

export default function Landing() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'ATS Score Analysis',
      description: 'Get instant feedback on your resume ATS compatibility with AI-powered analysis',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Job Description Match',
      description: 'See how well your resume matches specific job requirements',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=400&fit=crop'
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: 'AI Resume Rewriter',
      description: 'Transform your resume with GPT-5.2 powered rewriting',
      image: 'https://images.unsplash.com/photo-1516321725247-7a59dc4d731c?w=400&h=400&fit=crop'
    },
    {
      icon: <Layout className="w-8 h-8" />,
      title: '8+ Professional Templates',
      description: 'Choose from diverse, ATS-friendly resume templates',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop'
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Jobs & Internships',
      description: 'Browse and apply to curated opportunities',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Real-time Tracking',
      description: 'Track all your applications in one place',
      image: 'https://images.unsplash.com/photo-1516321725247-7a59dc4d731c?w=400&h=400&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-20 pb-32 px-4 bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden"
        data-testid="hero-section"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-200 rounded-full blur-3xl opacity-20 -mr-48 -mt-48"></div>
        <div className="max-w-7xl mx-auto relative z-10">
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
                  <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black h-12 px-8 text-base font-semibold" data-testid="hero-cta-button">
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
              className="relative flex justify-center items-center"
            >
              {/* Decorative background elements */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Blue wavy lines */}
                <div className="absolute bottom-10 left-1/4 w-32 h-32 flex flex-col justify-center gap-2">
                  <div className="w-full h-2 bg-blue-500 rounded-full"></div>
                  <div className="w-full h-2 bg-blue-500 rounded-full"></div>
                  <div className="w-full h-2 bg-blue-500 rounded-full"></div>
                </div>
                
                {/* Mint/Turquoise curved shape - top right */}
                <div className="absolute -right-16 -top-16 w-56 h-56 bg-cyan-300 rounded-full blur-2xl opacity-30"></div>
                
                {/* Mint/Turquoise curved shape - bottom right */}
                <div className="absolute -right-16 -bottom-16 w-56 h-56 bg-cyan-300 rounded-full blur-2xl opacity-30"></div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -left-12 top-24 z-20"
              >
                <div className="w-32 h-32 rounded-full border-4 border-yellow-400 bg-white shadow-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              <img
                src="https://assets.zety.com/sem-blobimages/zty/images/anika-kumar-resume.png?w=711"
                alt="Resume template"
                className="rounded-lg shadow-2xl w-full h-auto max-w-lg relative z-10"
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 hidden lg:block"
            >
              <motion.img
                key={activeFeature}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                src={features[activeFeature].image}
                alt={features[activeFeature].title}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </motion.div>

            {/* Right side - Feature list */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  onMouseEnter={() => setActiveFeature(index)}
                  className={`p-6 rounded-lg transition-all duration-300 cursor-pointer ${
                    activeFeature === index
                      ? 'bg-blue-100 shadow-md'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                  data-testid={`feature-card-${index}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-500 text-white font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      {activeFeature === index && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                          className="text-muted-foreground text-sm"
                        >
                          {feature.description}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 bg-gray-50 border-t border-stone-200" data-testid="footer">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Contact Information */}
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">Contact Us</h3>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p>
                  <span className="font-semibold">Address:</span><br />
                  123 Career Street, Tech City, TC 12345
                </p>
                <p>
                  <span className="font-semibold">Phone:</span><br />
                  <a href="tel:+1234567890" className="hover:text-primary transition-colors">+1 (234) 567-890</a>
                </p>
                <p>
                  <span className="font-semibold">Email:</span><br />
                  <a href="mailto:support@skillbridge.com" className="hover:text-primary transition-colors">support@skillbridge.com</a>
                </p>
              </div>
            </div>

            {/* Company Info */}
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">About Skill Bridge</h3>
              <p className="text-muted-foreground text-sm">
                We empower job seekers with AI-powered resume optimization and job matching tools to land their dream careers.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link to="/jobs" className="hover:text-primary transition-colors">Browse Jobs</Link></li>
                <li><Link to="/templates" className="hover:text-primary transition-colors">Templates</Link></li>
                <li><a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-stone-200 pt-8 text-center text-muted-foreground text-sm">
            <p>&copy; 2025 Skill Bridge. All rights reserved. | Empowering careers with AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}