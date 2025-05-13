import React from 'react';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center p-4 space-x-3 bg-gray-800 rounded-md shadow-md">
      <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse"></div>
      <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse delay-75"></div>
      <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse delay-150"></div>
      <span className="text-gray-200">{message}</span>
    </div>
  );
};

export default LoadingState; 