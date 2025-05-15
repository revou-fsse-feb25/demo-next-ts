import { Movie } from '../services/movieService';
import MovieCard from './MovieCard';

interface MovieListProps {
  movies: Movie[];
  title?: string;
  emptyMessage?: string;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export default function MovieList({ 
  movies, 
  title, 
  emptyMessage = "No movies found",
  columns = { sm: 2, md: 3, lg: 4 }
}: MovieListProps) {
  // Dynamic grid class based on provided columns
  const gridClass = `grid grid-cols-1 ${columns.sm ? `sm:grid-cols-${columns.sm}` : ''} ${columns.md ? `md:grid-cols-${columns.md}` : ''} ${columns.lg ? `lg:grid-cols-${columns.lg}` : ''} ${columns.xl ? `xl:grid-cols-${columns.xl}` : ''} gap-6`;

  return (
    <section className="py-6">
      {title && (
        <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      )}
      
      {movies.length > 0 ? (
        <div className={gridClass}>
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 mx-auto text-gray-600 mb-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" 
            />
          </svg>
          <p className="text-gray-400">{emptyMessage}</p>
        </div>
      )}
    </section>
  );
}