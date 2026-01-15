import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { FileText, BarChart3, RefreshCw, Layout, Briefcase, FolderOpen, User, LogOut, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

export const Navbar = () => {
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
    { to: '/rewrite', label: 'Rewrite', icon: <RefreshCw className="w-4 h-4" /> },
    { to: '/templates', label: 'Templates', icon: <Layout className="w-4 h-4" /> },
    { to: '/jobs', label: 'Jobs', icon: <Briefcase className="w-4 h-4" /> },
    { to: '/applications', label: 'Applications', icon: <FolderOpen className="w-4 h-4" /> },
  ] : [];

  return (
    <nav className="glassmorphism border-b border-stone-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2" data-testid="logo-link">
            <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-white font-heading font-bold text-xl">SB</span>
            </div>
            <span className="font-heading font-bold text-xl text-foreground">Skill Builder</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                <Button
                  variant={location.pathname === link.to ? 'default' : 'ghost'}
                  size="sm"
                  className="flex items-center space-x-2"
                  data-testid={`nav-${link.label.toLowerCase()}`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Button>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2" data-testid="profile-button">
                    <User className="w-4 h-4" />
                    <span>{user?.full_name?.split(' ')[0] || 'Profile'}</span>
                  </Button>
                </Link>
                <Button onClick={handleLogout} variant="outline" size="sm" data-testid="logout-button">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" data-testid="login-button">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="btn-primary" data-testid="signup-button">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start flex items-center space-x-2">
                      {link.icon}
                      <span>{link.label}</span>
                    </Button>
                  </Link>
                ))}
                {isAuthenticated && (
                  <>
                    <hr className="border-stone-200" />
                    <Link to="/profile" onClick={() => setMobileOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <User className="w-4 h-4 mr-2" /> Profile
                      </Button>
                    </Link>
                    <Button onClick={() => { handleLogout(); setMobileOpen(false); }} variant="outline" className="w-full justify-start">
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </Button>
                  </>
                )}
                {!isAuthenticated && (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)}>
                      <Button variant="ghost" className="w-full">Login</Button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full btn-primary">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};