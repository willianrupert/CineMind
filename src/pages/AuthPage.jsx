// src/pages/AuthPage.jsx

import React, { useState } from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Background from '../components/common/Background'; // <-- Importamos o Background
import Header from '../components/common/Header'; // <-- Importamos o Header

export default function AuthPage() {
  const [view, setView] = useState('login'); // 'login' ou 'register'

  return (
    // Aplicamos o tema de fundo e garantimos que o conteúdo fique sobre ele
    <div className="relative min-h-screen w-full bg-[#100812] text-white font-sans overflow-x-hidden">
      <Background /> 
      <Header />

      {/* Main container para centralizar o conteúdo de login/registro */}
      <main className="relative z-10 flex items-center justify-center min-h-screen pt-24 pb-12">
        {view === 'login' ? (
          <Login onToggleView={setView} />
        ) : (
          <Register onToggleView={setView} />
        )}
      </main>
    </div>
  );
}
