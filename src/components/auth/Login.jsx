// src/components/auth/Login.jsx

import React, { useState } from "react";
// Usamos a lógica de auth do *novo* projeto (baseado em Firebase)
import { signInWithEmail, signInWithGoogle } from "../../config/firebase";

// O prop onToggleView vem do AuthPage.jsx
export default function Login({ onToggleView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Para mostrar/ocultar senha

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      // O App.jsx vai detectar o login e mudar de tela
    } catch (err) {
      console.error(err);
      if (
        err.code === "auth/invalid-credential" || // Código novo do Firebase
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        setError("Email ou senha inválidos.");
      } else {
        setError("Ocorreu um erro ao fazer login.");
      }
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao logar com o Google.");
    }
  };

  // Aplicamos o *estilo* do projeto *antigo* (TSX)
  return (
    <div className="bg-[#D93F6E] p-6 sm:p-8 rounded-2xl shadow-2xl animate-fade-in w-full max-w-sm">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-white">LOGIN</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[#381127] text-white placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#F2B705]"
          required
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#381127] text-white placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#F2B705]"
            required
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-white">
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 .847 0 1.67.126 2.463.362m4.343 1.943A9.969 9.969 0 0121.542 12c-1.274 4.057-5.064 7-9.542 7a10.05 10.05 0 01-1.375-.082M9 12a3 3 0 116 0 3 3 0 01-6 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" /></svg>
            )}
          </button>
        </div>

        {error && <p className="text-sm text-yellow-300 text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#F2B705] text-[#381127] font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors !mt-8 disabled:opacity-50 disabled:cursor-wait"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
      
      {/* Botão do Google */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#381127]" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-white bg-[#D93F6E]">
            Ou continue com
          </span>
        </div>
      </div>
      <div>
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 px-4 font-semibold text-white bg-[#381127] rounded-lg shadow-sm hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#D93F6E] focus:ring-white flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
          Login com Google
        </button>
      </div>

      <p className="text-center text-sm text-white mt-6">
        Não tem uma conta?{" "}
        <button
          onClick={() => onToggleView("register")}
          className="font-bold text-[#2EC4D9] hover:underline disabled:text-gray-400"
          disabled={loading}
        >
          Cadastre-se
        </button>
      </p>
    </div>
  );
}
