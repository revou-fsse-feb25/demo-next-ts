import React from 'react';

interface ErrorDisplayProps {
  error: Error | string;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => {
  const errorMessage = typeof error === 'string' ? error : error.message;
  
  return (
    <div className="p-4 bg-red-900 text-red-100 rounded-md shadow-md">
      <h3 className="text-lg font-semibold mb-2">Error</h3>
      <p className="mb-4">{errorMessage}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay; 