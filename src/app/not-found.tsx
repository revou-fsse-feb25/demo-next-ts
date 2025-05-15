import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-5xl font-bold text-white mb-4">404</h1>
      <h2 className="text-2xl font-medium text-amber-400 mb-6">Page Not Found</h2>
      <p className="text-gray-300 mb-8 text-center max-w-md">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      <Link 
        href="/"
        className="bg-amber-500 hover:bg-amber-600 text-gray-900 px-6 py-3 rounded-full font-medium transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
} 