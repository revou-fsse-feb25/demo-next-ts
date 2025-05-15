'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update the URL when the search term changes
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/movies?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/movies');
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    router.push('/movies');
    // Focus back on the input after clearing
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // When back/forward navigation happens, update the search term
  useEffect(() => {
    setSearchTerm(initialQuery);
  }, [initialQuery]);

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md" role="search">
      <div className="relative">
        <label htmlFor="movie-search" className="sr-only">
          Search movies
        </label>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          id="movie-search"
          ref={inputRef}
          type="search"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-800 text-white px-3 pl-10 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full"
          aria-label="Search for movies by title, director, or genre"
          autoComplete="off"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-white p-1"
              aria-label="Clear search"
              title="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </form>
  );
} 