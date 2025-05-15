import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '../services/movieService';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = movie.isExternalImage ? movie.poster : `/images${movie.poster}`;
  const genres = movie.genre || [];
  
  // Format the rating to show only one decimal place
  const formattedRating = (movie.rating / 10).toFixed(1);
  
  // Calculate rating color based on value
  const getRatingColor = (rating: number) => {
    if (rating >= 7) return 'text-green-400';
    if (rating >= 5) return 'text-amber-400';
    return 'text-red-400';
  };
  
  // Get the year from the release date
  const year = new Date(movie.releaseDate).getFullYear();

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:translate-y-[-5px] border border-gray-700">
      <Link href={`/movies/${movie.id}`} className="block h-full">
        <div className="relative h-[380px]">
          <Image 
            src={imageUrl}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P3BfwAJYgPKhLUX0wAAAABJRU5ErkJggg=="
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
          
          {/* Rating badge */}
          <div className="absolute top-3 right-3 bg-gray-900/80 rounded-full h-10 w-10 flex items-center justify-center border-2 border-amber-500">
            <span className={`text-sm font-bold ${getRatingColor(movie.rating)}`}>
              {formattedRating}
            </span>
          </div>
        </div>
        
        <div className="p-5 h-[calc(100%-380px)] flex flex-col">
          <h3 className="text-xl font-semibold text-white truncate group-hover:text-amber-400 transition-colors">
            {movie.title}
          </h3>
          
          <div className="flex items-center mt-2 text-sm text-gray-400">
            <span>{year}</span>
            <span className="mx-2">•</span>
            <span>{movie.duration} min</span>
          </div>
          
          {genres.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {genres.slice(0, 2).map((genre, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-md border border-gray-600"
                >
                  {genre}
                </span>
              ))}
            </div>
          ) : (
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-md border border-gray-600">
                {movie.director.split(' ')[0]}
              </span>
            </div>
          )}
          
          <div className="mt-4 line-clamp-2 text-sm text-gray-400">
            {movie.overview}
          </div>
        </div>
      </Link>
    </div>
  );
} 