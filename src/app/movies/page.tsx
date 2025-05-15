import MovieList from '../components/MovieList';
import { getMovies } from '../services/movieService';
import Link from 'next/link';

export const metadata = {
  title: 'All Movies - MovieHub',
  description: 'Browse our collection of movies',
};

export default async function MoviesPage() {
  // Server-side data fetching
  const movies = await getMovies();
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">All Movies</h1>
        <Link href="/" className="text-amber-400 hover:text-amber-300">
          ← Back to Home
        </Link>
      </div>
      
      <MovieList movies={movies} />
      
      <section className="bg-gray-800 p-6 rounded-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">About Server-Side Rendering</h2>
          <p className="text-gray-300">
            This page uses server-side rendering (SSR) to fetch the movie data on the server for each request.
            SSR provides the benefit of having all content ready when the HTML is served to the client,
            which is great for SEO and initial page load performance.
          </p>
        </div>
      </section>
    </div>
  );
} 