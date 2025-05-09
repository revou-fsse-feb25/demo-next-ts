import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

/**
 * Modal component for displaying content in an overlay
 */
export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // TODO: Implement modal functionality
  // - Handle ESC key to close modal
  // - Prevent scrolling when modal is open
  // - Add backdrop blur effect
  // - Implement focus trapping for accessibility
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-gray-800 rounded-lg">
        <div className="flex items-start justify-between p-5">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <button onClick={onClose} aria-label="Close modal">
            X
          </button>
        </div>
        <div className="p-6 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
} 