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
import JobsBoard from './pages/JobsBoard';
import Applications from './pages/Applications';
import Profile from './pages/Profile';
import { useAuth } from './context/AuthContext';
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
        <div className="App">
          <div className="noise-texture" />
          <AppRoutes />
          <Toaster position="top-right" />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;