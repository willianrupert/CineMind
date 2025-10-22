import React from 'react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="relative bg-black border border-glass-border rounded-3xl overflow-hidden shadow-2xl group w-full max-w-sm mx-auto aspect-[2/3] transform transition-all duration-500 ease-apple hover:scale-[1.03] hover:shadow-brand-primary-start/20">
      <img
        src={movie.poster_url}
        alt={`Poster for ${movie.title}`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-apple group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent"></div>
      
      <div className="relative z-10 p-6 flex flex-col justify-end h-full">
        <div className="mb-auto"></div>
        <div style={{ textShadow: '0 2px 20px rgba(0, 0, 0, 0.9)' }}>
           <h3 className="text-3xl font-bold text-white leading-tight">{movie.title}</h3>
           <p className="text-md text-gray-300 font-medium mb-4">{movie.year}</p>
           <p className="text-text-secondary text-sm line-clamp-4 leading-relaxed max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 ease-apple">
            {movie.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;