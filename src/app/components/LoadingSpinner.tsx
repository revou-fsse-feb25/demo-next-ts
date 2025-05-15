'use client';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export default function LoadingSpinner({ 
  fullScreen = false, 
  size = 'md', 
  message 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const spinner = (
    <div className={`${sizeClasses[size]} border-4 border-gray-700 border-t-amber-500 rounded-full animate-spin`}></div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/60 flex flex-col items-center justify-center z-50">
        {spinner}
        {message && <p className="text-gray-300 mt-4">{message}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-10">
      {spinner}
      {message && <p className="text-gray-400 mt-4">{message}</p>}
    </div>
  );
} 