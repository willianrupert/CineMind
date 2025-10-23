import React, { useState, useEffect } from 'react';
// Importa as funções da API atualizadas
import { getMovieRecommendations, getUserPreferences, saveUserPreferences } from '../services/api';
import { Movie, UserPreferences } from '../types'; // UserPreferences já estava aqui
import Header from './Header';
import Loader from './Loader';
import SurveyForm from './SurveyForm';
import ResultsViewer from './ResultsViewer';
import { useAuth } from '../hooks/useAuth';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false); // Loading para recomendações
  const [error, setError] = useState<string | null>(null);
  const [showSurvey, setShowSurvey] = useState(true);

  const { user } = useAuth();
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [prefsLoading, setPrefsLoading] = useState(true); // Loading para buscar preferências

  // useEffect para buscar preferências quando o usuário loga
  useEffect(() => {
    if (user) {
      setPrefsLoading(true);
      setError(null); // Limpa erros anteriores ao tentar buscar prefs
      getUserPreferences()
        .then(data => {
          // data será UserPreferences ou null
          setUserPreferences(data);
          // Se data for null, o SurveyForm vai iniciar do começo
          // Se data tiver preferências, o SurveyForm vai pular etapas
        })
        .catch(err => {
          console.error("Erro ao buscar preferências:", err.message);
          // Não define erro na UI, permite que o usuário preencha o form
          setUserPreferences(null); // Garante que o form comece do zero
        })
        .finally(() => {
          setPrefsLoading(false);
          setShowSurvey(true); // Mostra o form (ou a etapa de humor) após carregar
        });
    } else {
      // Se deslogar, reseta tudo
      setPrefsLoading(false);
      setUserPreferences(null);
      setShowSurvey(true);
      setMovies([]);
      setError(null);
    }
  }, [user]); // Depende do estado do usuário (logado/deslogado)

  const handleSurveyComplete = async (scores: { [key: string]: number }, genres: string[], mood: string) => {
    setLoading(true); // Ativa loading de recomendação
    setError(null);
    setMovies([]);
    // setShowSurvey(false); // Comentado - deixamos a transição para a tela de espera/resultados acontecer

    // Monta os scores para salvar e enviar (garante formato correto)
    const currentScores = {
      openness: scores.openness ?? 0,
      conscientiousness: scores.conscientiousness ?? 0,
      extroversion: scores.extroversion ?? 0, // Corrigido 'extraversion' para 'extroversion' se necessário no backend
      agreeableness: scores.agreeableness ?? 0,
      neuroticism: scores.neuroticism ?? 0,
    };

    // Monta o payload para a API de recomendação
    const recommendationPayload = {
      ...currentScores,
      favorite_genres: genres,
      mood: mood.toLowerCase(),
    };

    try {
      // 1. Busca recomendações
      const recommendations = await getMovieRecommendations(recommendationPayload);
      setMovies(recommendations);
      setShowSurvey(false); // Só esconde o survey *depois* de ter os resultados

      // 2. Salva as preferências (APENAS se não existiam antes)
      //    Faz isso em background, sem esperar a conclusão
      if (!userPreferences && user) {
        const newPrefsToSave: UserPreferences = {
          scores: currentScores,
          favorite_genres: genres,
        };
        // Atualiza o estado local imediatamente para a próxima vez
        setUserPreferences(newPrefsToSave);
        // Salva no backend (não bloqueia a UI)
        saveUserPreferences(newPrefsToSave).catch(err => {
          console.error("Falha ao salvar preferências em background:", err);
        });
      }
      // Se userPreferences já existia, significa que o usuário só escolheu um novo humor
      // ou editou os gêneros, não precisamos salvar os scores novamente.
      // Poderíamos adicionar lógica para salvar *apenas* gêneros se eles mudaram,
      // mas para simplificar, só salvamos na primeira vez.

    } catch (err: any) {
      console.error("Erro no fluxo handleSurveyComplete:", err);
      setError(err.message || "Ocorreu um erro desconhecido.");
      setShowSurvey(false); // Mostra a tela de erro mesmo se falhar
    } finally {
      setLoading(false); // Desativa loading de recomendação
    }
  };

  const handleStartOver = () => {
    setMovies([]);
    setError(null);
    setShowSurvey(true); // Volta a mostrar o SurveyForm
    // As preferências (userPreferences) continuam carregadas,
    // então o SurveyForm pulará para a etapa de humor automaticamente.
  };

  // --- Subcomponente para Tela de Resultados/Erro/Loading ---
  const ResultsScreen = () => (
    <>
      {/* Loading das Recomendações (diferente do loading das prefs) */}
      {loading && (
        <div className="flex flex-col justify-center items-center h-64 text-center">
          <Loader size="lg" />
          <p className="mt-6 text-text-secondary text-lg">Encontrando os filmes perfeitos para você...</p>
          <p className="text-text-secondary/60 text-sm mt-2">Isso pode levar alguns instantes.</p>
        </div>
      )}

      {/* Tela de Erro */}
      {!loading && error && (
        <div className="text-center bg-red-900/30 backdrop-blur-2xl border border-red-500/50 p-8 rounded-2xl max-w-2xl mx-auto animate-fadeIn">
          <p className="font-bold text-lg text-red-300">Ocorreu um erro:</p>
          <p className="mt-2 text-white/80">{error}</p>
          <button
            onClick={handleStartOver} // Permite tentar de novo (volta pro humor)
            className="mt-8 py-3 px-8 font-bold text-white bg-gradient-to-br from-brand-accent-start to-brand-accent-end rounded-xl shadow-lg hover:shadow-brand-accent-start/30 transform hover:scale-105 transition-all ease-apple"
          >
            Tentar Novamente
          </button>
        </div>
      )}

      {/* Tela de Resultados */}
      {!loading && !error && movies.length > 0 && (
        <ResultsViewer movies={movies} onStartOver={handleStartOver} />
      )}
    </>
  );

  // --- Render Principal ---
  return (
    <div className="min-h-screen bg-brand-bg text-text-primary">
      <Header />
      <main className="container mx-auto px-4 py-12 md:py-24 flex items-center justify-center min-h-[calc(100vh-100px)]">
        {/* Mostra loader SÓ enquanto busca as preferências iniciais */}
        {prefsLoading ? (
          <div className="flex flex-col justify-center items-center h-64 text-center">
            <Loader size="lg" />
            <p className="mt-6 text-text-secondary text-lg">Carregando seu perfil...</p>
          </div>
        ) : showSurvey ? (
          // Passa as preferências existentes (ou null) para o SurveyForm
          <SurveyForm
            onComplete={handleSurveyComplete}
            existingPreferences={userPreferences}
          />
        ) : (
          // Mostra a tela de loading/erro/resultados das *recomendações*
          <ResultsScreen />
        )}
      </main>
    </div>
  );
};

export default Home;