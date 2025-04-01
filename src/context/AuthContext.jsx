
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for user in local storage
    const storedUser = localStorage.getItem('vaxtrack_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function (replace with actual API call in a real application)
  const login = async (email, password) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (email === 'test@example.com' && password === 'password') {
        const mockUser = {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          age: 30,
          gender: 'Male',
          phone: '1234567890',
          vaccinations: []
        };
        
        setUser(mockUser);
        localStorage.setItem('vaxtrack_user', JSON.stringify(mockUser));
        
        toast({
          title: "Login successful",
          description: "Welcome back to VaxTrack!",
          variant: "default",
        });
        
        return { success: true, user: mockUser };
      } else if (email === 'admin@example.com' && password === 'admin') {
        const mockAdmin = {
          id: 'admin1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin'
        };
        
        setUser(mockAdmin);
        localStorage.setItem('vaxtrack_user', JSON.stringify(mockAdmin));
        
        toast({
          title: "Admin login successful",
          description: "Welcome back, Admin!",
          variant: "default",
        });
        
        return { success: true, user: mockAdmin };
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  // Mock register function
  const register = async (userData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a mock user with the provided data
      const mockUser = {
        id: Date.now().toString(),
        ...userData,
        vaccinations: []
      };
      
      setUser(mockUser);
      localStorage.setItem('vaxtrack_user', JSON.stringify(mockUser));
      
      toast({
        title: "Registration successful",
        description: "Welcome to VaxTrack!",
        variant: "default",
      });
      
      return { success: true, user: mockUser };
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vaxtrack_user');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
      variant: "default",
    });
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
