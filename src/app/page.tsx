'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Movie, getPopularMovies } from './services/movieService';
import MovieList from './components/MovieList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';

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
    <div className="space-y-8">
      <section className="text-center py-16 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Welcome to <span className="text-amber-500">MovieHub</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-6">
          Discover amazing movies and get personalized recommendations
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href="/movies" 
            className="bg-amber-500 hover:bg-amber-600 text-gray-900 px-6 py-2 rounded-full font-semibold text-sm transition-colors shadow-lg hover:shadow-amber-500/20"
          >
            Browse All Movies
          </Link>
          <Link 
            href="/guides" 
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-full font-semibold text-sm transition-colors shadow-lg"
          >
            Watch Guides
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Popular Movies</h2>
        
        {isLoading ? (
          <LoadingSpinner message="Loading popular movies..." />
        ) : error ? (
          <ErrorDisplay 
            message={error} 
            onRetry={() => {
              setIsLoading(true);
              getPopularMovies()
                .then(movies => {
                  setPopularMovies(movies);
                  setError(null);
                })
                .catch(() => setError('Failed to load movies. Please try again later.'))
                .finally(() => setIsLoading(false));
            }} 
          />
        ) : (
          <MovieList 
            movies={popularMovies}
            columns={{ sm: 2, md: 3, lg: 5, xl: 6 }}
            layout="grid"
          />
        )}
      </section>

      <section className="bg-gray-800 p-6 rounded-xl shadow-md">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-3 text-center">About Client-Side Rendering</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
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
