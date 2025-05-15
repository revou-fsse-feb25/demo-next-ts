'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '../services/movieService';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  // Format the rating to always show with one decimal place
  const formattedRating = movie.rating.toFixed(1);
  
  // Determine the rating color based on the score
  const getRatingColor = (rating: number): string => {
    if (rating >= 7) return 'text-green-500'; // Good
    if (rating >= 5) return 'text-amber-500'; // Average
    return 'text-red-500'; // Poor
  };
  
  const getRatingLabel = (rating: number): string => {
    if (rating >= 7) return 'Good';
    if (rating >= 5) return 'Average';
    return 'Poor';
  };
  
  const ratingColor = getRatingColor(movie.rating);
  const ratingLabel = getRatingLabel(movie.rating);
  const year = new Date(movie.releaseDate).getFullYear();
  
  return (
    <article className="h-full">
      <Link 
        href={`/movies/${movie.id}`} 
        className="group h-full flex flex-col"
        aria-label={`${movie.title} (${year}), Rating: ${formattedRating}/10`}
      >
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:shadow-amber-900/20 group-hover:scale-[1.02] h-full flex flex-col">
          <div className="relative aspect-[2/3] w-full">
            {movie.poster ? (
              <Image
                src={movie.poster}
                alt={`Poster for ${movie.title}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
                priority={false}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-700 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
            )}
            
            <div 
              className="absolute top-2 right-2 bg-gray-900 bg-opacity-75 rounded-full p-2 shadow"
              aria-label={`Rating: ${formattedRating}/10 (${ratingLabel})`}
            >
              <div className={`text-sm font-bold ${ratingColor}`}>
                {formattedRating}
              </div>
            </div>
          </div>
          
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="text-lg font-semibold text-white truncate group-hover:text-amber-400 transition-colors">
              {movie.title}
            </h3>
            <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
              <span>{year}</span>
              <span>{movie.duration} min</span>
            </div>
            
            {movie.genre && movie.genre.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {movie.genre.slice(0, 2).map((genre, index) => (
                  <span key={index} className="px-2 py-1 text-xs bg-gray-700 rounded text-gray-300">
                    {genre}
                  </span>
                ))}
                {movie.genre.length > 2 && (
                  <span className="px-2 py-1 text-xs bg-gray-700 rounded text-gray-300">+{movie.genre.length - 2}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
} 