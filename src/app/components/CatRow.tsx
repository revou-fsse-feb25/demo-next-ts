import { Cat } from '../types';

interface CatRowProps {
  cat: Cat;
  onEdit: (cat: Cat) => void;
  onDelete: (id: string) => void;
}

/**
 * Row component to display cat information in table view
 */
export default function CatRow({ cat, onEdit, onDelete }: CatRowProps) {
  // TODO: Format price with proper currency formatting
  const formattedPrice = cat.price;

  return (
    <tr className="border-b border-gray-700">
      {/* TODO: Implement row styling with:
          - Availability indicator
          - Hover effects
          - Proper spacing and alignment
          - Gradient buttons
      */}
      <td className="py-3 px-4 font-medium">
        <div className="flex items-center">
          <span 
            className={`inline-block w-2 h-2 rounded-full mr-2 ${cat.availability ? 'bg-green-500' : 'bg-gray-500'}`}
            title={cat.availability ? 'Available' : 'Unavailable'}
          />
          {cat.name}
        </div>
      </td>
      <td className="py-3 px-4">{cat.breed}</td>
      <td className="py-3 px-4">{cat.age} {cat.age === 1 ? 'year' : 'years'}</td>
      <td className="py-3 px-4">
        <div className="truncate max-w-xs">{cat.description}</div>
      </td>
      <td className="py-3 px-4 font-medium text-primary-400">{formattedPrice}</td>
      <td className="py-3 px-4">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(cat)}
            className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-1.5 px-3 rounded-md flex items-center gap-1 transition-all shadow-sm hover:shadow-md"
            title="Edit cat"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            onClick={() => onDelete(cat.id)}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-1.5 px-3 rounded-md flex items-center gap-1 transition-all shadow-sm hover:shadow-md"
            title="Delete cat"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
} 