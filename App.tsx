
import React from 'react';
import Auth from './components/Auth';
import Home from './components/Home';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Loader from './components/Loader';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-brand-bg">
        <Loader />
      </div>
    );
  }

  return user ? <Home /> : <Auth />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
