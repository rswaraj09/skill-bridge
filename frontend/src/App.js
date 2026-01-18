import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/sonner';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import JobMatch from './pages/JobMatch';
import ResumeRewriter from './pages/ResumeRewriter';
import Templates from './pages/Templates';
import TemplateEditor from './pages/TemplateEditor';
import JobsBoard from './pages/JobsBoard';
import Applications from './pages/Applications';
import Profile from './pages/Profile';
// Template imports
import ProfessionalClassic from './pages/templates/ProfessionalClassic';
import CreativeBold from './pages/templates/CreativeBold';
import TechProfessional from './pages/templates/TechProfessional';
import ExecutiveSummary from './pages/templates/ExecutiveSummary';
import AcademicFocus from './pages/templates/AcademicFocus';
import OnePageResume from './pages/templates/OnePageResume';
import CorporateProfessional from './pages/templates/CorporateProfessional';
import StartupOriented from './pages/templates/StartupOriented';
import HealthcareProfessional from './pages/templates/HealthcareProfessional';
import FinanceExecutive from './pages/templates/FinanceExecutive';
import MarketingManager from './pages/templates/MarketingManager';
import TwoColumnLayout from './pages/templates/TwoColumnLayout';
import ChronologicalOrder from './pages/templates/ChronologicalOrder';
import FunctionalFormat from './pages/templates/FunctionalFormat';
import HybridStructure from './pages/templates/HybridStructure';
import InfographicStyle from './pages/templates/InfographicStyle';
import ModernMinimalist from './pages/ModernMinimalist';
import CreativeDesigner from './pages/CreativeDesigner';
import { useAuth } from './context/AuthContext';
import { BackgroundLayout } from './components/BackgroundLayout';
import '@/App.css';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/analyze" element={<PrivateRoute><ResumeAnalyzer /></PrivateRoute>} />
      <Route path="/match" element={<PrivateRoute><JobMatch /></PrivateRoute>} />
      <Route path="/rewrite" element={<PrivateRoute><ResumeRewriter /></PrivateRoute>} />
      <Route path="/templates" element={<PrivateRoute><Templates /></PrivateRoute>} />
      <Route path="/template-editor" element={<PrivateRoute><TemplateEditor /></PrivateRoute>} />
      {/* Individual Template Routes */}
      <Route path="/professional-classic" element={<PrivateRoute><ProfessionalClassic /></PrivateRoute>} />
      <Route path="/creative-bold" element={<PrivateRoute><CreativeBold /></PrivateRoute>} />
      <Route path="/tech-professional" element={<PrivateRoute><TechProfessional /></PrivateRoute>} />
      <Route path="/executive-summary" element={<PrivateRoute><ExecutiveSummary /></PrivateRoute>} />
      <Route path="/academic-focus" element={<PrivateRoute><AcademicFocus /></PrivateRoute>} />
      <Route path="/one-page-resume" element={<PrivateRoute><OnePageResume /></PrivateRoute>} />
      <Route path="/corporate-professional" element={<PrivateRoute><CorporateProfessional /></PrivateRoute>} />
      <Route path="/startup-oriented" element={<PrivateRoute><StartupOriented /></PrivateRoute>} />
      <Route path="/healthcare-professional" element={<PrivateRoute><HealthcareProfessional /></PrivateRoute>} />
      <Route path="/finance-executive" element={<PrivateRoute><FinanceExecutive /></PrivateRoute>} />
      <Route path="/marketing-manager" element={<PrivateRoute><MarketingManager /></PrivateRoute>} />
      <Route path="/two-column-layout" element={<PrivateRoute><TwoColumnLayout /></PrivateRoute>} />
      <Route path="/chronological-order" element={<PrivateRoute><ChronologicalOrder /></PrivateRoute>} />
      <Route path="/functional-format" element={<PrivateRoute><FunctionalFormat /></PrivateRoute>} />
      <Route path="/hybrid-structure" element={<PrivateRoute><HybridStructure /></PrivateRoute>} />
      <Route path="/infographic-style" element={<PrivateRoute><InfographicStyle /></PrivateRoute>} />
      <Route path="/modern-minimalist" element={<PrivateRoute><ModernMinimalist /></PrivateRoute>} />
      <Route path="/creative-designer" element={<PrivateRoute><CreativeDesigner /></PrivateRoute>} />
      {/* Other Routes */}
      <Route path="/jobs" element={<PrivateRoute><JobsBoard /></PrivateRoute>} />
      <Route path="/applications" element={<PrivateRoute><Applications /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <BackgroundLayout>
          <div className="App">
            <AppRoutes />
            <Toaster position="top-right" />
          </div>
        </BackgroundLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;