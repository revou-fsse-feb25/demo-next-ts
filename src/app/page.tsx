'use client';

import { useState, useEffect } from 'react';
import { Cat, CatFormData } from './types';
import { fetchCats, createCat, updateCat, deleteCat } from './services/catService';
import CatCard from './components/CatCard';
import CatRow from './components/CatRow';
import CatForm from './components/CatForm';
import Modal from './components/Modal';

/**
 * Main page component for the Cat Rental App
 * Manages state and CRUD operations for cats
 */
export default function Home() {
  // State management
  const [cats, setCats] = useState<Cat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<Cat | undefined>(undefined);

  // Load cats on initial render
  useEffect(() => {
    loadCats();
  }, []);

  /**
   * Fetch cats from API
   */
  const loadCats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchCats();
      setCats(data);
    } catch (err) {
      setError('Failed to load cats. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Open modal to add a new cat
   */
  const handleAddCat = () => {
    setSelectedCat(undefined);
    setIsModalOpen(true);
  };

  /**
   * Open modal to edit an existing cat
   */
  const handleEditCat = (cat: Cat) => {
    setSelectedCat(cat);
    setIsModalOpen(true);
  };

  /**
   * Delete a cat after confirmation
   */
  const handleDeleteCat = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this cat?')) {
      try {
        await deleteCat(id);
        setCats(prevCats => prevCats.filter(cat => cat.id !== id));
      } catch (err) {
        setError('Failed to delete cat. Please try again.');
        console.error(err);
      }
    }
  };

  /**
   * Handle form submission for creating or updating cats
   */
  const handleFormSubmit = async (catData: CatFormData) => {
    try {
      if (selectedCat) {
        // Update existing cat
        const updatedCat = await updateCat(selectedCat.id, catData);
        setCats(prevCats => 
          prevCats.map(cat => cat.id === selectedCat.id ? updatedCat : cat)
        );
      } else {
        // Create new cat
        const newCat = await createCat(catData);
        setCats(prevCats => [...prevCats, newCat]);
      }
      setIsModalOpen(false);
    } catch (err) {
      setError(`Failed to ${selectedCat ? 'update' : 'create'} cat. Please try again.`);
      console.error(err);
    }
  };

  /**
   * Close the modal and reset selected cat
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCat(undefined);
  };

  return (
    <main className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header section with title and action buttons */}
        <header className="mb-8 bg-gray-900 p-5 rounded-lg shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold text-gradient">Cat Rental App</h1>
            <div className="flex flex-wrap gap-3 justify-center">
              {/* View toggle buttons */}
              <div className="flex items-center bg-gray-800 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('card')}
                  className={`py-2 px-4 flex items-center ${viewMode === 'card' ? 'bg-accent text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'} transition-colors`}
                  aria-label="Switch to card view"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Card View
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`py-2 px-4 flex items-center ${viewMode === 'list' ? 'bg-accent text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'} transition-colors`}
                  aria-label="Switch to list view"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  List View
                </button>
              </div>
              {/* Add new cat button */}
              <button
                onClick={handleAddCat}
                className="bg-gradient-to-r from-primary-600 to-accent hover:from-primary-700 hover:to-accent-hover text-white py-2 px-4 rounded-lg flex items-center gap-2 shadow-lg transform transition-all hover:scale-105"
                aria-label="Add new cat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add New Cat</span>
              </button>
            </div>
          </div>
        </header>

        {/* Error display */}
        {error && (
          <div className="bg-red-500 bg-opacity-80 text-white p-4 rounded-lg mb-6 shadow-lg flex items-center">
            <svg className="w-6 h-6 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Loading state */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-gray-300 border-t-primary-500 animate-spin"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : cats.length === 0 ? (
          <div className="text-center py-16 bg-gray-900 rounded-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19c0-.3.3-2.3.9-3.2 1.4-2 3.5-3.5 6.1-3.5s4.7 1.5 6.1 3.5c.6 1 .9 2.9.9 3.2" />
              <circle cx="12" cy="6.5" r="3.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
            <p className="mt-4 text-xl font-medium">No cats available for rent.</p>
            <p className="mt-2 text-gray-400">Start by adding your first cat for rent.</p>
            <button
              onClick={handleAddCat}
              className="mt-6 bg-primary-600 hover:bg-primary-700 text-white py-2 px-6 rounded-lg flex items-center mx-auto transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Your First Cat
            </button>
          </div>
        ) : viewMode === 'card' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cats.map(cat => (
              <CatCard 
                key={cat.id} 
                cat={cat} 
                onEdit={handleEditCat} 
                onDelete={handleDeleteCat} 
              />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-lg">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-800 text-left">
                  <th className="py-3 px-4 font-semibold">Name</th>
                  <th className="py-3 px-4 font-semibold">Breed</th>
                  <th className="py-3 px-4 font-semibold">Age</th>
                  <th className="py-3 px-4 font-semibold">Description</th>
                  <th className="py-3 px-4 font-semibold">Price</th>
                  <th className="py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cats.map(cat => (
                  <CatRow 
                    key={cat.id}
                    cat={cat}
                    onEdit={handleEditCat}
                    onDelete={handleDeleteCat}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal for adding/editing cats */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          title={selectedCat ? 'Edit Cat' : 'Add New Cat'}
        >
          <CatForm
            cat={selectedCat}
            onSubmit={handleFormSubmit}
            onCancel={handleCloseModal}
          />
        </Modal>
      </div>
    </main>
  );
}
