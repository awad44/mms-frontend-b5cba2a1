import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '@/types';
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@mms.gov': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@mms.gov',
      name: 'Admin User',
      role_id: '1',
      password: 'admin123',
      status: 'active',
      role: 'admin',
    },
  },
  'finance@mms.gov': {
    password: 'finance123',
    user: {
      id: '2',
      email: 'finance@mms.gov',
      name: 'Finance Officer',
      role_id: '2',
      password: 'finance123',
      status: 'active',
      role: 'finance',
    },
  },
  'project@mms.gov': {
    password: 'project123',
    user: {
      id: '3',
      email: 'project@mms.gov',
      name: 'Project Manager',
      role_id: '3',
      password: 'project123',
      status: 'active',
      role: 'project_manager',
    },
  },
  'hr@mms.gov': {
    password: 'hr123',
    user: {
      id: '4',
      email: 'hr@mms.gov',
      name: 'HR Manager',
      role_id: '4',
      password: 'hr123',
      status: 'active',
      role: 'hr_manager',
    },
  },
  'clerk@mms.gov': {
    password: 'clerk123',
    user: {
      id: '5',
      email: 'clerk@mms.gov',
      name: 'Clerk Staff',
      role_id: '5',
      password: 'clerk123',
      status: 'active',
      role: 'clerk',
    },
  },
  'citizen@example.com': {
    password: 'citizen123',
    user: {
      id: '6',
      email: 'citizen@example.com',
      name: 'John Citizen',
      role_id: '6',
      password: 'citizen123',
      status: 'active',
      role: 'citizen',
    },
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('mms_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const mockUser = mockUsers[email];
    
    if (!mockUser || mockUser.password !== password) {
      toast({
        title: 'Login Failed',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
      throw new Error('Invalid credentials');
    }

    setUser(mockUser.user);
    localStorage.setItem('mms_user', JSON.stringify(mockUser.user));
    
    toast({
      title: 'Welcome Back!',
      description: `Logged in as ${mockUser.user.name}`,
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mms_user');
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
