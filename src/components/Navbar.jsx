
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Vaccination Centers', path: '/vaccination-centers' },
  ];

  const authLinks = user ? [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Book Appointment', path: '/book-appointment' },
  ] : [
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/register' },
  ];

  // Combined links for both mobile and desktop navigation
  const allLinks = [...navLinks, ...authLinks];

  const handleLogout = () => {
    logout();
    // Close mobile menu if open
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-vaxtrack-500 text-2xl font-bold">VaxTrack</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-vaxtrack-500 ${
                isActive(link.path) ? 'text-vaxtrack-500' : 'text-foreground'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {user && authLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-vaxtrack-500 ${
                isActive(link.path) ? 'text-vaxtrack-500' : 'text-foreground'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {!user ? (
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild className="text-vaxtrack-500 border-vaxtrack-500 hover:bg-vaxtrack-50">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="bg-vaxtrack-500 hover:bg-vaxtrack-600">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              onClick={handleLogout} 
              className="text-red-500 hover:bg-red-50"
            >
              Logout
            </Button>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="h-9 w-9 p-0">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-5 w-5"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[350px]">
            <nav className="flex flex-col gap-4 mt-8">
              {allLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(link.path) 
                      ? 'bg-vaxtrack-50 text-vaxtrack-500' 
                      : 'hover:bg-vaxtrack-50 hover:text-vaxtrack-500'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {user && (
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-md justify-start"
                >
                  Logout
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
