'use client';

import { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import { getMovies, Movie } from '../services/movieService';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [layoutType, setLayoutType] = useState<'grid' | 'horizontal'>('grid');

  const loadMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMovies();
      setMovies(data);
    } catch (err) {
      console.error('Failed to fetch movies:', err);
      setError('Failed to load movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  // Filter movies based on search query
  const filteredMovies = searchQuery
    ? movies.filter(movie => 
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (movie.genre && movie.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase())))
      )
    : movies;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <h1 className="text-2xl font-bold text-white">All Movies</h1>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <SearchBar />
          <div className="flex gap-2 items-center">
            <button 
              onClick={() => setLayoutType('grid')} 
              className={`p-1.5 rounded ${layoutType === 'grid' ? 'bg-amber-500 text-gray-900' : 'bg-gray-700 text-gray-300'}`}
              aria-label="Grid view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button 
              onClick={() => setLayoutType('horizontal')} 
              className={`p-1.5 rounded ${layoutType === 'horizontal' ? 'bg-amber-500 text-gray-900' : 'bg-gray-700 text-gray-300'}`}
              aria-label="List view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <Link href="/" className="text-amber-400 hover:text-amber-300 text-sm whitespace-nowrap">
            ← Back to Home
          </Link>
        </div>
      </div>
      
      {loading ? (
        <LoadingSpinner message="Loading movies..." />
      ) : error ? (
        <ErrorDisplay message={error} onRetry={loadMovies} />
      ) : (
        <>
          {searchQuery && (
            <div className="bg-gray-800/50 p-3 rounded-lg">
              {filteredMovies.length === 0 ? (
                <p className="text-gray-400 text-sm">No movies found matching "{searchQuery}"</p>
              ) : (
                <p className="text-gray-300 text-sm">
                  Found {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'} matching "{searchQuery}"
                </p>
              )}
            </div>
          )}
          
          <MovieList 
            movies={filteredMovies} 
            columns={{ sm: 2, md: 3, lg: 4, xl: 6 }}
            layout={layoutType}
          />
        </>
      )}
      
      <section className="bg-gray-800 p-5 rounded-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold text-white mb-3">About Client-Side Rendering with Search</h2>
          <p className="text-sm text-gray-300">
            This page uses client-side rendering to fetch movie data and provides real-time search functionality.
            The search parameters are reflected in the URL, allowing for bookmarking and sharing specific search results.
          </p>
        </div>
      </section>
    </div>
  );
} 