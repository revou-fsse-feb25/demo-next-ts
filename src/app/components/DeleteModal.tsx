'use client';

interface DeleteModalProps {
  title: string;
  closeModals: () => void;
  handleDelete: () => Promise<void>;
  loading: boolean;
}

export default function DeleteModal({
  title,
  closeModals,
  handleDelete,
  loading
}: DeleteModalProps) {
  return (
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
            Are you sure you want to delete the movie <span className="font-bold text-white">{title}</span>?
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
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Movie'}
          </button>
        </div>
      </div>
    </div>
  );
} 