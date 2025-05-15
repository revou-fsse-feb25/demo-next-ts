'use client';

import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getMovies, createMovie, updateMovie, deleteMovie, Movie } from '../services/movieService';

export default function AdminPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Omit<Movie, 'id'>>({
    title: '',
    overview: '',
    director: '',
    poster: '',
    backdrop: '',
    releaseDate: new Date().toISOString().split('T')[0],
    rating: 70,
    genre: [],
    duration: 120,
    isExternalImage: true
  });

  useEffect(() => {
    loadMovies();
  }, []);

  // Reset form data when selected movie changes
  useEffect(() => {
    if (selectedMovie) {
      setFormData({
        title: selectedMovie.title,
        overview: selectedMovie.overview,
        director: selectedMovie.director,
        poster: selectedMovie.poster,
        backdrop: selectedMovie.backdrop,
        releaseDate: selectedMovie.releaseDate.split('T')[0],
        rating: selectedMovie.rating,
        genre: selectedMovie.genre || [],
        duration: selectedMovie.duration,
        isExternalImage: selectedMovie.isExternalImage || true
      });
    } else if (!showAddModal) {
      resetForm();
    }
  }, [selectedMovie, showAddModal]);

  const resetForm = () => {
    setFormData({
      title: '',
      overview: '',
      director: '',
      poster: '',
      backdrop: '',
      releaseDate: new Date().toISOString().split('T')[0],
      rating: 70,
      genre: [],
      duration: 120,
      isExternalImage: true
    });
  };

  async function loadMovies() {
    try {
      setLoading(true);
      setError(null);
      const data = await getMovies();
      setMovies(data);
    } catch (err) {
      setError('Failed to load movies. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: name === 'rating' || name === 'duration' ? parseInt(value) : value,
    });
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const genreValue = e.target.value.split(',').map(genre => genre.trim()).filter(genre => genre);
    
    setFormData({
      ...formData,
      genre: genreValue,
    });
  };

  const openEditModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowEditModal(true);
  };

  const openDeleteModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowDeleteModal(true);
  };

  const openAddModal = () => {
    setSelectedMovie(null);
    resetForm();
    setShowAddModal(true);
  };

  const closeModals = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setShowAddModal(false);
    setSelectedMovie(null);
  };

  const handleSaveMovie = async () => {
    if (!selectedMovie) return;
    
    try {
      setLoading(true);
      await updateMovie(selectedMovie.id, formData);
      closeModals();
      await loadMovies();
    } catch (err) {
      console.error('Failed to update movie:', err);
      setError('Failed to update movie. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMovie = async () => {
    try {
      setLoading(true);
      await createMovie(formData);
      closeModals();
      await loadMovies();
    } catch (err) {
      console.error('Failed to create movie:', err);
      setError('Failed to create movie. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMovie = async () => {
    if (!selectedMovie) return;
    
    try {
      setLoading(true);
      await deleteMovie(selectedMovie.id);
      closeModals();
      await loadMovies();
    } catch (err) {
      console.error('Failed to delete movie:', err);
      setError('Failed to delete movie. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredMovies = searchTerm 
    ? movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (movie.genre && movie.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase())))
      )
    : movies;

  // Modal component for forms
  const MovieFormModal = ({ title, onSubmit, submitText }: { title: string, onSubmit: () => Promise<void>, submitText: string }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/70" onClick={closeModals}></div>
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button 
            onClick={closeModals}
            className="text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 mb-2">Title*</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Director*</label>
            <input
              type="text"
              name="director"
              value={formData.director}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Rating (0-100)*</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              min="0"
              max="100"
              className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Duration (minutes)*</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Release Date*</label>
            <input
              type="date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Genres (comma separated)</label>
            <input
              type="text"
              name="genre"
              value={formData.genre.join(', ')}
              onChange={handleGenreChange}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              placeholder="Action, Adventure, Drama"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-2">Overview*</label>
            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleInputChange}
              rows={3}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Poster URL*</label>
            <input
              type="text"
              name="poster"
              value={formData.poster}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              placeholder="https://example.com/poster.jpg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Backdrop URL*</label>
            <input
              type="text"
              name="backdrop"
              value={formData.backdrop}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              placeholder="https://example.com/backdrop.jpg"
              required
            />
          </div>
        </div>
        
        {formData.poster && (
          <div className="mt-6 flex flex-col md:flex-row items-center md:items-start gap-6 bg-gray-700/30 p-4 rounded">
            <div className="text-sm text-gray-400">Poster Preview:</div>
            <div className="relative w-36 h-52 rounded overflow-hidden">
              <Image
                src={formData.poster}
                alt="Poster preview"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
        
        <div className="flex justify-end mt-8 gap-3">
          <button
            type="button"
            onClick={closeModals}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="px-4 py-2 bg-amber-500 text-gray-900 font-medium rounded hover:bg-amber-600 transition"
            disabled={loading}
          >
            {loading ? 'Processing...' : submitText}
          </button>
        </div>
      </div>
    </div>
  );

  // Delete confirmation modal
  const DeleteModal = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/70" onClick={closeModals}></div>
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Confirm Delete</h2>
          <button 
            onClick={closeModals}
            className="text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-300">
            Are you sure you want to delete the movie <span className="font-bold text-white">{selectedMovie?.title}</span>?
            This action cannot be undone.
          </p>
        </div>
        
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={closeModals}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDeleteMovie}
            className="px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Movie'}
          </button>
        </div>
      </div>
    </div>
  );

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-gray-700 border-t-amber-500 rounded-full animate-spin"></div>
    </div>
  );

  // Error notification component
  const ErrorNotification = () => (
    <div className="fixed bottom-4 right-4 bg-red-900/90 border border-red-700 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="mt-2 text-xs text-red-300 underline"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );

  if (loading && movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-16 h-16 border-4 border-gray-700 border-t-amber-500 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400">Loading movies...</p>
      </div>
    );
  }

  if (error && movies.length === 0) {
    return (
      <div className="bg-red-900/30 border border-red-800 text-red-200 p-8 rounded-lg text-center max-w-2xl mx-auto my-10">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p className="mb-4">{error}</p>
        <button 
          onClick={() => loadMovies()}
          className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <Fragment>
      {loading && <LoadingSpinner />}
      {error && <ErrorNotification />}
      
      {showEditModal && <MovieFormModal 
        title="Edit Movie" 
        onSubmit={handleSaveMovie} 
        submitText="Save Changes" 
      />}
      
      {showAddModal && <MovieFormModal 
        title="Add New Movie" 
        onSubmit={handleCreateMovie} 
        submitText="Create Movie" 
      />}
      
      {showDeleteModal && <DeleteModal />}
      
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Movie Admin</h1>
          <div className="flex gap-4">
            <button
              onClick={openAddModal}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add New Movie
            </button>
            <Link 
              href="/" 
              className="text-amber-500 hover:text-amber-400 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold text-white">Movie Database</h2>
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-md border border-gray-600 w-full focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>
          
          {filteredMovies.length === 0 ? (
            <div className="bg-gray-700/30 p-8 rounded text-center text-gray-400">
              {searchTerm ? (
                <div>
                  <p className="text-lg mb-2">No movies found matching "{searchTerm}"</p>
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="text-amber-500 hover:text-amber-400"
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                <p className="text-lg">No movies in the database. Add your first movie!</p>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-300">ID</th>
                    <th className="px-4 py-3 text-left text-gray-300">Movie</th>
                    <th className="px-4 py-3 text-left text-gray-300">Rating</th>
                    <th className="px-4 py-3 text-left text-gray-300">Director</th>
                    <th className="px-4 py-3 text-right text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMovies.map(movie => (
                    <tr key={movie.id} className="border-t border-gray-700 hover:bg-gray-700/50 transition-colors">
                      <td className="px-4 py-3 text-gray-300">{movie.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="h-10 w-7 relative mr-3 flex-shrink-0 rounded overflow-hidden bg-gray-700">
                            {movie.poster && (
                              <Image
                                src={movie.poster}
                                alt={movie.title}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-white">{movie.title}</div>
                            <div className="text-xs text-gray-400 mt-1">
                              {movie.genre && movie.genre.length > 0 
                                ? movie.genre.join(', ') 
                                : 'No genres'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="inline-flex items-center bg-gray-700 px-2 py-1 rounded">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-white font-medium">
                            {(movie.rating / 10).toFixed(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-300">{movie.director}</td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(movie)}
                          className="bg-amber-500 hover:bg-amber-600 text-gray-900 px-3 py-1 rounded text-sm inline-flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteModal(movie)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm inline-flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">API Information</h2>
          <div className="bg-gray-900 p-4 rounded-lg">
            <p className="text-gray-300 font-mono break-all">API Endpoint: https://64ca45bd700d50e3c7049e2f.mockapi.io/film</p>
          </div>
          <p className="text-gray-400 mt-4">
            This admin interface allows you to manage the movie database. Changes made here will be reflected
            throughout the application. All data is stored in the remote API.
          </p>
        </div>
      </div>
    </Fragment>
  );
} 