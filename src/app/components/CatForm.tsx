import { useState, useEffect } from 'react';
import { Cat, CatFormData } from '../types';

interface CatFormProps {
  cat?: Cat;
  onSubmit: (catData: CatFormData) => void;
  onCancel: () => void;
}

/**
 * List of common cat breeds for the dropdown selection
 */
const catBreeds = [
  "Oriental",
  "Himalayan",
  "Ojos Azules",
  "Norwegian Forest Cat",
  "Turkish Angora",
  "Havana",
  "Highlander",
  "Selkirk Rex",
  "Abyssinian",
  "Ocicat",
  "Russian Blue",
  "Bengal",
  "Siamese",
  "Persian",
  "Maine Coon"
];

/**
 * Form component for adding/editing cat information
 */
export default function CatForm({ cat, onSubmit, onCancel }: CatFormProps) {
  // Initialize form data state
  const [formData, setFormData] = useState<CatFormData>({
    name: '',
    breed: '',
    age: 1,
    description: '',
    price: '0',
    imageUrl: '',
    availability: false,
  });

  // Update form data when editing an existing cat
  useEffect(() => {
    if (cat) {
      setFormData({
        name: cat.name,
        breed: cat.breed,
        age: cat.age,
        description: cat.description,
        price: cat.price,
        imageUrl: cat.imageUrl,
        availability: cat.availability,
      });
    }
  }, [cat]);

  /**
   * Handle form input changes
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : name === 'age' 
          ? parseInt(value, 10) || 0 
          : value,
    }));
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name field */}
        <div>
          <label htmlFor="name" className="block mb-1.5 font-medium text-gray-300">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-700 rounded-md p-2.5 text-white focus:ring-2 focus:ring-primary-500 focus:outline-none border border-gray-600"
            required
          />
        </div>
        
        {/* Breed field */}
        <div>
          <label htmlFor="breed" className="block mb-1.5 font-medium text-gray-300">Breed</label>
          <select
            id="breed"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            className="w-full bg-gray-700 rounded-md p-2.5 text-white focus:ring-2 focus:ring-primary-500 focus:outline-none border border-gray-600"
            required
          >
            <option value="">Select a breed</option>
            {catBreeds.map(breed => (
              <option key={breed} value={breed}>{breed}</option>
            ))}
          </select>
        </div>
        
        {/* Image URL field */}
        <div>
          <label htmlFor="imageUrl" className="block mb-1.5 font-medium text-gray-300">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full bg-gray-700 rounded-md p-2.5 text-white focus:ring-2 focus:ring-primary-500 focus:outline-none border border-gray-600"
            placeholder="Enter breed or placeholder image URL"
            required
          />
          <p className="text-gray-400 text-xs mt-1">For placeholder images, use the breed name</p>
        </div>
        
        {/* Age field */}
        <div>
          <label htmlFor="age" className="block mb-1.5 font-medium text-gray-300">Age (years)</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="0"
            className="w-full bg-gray-700 rounded-md p-2.5 text-white focus:ring-2 focus:ring-primary-500 focus:outline-none border border-gray-600"
            required
          />
        </div>
        
        {/* Price field */}
        <div>
          <label htmlFor="price" className="block mb-1.5 font-medium text-gray-300">Price per day</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">$</span>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full bg-gray-700 rounded-md p-2.5 pl-7 text-white focus:ring-2 focus:ring-primary-500 focus:outline-none border border-gray-600"
              required
            />
          </div>
        </div>
        
        {/* Availability checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="availability"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
            className="w-5 h-5 rounded mr-3 text-primary-500 focus:ring-primary-500 focus:outline-none bg-gray-700 border-gray-600"
          />
          <label htmlFor="availability" className="font-medium text-gray-300">Available for rent</label>
        </div>
      </div>
      
      {/* Description field */}
      <div>
        <label htmlFor="description" className="block mb-1.5 font-medium text-gray-300">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full bg-gray-700 rounded-md p-2.5 text-white focus:ring-2 focus:ring-primary-500 focus:outline-none border border-gray-600"
          required
        ></textarea>
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-5 rounded-md transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-5 rounded-md transition-colors"
        >
          {cat ? 'Update Cat' : 'Add Cat'}
        </button>
      </div>
    </form>
  );
} 