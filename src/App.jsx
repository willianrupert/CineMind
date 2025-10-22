// src/App.jsx

import React from "react";
import { useAuth } from "./hooks/useAuth"; // O nosso hook de auth
import AuthPage from "./pages/AuthPage"; // <-- NOSSA NOVA PÁGINA
import { auth } from "./config/firebase";
import { signOut } from "firebase/auth"; // <-- IMPORT CORRETO

// (Mais tarde, vamos importar o HomeScreen, Quiz, etc. aqui)

function App() {
  // Usamos o nosso hook! Ele nos dá o estado do usuário
  const { user, loading } = useAuth();

  // 1. Se estiver carregando (verificando o login), mostramos um "Loading"
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Carregando...
      </div>
    );
  }

  // 2. Se não estiver carregando E não houver usuário, mostramos a AuthPage
  if (!user) {
    return <AuthPage />; // <-- ATUALIZADO
  }

  // 3. Se não estiver carregando E HOUVER usuário...
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">
        {/* O usuário de Email/Senha pode não ter 'displayName' */}
        Bem-vindo, {user.displayName || user.email}!
      </h1>
      <p>O seu email é: {user.email}</p>

      <button
        onClick={() => signOut(auth)} // <-- BOTÃO CORRIGIDO
        className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Sair (Logout)
      </button>
    </div>
  );
}

export default App;
