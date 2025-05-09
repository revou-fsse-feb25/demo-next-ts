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
  // TODO: Implement form state management
  // - Initialize form data
  // - Handle form input changes
  // - Implement validation
  const [formData, setFormData] = useState<CatFormData>({
    name: '',
    breed: '',
    age: 1,
    description: '',
    price: '0',
    imageUrl: '',
    availability: false,
  });

  // TODO: Update form data when editing an existing cat
  useEffect(() => {
    // Implementation needed
  }, [cat]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    // TODO: Implement form input changes handler
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission with validation
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* TODO: Implement form fields with proper styling:
          - Name field
          - Breed dropdown
          - Age field
          - Price field with currency formatting
          - Description textarea
          - Availability checkbox
          - Image URL field
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name field */}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Breed field */}
        <div>
          <label htmlFor="breed">Breed</label>
          <select
            id="breed"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            required
          >
            <option value="">Select a breed</option>
            {catBreeds.map(breed => (
              <option key={breed} value={breed}>{breed}</option>
            ))}
          </select>
        </div>
        
        {/* Other fields would go here */}
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
        >
          {cat ? 'Update Cat' : 'Add Cat'}
        </button>
      </div>
    </form>
  );
} 