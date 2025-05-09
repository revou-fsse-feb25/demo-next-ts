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
  // Format price to display with 2 decimal places
  const formattedPrice = parseFloat(cat.price).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-accent/10 hover:shadow-xl h-full flex flex-col border border-gray-800">
      {/* Card header with availability indicator */}
      <div className="relative bg-gray-800 h-4">
        <span 
          className={`absolute top-0 right-0 px-2 py-1 text-xs font-medium rounded-bl-lg ${
            cat.availability ? 'bg-green-500' : 'bg-gray-500'
          }`}
        >
          {cat.availability ? 'Available' : 'Unavailable'}
        </span>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        {/* Card header with name and price */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white truncate">{cat.name}</h3>
          <span className="text-primary-400 font-bold px-2 py-1 bg-primary-900/30 rounded-lg">
            {formattedPrice}
          </span>
        </div>
        
        {/* Cat details */}
        <div className="space-y-3 mb-4 flex-grow">
          <div className="flex items-center">
            <span className="text-gray-400 mr-2 w-14">Breed:</span>
            <span className="text-gray-200">{cat.breed}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 mr-2 w-14">Age:</span>
            <span className="text-gray-200">{cat.age} {cat.age === 1 ? 'year' : 'years'}</span>
          </div>
          <div>
            <span className="text-gray-400 block mb-1">Description:</span>
            <p className="text-gray-300 line-clamp-3 text-sm bg-gray-800/50 p-2 rounded-md">{cat.description}</p>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-between mt-auto pt-3 border-t border-gray-800">
          <button
            onClick={() => onEdit(cat)}
            className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-2 px-4 rounded-md flex items-center gap-1 transition-all shadow-md hover:shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(cat.id)}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2 px-4 rounded-md flex items-center gap-1 transition-all shadow-md hover:shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
} 