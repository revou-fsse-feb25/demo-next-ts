import { Cat } from '../types';

interface CatCardProps {
  cat: Cat;
  onEdit: (cat: Cat) => void;
  onDelete: (id: string) => void;
}

/**
 * Card component to display cat information in grid view
 */
export default function CatCard({ cat, onEdit, onDelete }: CatCardProps) {
  // TODO: Format price with proper currency formatting
  const formattedPrice = cat.price;

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden h-full flex flex-col">
      {/* TODO: Implement card styling with:
          - Availability indicator
          - Hover effects
          - Proper spacing and layout
          - Gradient buttons
      */}
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white">{cat.name}</h3>
          <span>{formattedPrice}</span>
        </div>
        
        <div className="space-y-3 mb-4 flex-grow">
          <div>
            <span>Breed:</span>
            <span>{cat.breed}</span>
          </div>
          <div>
            <span>Age:</span>
            <span>{cat.age} {cat.age === 1 ? 'year' : 'years'}</span>
          </div>
          <div>
            <span>Description:</span>
            <p>{cat.description}</p>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={() => onEdit(cat)}
            className="text-white py-2 px-4 rounded-md"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(cat.id)}
            className="text-white py-2 px-4 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
} 