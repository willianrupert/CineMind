// frontend/src/pages/ProfilePage.tsx

import { useEffect, useState } from "react";
import NavBar, { DEFAULT_NAVBAR_ICONS } from "../components/Navbar";
import api from "../services/api";
import type { UserProfile } from "../services/data";
import HistoryCard from "../components/HistoryCard";
import { useNavigate } from "react-router-dom";
import { StorageKeys } from "../utils/constants";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Imagem de avatar estática (já que o backend não tem upload de foto ainda)
  const AVATAR_URL = "https://api.dicebear.com/7.x/notionists/svg?seed=Felix";

  useEffect(() => {
    const accessToken = localStorage.getItem(StorageKeys.ACCESS_TOKEN);
    if (!accessToken) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        // Agora chamamos o endpoint correto que tem o histórico
        const response = await api.get<UserProfile>("/api/profile/");
        setProfile(response.data);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Inverte o histórico para mostrar o mais recente primeiro (se houver perfil)
  // O slice() cria uma cópia para não mutar o estado diretamente
  const historyItems = profile?.history.slice().reverse() || [];

  return (
    <div className="w-screen h-screen bg-linear-to-t from-cinemind-dark to-cinemind-light overflow-hidden flex flex-col">
      
      {/* --- Cabeçalho de Perfil --- */}
      <div className="p-8 pt-12 flex flex-col items-center gap-6 animate-fade-in">
        <h1 className="text-cinemind-white font-cinemind-serif text-3xl tracking-widest">
          PERFIL
        </h1>

        <div className="flex flex-col items-center gap-4">
          {/* Avatar com anéis decorativos */}
          <div className="relative">
            <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-cinemind-pink to-cinemind-yellow">
              <div className="w-full h-full rounded-full border-4 border-cinemind-dark overflow-hidden bg-cinemind-light">
                <img
                  src={AVATAR_URL}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Dados do Usuário */}
          <div className="text-center space-y-1">
            {isLoading ? (
              <div className="h-6 w-32 bg-cinemind-white/10 animate-pulse rounded mx-auto" />
            ) : (
              <>
                <h2 className="text-cinemind-white font-cinemind-serif text-2xl font-bold">
                  @{profile?.username}
                </h2>
                <p className="text-cinemind-white/50 font-cinemind-sans text-sm">
                  {profile?.email}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* --- Seção de Histórico (Carrossel) --- */}
      <div className="flex-grow flex flex-col px-0 py-4 animate-fade-in delay-100 overflow-hidden">
        <div className="px-6 mb-4 flex items-center gap-3">
          <div className="w-1 h-6 bg-cinemind-blue rounded-full" />
          <h3 className="text-cinemind-white font-cinemind-sans text-lg font-bold tracking-wide">
            Histórico de Recomendações
          </h3>
        </div>

        <div className="flex-grow relative">
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-cinemind-white/30 animate-pulse">
              Carregando histórico...
            </div>
          ) : historyItems.length > 0 ? (
            // Carrossel Horizontal
            <div className="flex overflow-x-auto gap-4 px-6 pb-8 snap-x snap-mandatory h-full items-center scrollbar-hide">
              {historyItems.map((item) => (
                <HistoryCard key={item.id} item={item} />
              ))}
              {/* Espaçador final para não cortar o último item */}
              <div className="min-w-[20px]" />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-cinemind-white/40 gap-2 border-t border-cinemind-white/5 bg-cinemind-dark/20 mx-6 rounded-xl">
              <span className="text-2xl">📭</span>
              <p>Nenhum filme recomendado ainda.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- Navbar --- */}
      <div className="p-6 pb-8 bg-gradient-to-t from-cinemind-dark to-transparent z-10">
        <NavBar
          className="flex justify-around p-2 bg-cinemind-dark/80 backdrop-blur-md rounded-full border border-cinemind-white/5 shadow-2xl"
          selectedIcon={2} // Seleciona o ícone de perfil
          icons={DEFAULT_NAVBAR_ICONS}
        />
      </div>
    </div>
  );
}