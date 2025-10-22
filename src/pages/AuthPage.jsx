// src/pages/AuthPage.jsx

import React, { useState } from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

export default function AuthPage() {
  const [view, setView] = useState('login'); // 'login' ou 'register'

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      {/* O seu código de IA tinha um componente de background legal, 
          poderíamos adicionar aqui depois. */}
      {view === 'login' ? (
        <Login onToggleView={setView} />
      ) : (
        <Register onToggleView={setView} />
      )}
    </div>
  );
}