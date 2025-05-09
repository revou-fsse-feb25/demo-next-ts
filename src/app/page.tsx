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

  // TODO: Load cats on initial render
  useEffect(() => {
    loadCats();
  }, []);

  /**
   * Fetch cats from API
   */
  const loadCats = async () => {
    // TODO: Implement loading cats from API
    // - Set loading state
    // - Handle errors
    // - Update cats state
  };

  /**
   * Open modal to add a new cat
   */
  const handleAddCat = () => {
    // TODO: Implement adding a new cat
    // - Reset selected cat
    // - Open modal
  };

  /**
   * Open modal to edit an existing cat
   */
  const handleEditCat = (cat: Cat) => {
    // TODO: Implement editing a cat
    // - Set selected cat
    // - Open modal
  };

  /**
   * Delete a cat after confirmation
   */
  const handleDeleteCat = async (id: string) => {
    // TODO: Implement deleting a cat
    // - Show confirmation dialog
    // - Call API to delete
    // - Update state
    // - Handle errors
  };

  /**
   * Handle form submission for creating or updating cats
   */
  const handleFormSubmit = async (catData: CatFormData) => {
    // TODO: Implement form submission
    // - Determine if creating or updating
    // - Call appropriate API
    // - Update state
    // - Close modal
    // - Handle errors
  };

  /**
   * Close the modal and reset selected cat
   */
  const handleCloseModal = () => {
    // TODO: Implement closing modal
    // - Close modal
    // - Reset selected cat
  };

  return (
    <main className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header section with title and action buttons */}
        <header className="mb-8 bg-gray-900 p-5 rounded-lg">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold">Cat Rental App</h1>
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
          <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
            <span>{error}</span>
          </div>
        )}

        {/* Loading state */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div>Loading...</div>
          </div>
        ) : cats.length === 0 ? (
          <div className="text-center py-16 bg-gray-900 rounded-lg">
            <p className="mt-4 text-xl font-medium">No cats available for rent.</p>
            <button onClick={handleAddCat}>
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
          <div className="overflow-x-auto bg-gray-900 rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-800 text-left">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Breed</th>
                  <th className="py-3 px-4">Age</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Actions</th>
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
