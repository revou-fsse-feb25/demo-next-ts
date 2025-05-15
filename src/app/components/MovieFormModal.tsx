'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Movie } from '../services/movieService';

interface MovieFormModalProps {
  title: string;
  onSubmit: () => Promise<void>;
  submitText: string;
  formData: Omit<Movie, 'id'>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleGenreChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  closeModals: () => void;
  loading: boolean;
}

export default function MovieFormModal({
  title,
  onSubmit,
  submitText,
  formData,
  handleInputChange,
  handleGenreChange,
  closeModals,
  loading
}: MovieFormModalProps) {
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  
  // Required fields check
  const requiredFields = ['title', 'director', 'overview', 'poster', 'backdrop', 'releaseDate'];
  const isFormValid = requiredFields.every(field => Boolean(formData[field as keyof typeof formData]));
  
  const handleBlur = (fieldName: string) => {
    setTouchedFields(prev => ({
      ...prev,
      [fieldName]: true
    }));
  };
  
  const getFieldError = (fieldName: string) => {
    // Only show errors for touched fields
    if (!touchedFields[fieldName]) return null;
    
    switch (fieldName) {
      case 'title':
        return !formData.title ? 'Title is required' : null;
      case 'director':
        return !formData.director ? 'Director is required' : null;
      case 'overview':
        return !formData.overview ? 'Overview is required' : null;
      case 'poster':
        return !formData.poster ? 'Poster URL is required' : null;
      case 'backdrop':
        return !formData.backdrop ? 'Backdrop URL is required' : null;
      case 'releaseDate':
        return !formData.releaseDate ? 'Release date is required' : null;
      default:
        return null;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = requiredFields.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    setTouchedFields(allTouched);
    
    // If form is valid, submit
    if (isFormValid) {
      onSubmit();
    }
  };
  
  // For the image preview error handling
  const [imageError, setImageError] = useState(false);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" role="dialog" aria-labelledby="modal-title">
      <div className="absolute inset-0 bg-black/70" onClick={closeModals}></div>
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h2 id="modal-title" className="text-2xl font-bold text-white">{title}</h2>
          <button 
            onClick={closeModals}
            className="text-gray-400 hover:text-white"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-gray-300 mb-2">Title<span className="text-red-500">*</span></label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                onBlur={() => handleBlur('title')}
                className={`w-full bg-gray-700 text-white border rounded px-3 py-2 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 ${
                  getFieldError('title') ? 'border-red-500' : 'border-gray-600'
                }`}
                required
                aria-required="true"
                aria-invalid={Boolean(getFieldError('title'))}
              />
              {getFieldError('title') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError('title')}</p>
              )}
            </div>
            <div>
              <label htmlFor="director" className="block text-gray-300 mb-2">Director<span className="text-red-500">*</span></label>
              <input
                id="director"
                type="text"
                name="director"
                value={formData.director}
                onChange={handleInputChange}
                onBlur={() => handleBlur('director')}
                className={`w-full bg-gray-700 text-white border rounded px-3 py-2 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 ${
                  getFieldError('director') ? 'border-red-500' : 'border-gray-600'
                }`}
                required
                aria-required="true"
                aria-invalid={Boolean(getFieldError('director'))}
              />
              {getFieldError('director') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError('director')}</p>
              )}
            </div>
            <div>
              <label htmlFor="rating" className="block text-gray-300 mb-2">Rating (0-10)<span className="text-red-500">*</span></label>
              <input
                id="rating"
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                min="0"
                max="10"
                step="0.1"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                required
                aria-required="true"
              />
              <p className="text-gray-500 text-xs mt-1">Rating will be normalized to a 0-10 scale</p>
            </div>
            <div>
              <label htmlFor="duration" className="block text-gray-300 mb-2">Duration (minutes)<span className="text-red-500">*</span></label>
              <input
                id="duration"
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                min="1"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="releaseDate" className="block text-gray-300 mb-2">Release Date<span className="text-red-500">*</span></label>
              <input
                id="releaseDate"
                type="date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleInputChange}
                onBlur={() => handleBlur('releaseDate')}
                className={`w-full bg-gray-700 text-white border rounded px-3 py-2 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 ${
                  getFieldError('releaseDate') ? 'border-red-500' : 'border-gray-600'
                }`}
                required
                aria-required="true"
                aria-invalid={Boolean(getFieldError('releaseDate'))}
              />
              {getFieldError('releaseDate') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError('releaseDate')}</p>
              )}
            </div>
            <div>
              <label htmlFor="genre" className="block text-gray-300 mb-2">Genres (comma separated)</label>
              <input
                id="genre"
                type="text"
                name="genre"
                value={formData.genre.join(', ')}
                onChange={handleGenreChange}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                placeholder="Action, Adventure, Drama"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="overview" className="block text-gray-300 mb-2">Overview<span className="text-red-500">*</span></label>
              <textarea
                id="overview"
                name="overview"
                value={formData.overview}
                onChange={handleInputChange}
                onBlur={() => handleBlur('overview')}
                rows={3}
                className={`w-full bg-gray-700 text-white border rounded px-3 py-2 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 ${
                  getFieldError('overview') ? 'border-red-500' : 'border-gray-600'
                }`}
                required
                aria-required="true"
                aria-invalid={Boolean(getFieldError('overview'))}
              />
              {getFieldError('overview') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError('overview')}</p>
              )}
            </div>
            <div>
              <label htmlFor="poster" className="block text-gray-300 mb-2">Poster URL<span className="text-red-500">*</span></label>
              <input
                id="poster"
                type="url"
                name="poster"
                value={formData.poster}
                onChange={handleInputChange}
                onBlur={() => handleBlur('poster')}
                className={`w-full bg-gray-700 text-white border rounded px-3 py-2 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 ${
                  getFieldError('poster') ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="https://example.com/poster.jpg"
                required
                aria-required="true"
                aria-invalid={Boolean(getFieldError('poster'))}
              />
              {getFieldError('poster') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError('poster')}</p>
              )}
            </div>
            <div>
              <label htmlFor="backdrop" className="block text-gray-300 mb-2">Backdrop URL<span className="text-red-500">*</span></label>
              <input
                id="backdrop"
                type="url"
                name="backdrop"
                value={formData.backdrop}
                onChange={handleInputChange}
                onBlur={() => handleBlur('backdrop')}
                className={`w-full bg-gray-700 text-white border rounded px-3 py-2 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 ${
                  getFieldError('backdrop') ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="https://example.com/backdrop.jpg"
                required
                aria-required="true"
                aria-invalid={Boolean(getFieldError('backdrop'))}
              />
              {getFieldError('backdrop') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError('backdrop')}</p>
              )}
            </div>
          </div>
          
          {formData.poster && (
            <div className="mt-6 flex flex-col md:flex-row items-center md:items-start gap-6 bg-gray-700/30 p-4 rounded">
              <div className="text-sm text-gray-400">Poster Preview:</div>
              <div className="relative w-36 h-52 rounded overflow-hidden">
                {!imageError ? (
                  <Image
                    src={formData.poster}
                    alt="Poster preview"
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-700 text-amber-500">
                    <span className="text-xs text-center p-2">Image failed to load</span>
                  </div>
                )}
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
              type="submit"
              className={`px-4 py-2 text-gray-900 font-medium rounded transition ${
                isFormValid 
                  ? 'bg-amber-500 hover:bg-amber-600' 
                  : 'bg-amber-500/50 cursor-not-allowed'
              }`}
              disabled={loading || !isFormValid}
            >
              {loading ? 'Processing...' : submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 