import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const { user } = useAuth();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth).catch(error => {
      console.error("Logout failed:", error);
    });
  };

  return (
    <header className="sticky top-4 z-50 px-4">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-300">
          CineMind
        </h1>
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-text-secondary hidden sm:block">
              {user.displayName || user.email}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="px-5 py-2 text-sm font-medium text-text-primary bg-white/10 rounded-full hover:bg-white/20 border border-glass-border transition-all duration-300 ease-apple"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;