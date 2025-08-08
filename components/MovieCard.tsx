import { Movie } from '../types/movie';
import Image from 'next/image';
import { useState } from 'react';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleClick = () => {
    onClick(movie);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Check if the poster URL is valid and not 'N/A'
  const isValidPoster = movie.Poster && 
    movie.Poster !== 'N/A' && 
    movie.Poster !== 'undefined' && 
    movie.Poster.trim() !== '' && 
    !imageError;

  return (
    <div 
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100 dark:border-gray-700"
      onClick={handleClick}
    >
      <div className="relative h-72 w-full overflow-hidden">
        {isValidPoster ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}
            <Image
              src={movie.Poster}
              alt={movie.Title}
              fill
              className={`object-cover transition-opacity duration-300 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              } group-hover:scale-110 transition-transform duration-300`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={handleImageError}
              onLoad={handleImageLoad}
              priority={false}
              unoptimized={true}
            />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">No Image Available</span>
            </div>
          </div>
        )}
        
        {/* Type Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
          {movie.Type}
        </div>
        
        {/* Year Badge */}
        <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-xs font-medium">
          {movie.Year}
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-lg">
              <span className="text-sm font-medium text-gray-900 dark:text-white">View Details</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {movie.Title}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
            {movie.Year}
          </p>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500 text-sm">★</span>
            <span className="text-gray-500 dark:text-gray-400 text-xs">Click to view</span>
          </div>
        </div>
      </div>
    </div>
  );
}
