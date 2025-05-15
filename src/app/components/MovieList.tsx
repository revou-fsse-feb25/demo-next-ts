import { Movie } from '../services/movieService';
import MovieCard from './MovieCard';

interface MovieListProps {
  movies: Movie[];
  title?: string;
}

export default function MovieList({ movies, title }: MovieListProps) {
  return (
    <section className="py-6">
      {title && (
        <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
} 