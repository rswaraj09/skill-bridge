import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { FileText, BarChart3, RefreshCw, Layout, Briefcase, Target, Shield } from 'lucide-react';

// Import resume templates
import CorporateProfessional from './templates/CorporateProfessional';

import TechProfessional from './templates/TechProfessional';
import CreativeBold from './templates/CreativeBold';
import ProfessionalClassic from './templates/ProfessionalClassic';
import AcademicFocus from './templates/AcademicFocus';
import ChronologicalOrder from './templates/ChronologicalOrder';
import ExecutiveSummary from './templates/ExecutiveSummary';
import FinanceExecutive from './templates/FinanceExecutive';
import FunctionalFormat from './templates/FunctionalFormat';
import HealthcareProfessional from './templates/HealthcareProfessional';
import HybridStructure from './templates/HybridStructure';
import InfographicStyle from './templates/InfographicStyle';
import MarketingManager from './templates/MarketingManager';
import OnePageResume from './templates/OnePageResume';
import StartupOriented from './templates/StartupOriented';
import TwoColumnLayout from './templates/TwoColumnLayout';

export default function Landing() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeResume, setActiveResume] = useState(0);

  const resumes = [
    { name: 'Corporate Professional', component: CorporateProfessional, image: '/templates/Template1.jpeg' },

    { name: 'Tech Professional', component: TechProfessional, image: '/templates/Template3.jpeg' },
    { name: 'Creative Bold', component: CreativeBold, image: '/templates/Template4.jpeg' },
    { name: 'Professional Classic', component: ProfessionalClassic, image: '/templates/Template5.jpeg' },
    { name: 'Academic Focus', component: AcademicFocus, image: '/templates/Template6.jpeg' },
    { name: 'Chronological Order', component: ChronologicalOrder, image: '/templates/Template7.jpeg' },
    { name: 'Executive Summary', component: ExecutiveSummary, image: '/templates/Template8.jpeg' },
    { name: 'Finance Executive', component: FinanceExecutive, image: '/templates/Template9.jpeg' },
    { name: 'Functional Format', component: FunctionalFormat, image: '/templates/Template10.jpeg' },
    { name: 'Healthcare Professional', component: HealthcareProfessional, image: '/templates/Template11.jpeg' },
    { name: 'Hybrid Structure', component: HybridStructure, image: '/templates/Template12.jpeg' },
    { name: 'Infographic Style', component: InfographicStyle, image: '/templates/Template13.jpeg' },
    { name: 'Marketing Manager', component: MarketingManager, image: '/templates/Template14.jpeg' },
    { name: 'One Page Resume', component: OnePageResume, image: '/templates/Template15.jpeg' },
    { name: 'Startup Oriented', component: StartupOriented, image: '/templates/Template16.jpeg' },
    { name: 'Two Column Layout', component: TwoColumnLayout, image: '/templates/Template17.jpeg' }
  ];

  // Auto-rotate resumes every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveResume((prev) => (prev + 1) % resumes.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [resumes.length]);

  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'ATS Score Analysis',
      description: 'Get instant feedback on your resume ATS compatibility with AI-powered analysis',
      image: '/gif2.gif'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Job Description Match',
      description: 'See how well your resume matches specific job requirements',
      image: '/gif4.gif'
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: 'AI Resume Rewriter',
      description: 'Transform your resume with GPT-5.2 powered rewriting',
      image: '/gif5.gif'
    },
    {
      icon: <Layout className="w-8 h-8" />,
      title: '10+ Professional Templates',
      description: 'Choose from diverse, ATS-friendly resume templates',
      image: '/gif3.gif'
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Jobs & Internships',
      description: 'Browse and apply to curated opportunities',
      image: '/gif6.gif'
    }
  ];

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-transparent transition-colors duration-300">
      <Navbar />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-20 pb-32 px-4 relative overflow-hidden"
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
                className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white leading-tight"
              >
                The CV that gets
                <span className="text-cyan-400"> the job... done</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-lg text-gray-600 dark:text-gray-300 max-w-xl"
              >
                Build a new CV or improve your existing one with step-by-step AI guidance.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/signup">
                  <Button size="lg" className="bg-cyan-400 hover:bg-cyan-500 text-black h-12 px-8 text-base font-semibold rounded-full" data-testid="hero-cta-button">
                    Create your CV
                  </Button>
                </Link>
                <Link to="/templates">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full" data-testid="browse-templates-button">
                    Upgrade a CV
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="flex flex-col pt-4 space-y-1"
              >
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">AI-Guided Resume Builder & Opportunity Finder</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Build Your Resume. Discover Opportunities.</span>
              </motion.div>
            </div>

            {/* Resume Carousel Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative flex justify-center items-center h-96"
            >
              {/* Decorative background elements */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Blue dots pattern */}
                <div className="absolute inset-0 grid grid-cols-6 gap-4 opacity-20">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  ))}
                </div>
              </div>

              {/* Overlapping resume cards with rotation */}
              <div className="relative w-full h-full">
                {resumes.map((resume, index) => {
                  const offset = (index - activeResume + resumes.length) % resumes.length;
                  const isVisible = offset < 3;
                  const isPrimary = offset === 0;

                  return isVisible ? (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{
                        opacity: isPrimary ? 1 : 0.6,
                        scale: isPrimary ? 1 : 0.85 - offset * 0.08,
                        y: isPrimary ? 0 : offset * 12,
                        x: offset * 12,
                        zIndex: 10 - offset,
                      }}
                      exit={{ opacity: 0, scale: 0.8, y: 20 }}
                      transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 30 }}
                      className="absolute w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden"
                    >
                      <div className="w-full h-full bg-white">
                        <img
                          src={resume.image}
                          alt={resume.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </motion.div>
                  ) : null;
                })}
              </div>

              {/* Resume indicators */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2">
                {resumes.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveResume(index)}
                    className={`h-2 rounded-full transition-all ${index === activeResume ? 'bg-blue-500 w-8' : 'bg-gray-300 w-2'
                      }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="py-20 px-4" data-testid="features-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Get Hired
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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
                src={features[activeFeature]?.image || features[0].image}
                alt={features[activeFeature]?.title || features[0].title}
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
                  className={`p-6 rounded-lg transition-all duration-300 cursor-pointer ${activeFeature === index
                    ? 'bg-white/10 backdrop-blur-md shadow-lg border border-white/20 dark:border-white/20 border-gray-200'
                    : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-transparent'
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
                      <h3 className="text-lg font-heading font-semibold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      {activeFeature === index && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                          className="text-gray-600 dark:text-gray-300 text-sm"
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

      <footer className="py-12 px-4 border-t border-gray-200 dark:border-white/10" data-testid="footer">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Contact Information */}
            <div>
              <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Address:</span><br />
                  123 Career Street, Tech City, TC 12345
                </p>
                <p>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Phone:</span><br />
                  <a href="tel:+1234567890" className="hover:text-cyan-400 transition-colors">+1 (234) 567-890</a>
                </p>
                <p>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Email:</span><br />
                  <a href="mailto:support@skillbridge.com" className="hover:text-cyan-400 transition-colors">support@skillbridge.com</a>
                </p>
              </div>
            </div>

            {/* Company Info */}
            <div>
              <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">About Skill Bridge</h3>
              <p className="text-gray-400 text-sm">
                We empower job seekers with AI-powered resume optimization and job matching tools to land their dream careers.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
                <li><Link to="/jobs" className="hover:text-cyan-400 transition-colors">Browse Jobs</Link></li>
                <li><Link to="/templates" className="hover:text-cyan-400 transition-colors">Templates</Link></li>
                <li><a href="#privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 dark:border-white/10 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2025 Skill Bridge. All rights reserved. | Empowering careers with AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}