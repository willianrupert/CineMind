import React, { useState } from 'react';
import { Movie } from '../types';
import MovieCard from './MovieCard';

interface ResultsCarouselProps {
  movies: Movie[];
  onStartOver: () => void;
}

const ResultsCarousel: React.FC<ResultsCarouselProps> = ({ movies, onStartOver }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < movies.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300">Aqui estão suas recomendações!</h2>
            <p className="text-text-secondary mt-2">Nós personalizamos estes filmes só para você.</p>
        </div>

        <div className="relative w-full mb-6 min-h-[500px] sm:min-h-[550px]">
            {movies.map((movie, index) => (
                 <div
                    key={movie.title + movie.year}
                    className="absolute inset-0 transition-all duration-500 ease-in-out"
                    style={{
                        transform: `translateX(${(index - currentIndex) * 100}%) scale(${index === currentIndex ? 1 : 0.8})`,
                        opacity: index === currentIndex ? 1 : 0,
                        zIndex: movies.length - Math.abs(index - currentIndex),
                    }}
                 >
                    <MovieCard movie={movie} />
                 </div>
            ))}
        </div>


        <div className="flex items-center justify-between w-full max-w-sm mb-8">
            <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="py-3 px-6 font-semibold text-text-primary bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
                Anterior
            </button>
            <span className="text-lg font-semibold text-text-secondary/80 tracking-widest">
                {currentIndex + 1} / {movies.length}
            </span>
            <button
                onClick={handleNext}
                disabled={currentIndex === movies.length - 1}
                className="py-3 px-6 font-semibold text-text-primary bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
                Próximo
            </button>
        </div>

        <button
            onClick={onStartOver}
            className="py-3 px-8 font-bold text-white bg-gradient-to-br from-brand-pink to-brand-accent rounded-xl shadow-lg hover:shadow-brand-pink/30 transform hover:scale-105 transition-all"
        >
            Fazer Nova Busca
        </button>
    </div>
  );
};

export default ResultsCarousel;