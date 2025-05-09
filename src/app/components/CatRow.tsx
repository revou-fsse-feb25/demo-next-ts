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
      <td className="py-3 px-4">
        {cat.name}
      </td>
      <td className="py-3 px-4">{cat.breed}</td>
      <td className="py-3 px-4">{cat.age} {cat.age === 1 ? 'year' : 'years'}</td>
      <td className="py-3 px-4">{cat.description}</td>
      <td className="py-3 px-4">{formattedPrice}</td>
      <td className="py-3 px-4">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(cat)}
            className="text-white py-1.5 px-3 rounded-md"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(cat.id)}
            className="text-white py-1.5 px-3 rounded-md"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
} 