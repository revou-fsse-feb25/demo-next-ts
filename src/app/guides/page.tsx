import Link from 'next/link';
import { getMovieGuides } from '../services/movieService';

// Use ISR with a revalidation time of 24 hours
export const revalidate = 60 * 60 * 24;

export const metadata = {
  title: 'Movie Watching Guides - MovieHub',
  description: 'Tips and guides to enhance your movie watching experience',
};

export default async function GuidesPage() {
  // Server-side data fetch with ISR caching
  const guides = await getMovieGuides();
  const lastUpdated = new Date().toLocaleString();
  
  return (
    <div className="space-y-10">
      <section className="py-10 px-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Movie Watch Guides</h1>
          <p className="text-xl text-gray-300">Expert tips to enhance your movie watching experience</p>
          <div className="mt-6">
            <Link href="/" className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-2 justify-center group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </section>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <div key={guide.id} className="bg-gray-800 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all hover:translate-y-[-5px] border border-gray-700">
            <div className="text-amber-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">{guide.title}</h3>
            <p className="text-gray-300 leading-relaxed">{guide.content}</p>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end">
        <p className="text-sm text-gray-500 italic">Last updated: {lastUpdated}</p>
      </div>
      
      <section className="bg-gray-800 p-8 rounded-xl shadow-md">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">About Incremental Static Regeneration</h2>
          <p className="text-gray-300 leading-relaxed">
            This page uses Incremental Static Regeneration (ISR), which provides the performance benefits 
            of static generation while allowing the content to be updated periodically. 
            Movie guides don't change often, making them perfect for ISR with a 24-hour revalidation window.
            This means the page is rendered once and then cached, updating at most once per day.
          </p>
        </div>
      </section>
    </div>
  );
} 