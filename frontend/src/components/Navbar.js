import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { FileText, BarChart3, RefreshCw, Layout, Briefcase, User, LogOut, Menu, Brain } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = ({ darkMode = true }) => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = isAuthenticated ? [
    { to: '/dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { to: '/analyze', label: 'Analyze', icon: <FileText className="w-4 h-4" /> },
    { to: '/match', label: 'Job Match', icon: <BarChart3 className="w-4 h-4" /> },
    { to: '/interview-prep', label: 'Interview Prep', icon: <Brain className="w-4 h-4" /> },
    { to: '/rewrite', label: 'Rewrite', icon: <RefreshCw className="w-4 h-4" /> },
    { to: '/templates', label: 'Templates', icon: <Layout className="w-4 h-4" /> },
    { to: '/jobs', label: 'Jobs', icon: <Briefcase className="w-4 h-4" /> },
  ] : [];

  const navClass = 'dark:bg-black/20 bg-white/70 border-b dark:border-white/10 border-gray-200 sticky top-0 z-50 backdrop-blur-md transition-all duration-300';

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-3 group" data-testid="logo-link">
            <div className="w-10 h-10 bg-cyan-900/30 border border-cyan-500/30 rounded-lg flex items-center justify-center group-hover:bg-cyan-900/50 transition-colors">
              <span className="text-cyan-600 dark:text-cyan-400 font-heading font-bold text-xl">SB</span>
            </div>
            <span className="font-heading font-bold text-xl text-gray-900 dark:text-white tracking-wide group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Skill Builder</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <div className="mr-2">
              <ThemeToggle />
            </div>
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`font-body flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-black/5 dark:hover:bg-white/5 ${location.pathname === link.to ? 'text-cyan-600 dark:text-cyan-400 bg-black/5 dark:bg-white/5' : ''
                    }`}
                  data-testid={`nav-${link.label.toLowerCase()}`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Button>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="font-body flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-black/5 dark:hover:bg-white/5" data-testid="profile-button">
                    <User className="w-4 h-4" />
                    <span>{user?.full_name?.split(' ')[0] || 'Profile'}</span>
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="font-body border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 bg-transparent"
                  data-testid="logout-button"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="font-heading text-gray-700 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-black/5 dark:hover:bg-white/5" data-testid="login-button">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="font-heading bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-full px-6" data-testid="signup-button">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-white dark:bg-[#0a0a2a] border-l border-gray-200 dark:border-white/10 text-gray-900 dark:text-white">
              <div className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-black/5 dark:hover:bg-white/5 font-body">
                      {link.icon}
                      <span>{link.label}</span>
                    </Button>
                  </Link>
                ))}
                {isAuthenticated && (
                  <>
                    <hr className="border-white/10" />
                    <Link to="/profile" onClick={() => setMobileOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-black/5 dark:hover:bg-white/5 font-body">
                        <User className="w-4 h-4 mr-2" /> Profile
                      </Button>
                    </Link>
                    <Button onClick={() => { handleLogout(); setMobileOpen(false); }} variant="outline" className="w-full justify-start border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent font-body">
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </Button>
                  </>
                )}
                {!isAuthenticated && (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)}>
                      <Button variant="ghost" className="w-full text-gray-700 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 font-heading">Login</Button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-full font-heading">Get Started</Button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-full font-heading">Get Started</Button>
                    </Link>
                  </>
                )}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-gray-400 font-body">Appearance</span>
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};