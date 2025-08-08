import { MovieDetail } from '../types/movie';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface MovieModalProps {
  movie: MovieDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MovieModal({ movie, isOpen, onClose }: MovieModalProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      // Reset image states when modal opens
      setImageError(false);
      setImageLoading(true);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Check if the poster URL is valid and not 'N/A'
  const isValidPoster = movie?.Poster && 
    movie.Poster !== 'N/A' && 
    movie.Poster !== 'undefined' && 
    movie.Poster.trim() !== '' && 
    !imageError;

  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition-all duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Poster */}
          <div className="lg:w-1/3 p-6">
            <div className="relative h-96 lg:h-auto">
              {isValidPoster ? (
                <>
                  {imageLoading && (
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center z-10">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  )}
                  <Image
                    src={movie.Poster}
                    alt={movie.Title}
                    fill
                    className={`object-cover rounded-lg transition-opacity duration-300 ${
                      imageLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                    unoptimized={true}
                  />
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center p-4">
                    <svg className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium block">No Image</span>
                    <span className="text-gray-400 dark:text-gray-500 text-xs block mt-1">Available</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-2/3 p-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {movie.Title}
            </h2>
            
            <div className="space-y-4">
              {/* Rating */}
              {movie.imdbRating !== 'N/A' && (
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-500 text-xl">★</span>
                  <span className="text-gray-700 dark:text-gray-300 font-semibold">
                    {movie.imdbRating}/10
                  </span>
                  {movie.imdbVotes !== 'N/A' && (
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      ({movie.imdbVotes} votes)
                    </span>
                  )}
                </div>
              )}

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Year</span>
                  <p className="text-gray-900 dark:text-white font-medium">{movie.Year}</p>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Released</span>
                  <p className="text-gray-900 dark:text-white font-medium">{movie.Released}</p>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Runtime</span>
                  <p className="text-gray-900 dark:text-white font-medium">{movie.Runtime}</p>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Type</span>
                  <p className="text-gray-900 dark:text-white font-medium capitalize">{movie.Type}</p>
                </div>
              </div>

              {/* Genre */}
              {movie.Genre !== 'N/A' && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Genre</span>
                  <p className="text-gray-900 dark:text-white font-medium">{movie.Genre}</p>
                </div>
              )}

              {/* Plot */}
              {movie.Plot !== 'N/A' && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Plot</span>
                  <p className="text-gray-900 dark:text-white leading-relaxed">{movie.Plot}</p>
                </div>
              )}

              {/* Actors */}
              {movie.Actors !== 'N/A' && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Cast</span>
                  <p className="text-gray-900 dark:text-white font-medium">{movie.Actors}</p>
                </div>
              )}

              {/* Director */}
              {movie.Director !== 'N/A' && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Director</span>
                  <p className="text-gray-900 dark:text-white font-medium">{movie.Director}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
