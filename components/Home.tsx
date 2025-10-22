import React, { useState } from 'react';
import { getMovieRecommendations } from '../services/api';
import { Movie } from '../types';
import Header from './Header';
import Loader from './Loader';
import SurveyForm from './SurveyForm';
import ResultsViewer from './ResultsViewer';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSurvey, setShowSurvey] = useState(true);

  const handleSurveyComplete = async (scores: { [key: string]: number }, genres: string[], mood: string) => {
    setLoading(true);
    setError(null);
    setMovies([]);
    setShowSurvey(false);

    const payload = {
      openness: scores.openness || 0,
      conscientiousness: scores.conscientiousness || 0,
      extroversion: scores.extraversion || 0,
      agreeableness: scores.agreeableness || 0,
      neuroticism: scores.neuroticism || 0,
      favorite_genres: genres,
      mood: mood.toLowerCase(),
    };

    try {
      const recommendations = await getMovieRecommendations(payload);
      setMovies(recommendations);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleStartOver = () => {
    setMovies([]);
    setError(null);
    setShowSurvey(true);
  };

  const ResultsScreen = () => (
    <>
      {loading && (
        <div className="flex flex-col justify-center items-center h-64 text-center">
          <Loader size="lg" />
          <p className="mt-6 text-text-secondary text-lg">Encontrando os filmes perfeitos para você...</p>
          <p className="text-text-secondary/60 text-sm mt-2">Isso pode levar alguns instantes.</p>
        </div>
      )}
      
      {error && (
        <div className="text-center bg-red-900/30 backdrop-blur-2xl border border-red-500/50 p-8 rounded-2xl max-w-2xl mx-auto">
          <p className="font-bold text-lg text-red-300">Ocorreu um erro:</p>
          <p className="mt-2 text-white/80">{error}</p>
          <button
            onClick={handleStartOver}
            className="mt-8 py-3 px-8 font-bold text-white bg-gradient-to-br from-brand-accent-start to-brand-accent-end rounded-xl shadow-lg hover:shadow-brand-accent-start/30 transform hover:scale-105 transition-all ease-apple"
          >
            Tentar Novamente
          </button>
        </div>
      )}
      
      {!loading && !error && movies.length > 0 && (
        <ResultsViewer movies={movies} onStartOver={handleStartOver} />
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-brand-bg text-text-primary">
      <Header />
      <main className="container mx-auto px-4 py-12 md:py-24 flex items-center justify-center">
        {showSurvey ? (
          <SurveyForm onComplete={handleSurveyComplete} />
        ) : (
          <ResultsScreen />
        )}
      </main>
    </div>
  );
};

export default Home;