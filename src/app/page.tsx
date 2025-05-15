'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Movie, getPopularMovies } from './services/movieService';
import MovieList from './components/MovieList';

export default function Home() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMovies() {
      try {
        setIsLoading(true);
        setError(null);
        const movies = await getPopularMovies();
        setPopularMovies(movies);
      } catch (error) {
        console.error('Failed to load movies:', error);
        setError('Failed to load movies. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    loadMovies();
  }, []);

  return (
    <div className="space-y-12">
      <section className="text-center py-24 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-lg">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Welcome to <span className="text-amber-500">MovieHub</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Discover amazing movies and get personalized recommendations
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link 
            href="/movies" 
            className="bg-amber-500 hover:bg-amber-600 text-gray-900 px-8 py-3 rounded-full font-semibold text-lg transition-colors shadow-lg hover:shadow-amber-500/20"
          >
            Browse All Movies
          </Link>
          <Link 
            href="/guides" 
            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors shadow-lg"
          >
            Watch Guides
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-8">Popular Movies</h2>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-gray-700 border-t-amber-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Loading popular movies...</p>
          </div>
        ) : error ? (
          <div className="bg-red-900/30 border border-red-800 text-red-200 p-4 rounded-lg text-center">
            <p>{error}</p>
            <button 
              onClick={() => {
                setIsLoading(true);
                getPopularMovies()
                  .then(movies => {
                    setPopularMovies(movies);
                    setError(null);
                  })
                  .catch(() => setError('Failed to load movies. Please try again later.'))
                  .finally(() => setIsLoading(false));
              }}
              className="mt-3 bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Try Again
            </button>
          </div>
        ) : (
          <MovieList movies={popularMovies} />
        )}
      </section>

      <section className="bg-gray-800 p-8 rounded-xl shadow-md">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">About Client-Side Rendering</h2>
          <p className="text-gray-300 leading-relaxed">
            This homepage uses client-side rendering (CSR) to fetch movie data after the page loads.
            CSR is useful for dynamic content that doesn't need SEO and for interactive features.
            Notice how the content loads after the initial page render, with a smooth loading animation
            to enhance the user experience.
          </p>
        </div>
      </section>
    </div>
  );
}
