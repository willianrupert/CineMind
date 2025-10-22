import React, { useState } from 'react';
import { Movie } from '../types';
import MovieCard from './MovieCard';
import ThumbsDownIcon from './icons/ThumbsDownIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface ResultsViewerProps {
  movies: Movie[];
  onStartOver: () => void;
}

const ResultsViewer: React.FC<ResultsViewerProps> = ({ movies, onStartOver }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < movies.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleDismiss = () => {
    // In a real app, you might want to log this preference
    handleNext();
  };
  
  const isFinished = currentIndex >= movies.length;

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto animate-fadeIn">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300">
          {isFinished ? 'É isso por agora!' : 'Aqui estão suas recomendações!'}
        </h2>
        <p className="text-text-secondary mt-2">
          {isFinished ? 'Gostou? Comece uma nova busca para descobrir mais filmes.' : 'Nós personalizamos estes filmes só para você.'}
        </p>
      </div>

      <div className="relative w-full mb-10 min-h-[500px] sm:min-h-[550px]">
        {isFinished ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-glass-bg backdrop-blur-xl border border-glass-border rounded-3xl p-8 animate-fadeIn">
                <h3 className="text-2xl font-bold text-white">Nova Descoberta?</h3>
                <p className="text-text-secondary mt-2 mb-8 text-center">Clique abaixo para encontrar mais recomendações com base em um novo humor ou preferências.</p>
                 <button
                    onClick={onStartOver}
                    className="py-3.5 px-8 font-bold text-white bg-gradient-to-br from-brand-primary-start to-brand-primary-end rounded-xl shadow-lg hover:shadow-brand-primary-start/30 transform hover:scale-105 transition-all ease-apple"
                >
                    Fazer Nova Busca
                </button>
            </div>
        ) : (
            movies.map((movie, index) => {
                const isPast = index < currentIndex;
                const stackOffset = index - currentIndex;

                let transform = `scale(${1 - stackOffset * 0.05}) translateY(${stackOffset * -20}px)`;
                if (isPast) {
                    transform = `translateX(-100%) rotate(-10deg) scale(0.8)`;
                }

                return (
                    <div
                        key={movie.title + movie.year}
                        className="absolute inset-0 transition-[transform,opacity] duration-600 ease-apple"
                        style={{
                            willChange: 'transform, opacity',
                            transform: transform,
                            zIndex: movies.length - index,
                            opacity: isPast ? 0 : 1,
                            pointerEvents: index === currentIndex ? 'auto' : 'none',
                        }}
                    >
                        <MovieCard movie={movie} />
                    </div>
                )
            })
        )}
      </div>

      {!isFinished && (
        <div className="flex items-center justify-center w-full gap-4">
            <button
                onClick={handleDismiss}
                className="group flex items-center justify-center w-20 h-16 font-semibold text-text-primary bg-glass-bg backdrop-blur-lg border border-glass-border rounded-2xl hover:bg-white/10 hover:border-white/20 transform hover:scale-105 transition-all duration-300 ease-apple"
            >
                <ThumbsDownIcon />
            </button>
            
            <button
                onClick={handleNext}
                className="group flex items-center justify-center gap-3 py-3.5 px-8 font-bold text-white bg-gradient-to-br from-brand-primary-start to-brand-primary-end rounded-2xl shadow-lg shadow-brand-primary-start/20 hover:shadow-brand-primary-start/30 transform hover:scale-105 transition-all duration-300 ease-apple flex-grow h-16"
            >
                <span className="text-lg">
                  {currentIndex === movies.length - 1 ? 'Finalizar' : 'Próximo Filme'}
                </span>
                <ArrowRightIcon />
            </button>
        </div>
      )}
    </div>
  );
};

export default ResultsViewer;