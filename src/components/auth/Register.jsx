// src/components/auth/Register.jsx

import React, { useState } from "react";
// Usamos a lógica de auth do *novo* projeto (baseado em Firebase)
import { registerWithEmail } from "../../config/firebase";

export default function Register({ onToggleView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("As senhas não conferem.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await registerWithEmail(email, password);
      // O App.jsx vai detectar o login e mudar de tela
      // Opcionalmente, podemos forçar a visualização de login aqui:
      // onToggleView("login");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("Este email já está em uso.");
      } else if (err.code === "auth/weak-password") {
        setError("A senha deve ter pelo menos 6 caracteres.");
      } else {
        setError("Ocorreu um erro ao criar a conta.");
      }
    }
    setLoading(false);
  };

  // Aplicamos o *estilo* do projeto *antigo* (TSX)
  return (
    <div className="bg-[#D93F6E] p-6 sm:p-8 rounded-2xl shadow-2xl animate-fade-in w-full max-w-sm">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-white">CADASTRO</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[#381127] text-white placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#F2B705]"
          required
        />
        <input
          type="password"
          placeholder="Senha..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[#381127] text-white placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#F2B705]"
          required
        />
        <input
          type="password"
          placeholder="Confirmar senha..."
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[#381127] text-white placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#F2B705]"
          required
        />

        {error && <p className="text-sm text-yellow-300 text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#F2B705] text-[#381127] font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors !mt-8 disabled:opacity-50 disabled:cursor-wait"
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
      <p className="text-center text-sm text-white mt-6">
        Já tem uma conta?{" "}
        <button
          onClick={() => onToggleView("login")}
          className="font-bold text-[#2EC4D9] hover:underline disabled:text-gray-400"
          disabled={loading}
        >
          Login
        </button>
      </p>
    </div>
  );
}
