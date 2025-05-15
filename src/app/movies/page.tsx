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
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-white">All Movies</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <SearchBar />
          <Link href="/" className="text-amber-400 hover:text-amber-300 whitespace-nowrap">
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
            <div className="bg-gray-800/50 p-4 rounded-lg">
              {filteredMovies.length === 0 ? (
                <p className="text-gray-400">No movies found matching "{searchQuery}"</p>
              ) : (
                <p className="text-gray-300">
                  Found {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'} matching "{searchQuery}"
                </p>
              )}
            </div>
          )}
          
          <MovieList movies={filteredMovies} />
        </>
      )}
      
      <section className="bg-gray-800 p-6 rounded-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">About Client-Side Rendering with Search</h2>
          <p className="text-gray-300">
            This page uses client-side rendering to fetch movie data and provides real-time search functionality.
            The search parameters are reflected in the URL, allowing for bookmarking and sharing specific search results.
          </p>
        </div>
      </section>
    </div>
  );
} 