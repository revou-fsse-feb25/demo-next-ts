import Image from 'next/image';
import Link from 'next/link';
import { getMovie, getMovieRecommendations, Movie } from '../../services/movieService';
import MovieList from '../../components/MovieList';
import { notFound } from 'next/navigation';

interface MoviePageProps {
  params: {
    id: string;
  };
}

// Generate metadata for the movie page (for SEO)
export async function generateMetadata({ params }: MoviePageProps) {
  try {
    const movie = await getMovie(params.id);
    
    return {
      title: `${movie.title} - MovieHub`,
      description: movie.overview.slice(0, 160),
      openGraph: {
        title: movie.title,
        description: movie.overview.slice(0, 160),
        type: 'website',
        images: [movie.isExternalImage ? movie.poster : `/images${movie.poster}`],
      },
    };
  } catch (error) {
    return {
      title: 'Movie Not Found - MovieHub',
      description: 'The requested movie could not be found.',
    };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  try {
    // Data fetching happens on the server
    const movie = await getMovie(params.id);
    const recommendations = await getMovieRecommendations(params.id);
    
    const posterUrl = movie.isExternalImage ? movie.poster : `/images${movie.poster}`;
    const backdropUrl = movie.isExternalImage ? movie.backdrop : `/images${movie.backdrop}`;
    const genres = movie.genre || [];
    const year = new Date(movie.releaseDate).getFullYear();
    
    // Format the rating to show only one decimal place
    const formattedRating = movie.rating.toFixed(1);
    
    // Calculate rating color based on value
    const getRatingColor = (rating: number) => {
      if (rating >= 7) return 'text-green-500';
      if (rating >= 5) return 'text-amber-500';
      return 'text-red-500';
    };
    
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center mb-6">
          <Link 
            href="/movies" 
            className="text-amber-500 hover:text-amber-400 transition-colors flex items-center gap-2 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Movies</span>
          </Link>
        </div>
        
        <div className="relative">
          <div className="aspect-[21/9] w-full relative rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={backdropUrl}
              alt={movie.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent" />
          </div>
          
          <div className="container mx-auto px-4 relative -mt-32 pb-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-64 h-96 relative rounded-lg overflow-hidden shadow-xl flex-shrink-0 mx-auto md:mx-0 border-2 border-gray-800 group">
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Rating badge */}
                <div className="absolute top-3 right-3 bg-gray-900/80 rounded-full h-12 w-12 flex items-center justify-center border-2 border-amber-500">
                  <span className={`text-md font-bold ${getRatingColor(movie.rating)}`}>
                    {formattedRating}
                  </span>
                </div>
              </div>
              
              <div className="flex-1 bg-gray-800/70 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-white mb-2 text-shadow">{movie.title}</h1>
                
                <div className="flex items-center gap-4 text-sm mb-6">
                  <span className="text-gray-300">{year}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-300">{movie.duration} min</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-300">Directed by {movie.director}</span>
                </div>
                
                {genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {genres.map((genre, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full border border-gray-600 hover:bg-gray-600 transition-colors"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Overview
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <button className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-medium px-6 py-2 rounded-full flex items-center transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Watch Trailer
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium px-6 py-2 rounded-full flex items-center transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Add to Favorites
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {recommendations.length > 0 ? (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              You Might Also Like
            </h2>
            <MovieList 
              movies={recommendations} 
              columns={{ sm: 1, md: 3, lg: 3 }} 
              emptyMessage={`No recommendations found for ${movie.title}`}
            />
          </div>
        ) : (
          <div className="mt-16 bg-gray-800/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Recommendations
            </h2>
            <p className="text-gray-400">No similar movies found for {movie.title}.</p>
          </div>
        )}
        
        <section className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-xl shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">About SSR for Movie Details</h2>
            <p className="text-gray-300 leading-relaxed">
              This page uses server-side rendering for movie details, which is crucial for SEO.
              Search engines can easily index all the movie content, including title, overview, and metadata.
              Additionally, the page loads with all the content already rendered, providing a better user experience.
            </p>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    notFound();
  }
} 