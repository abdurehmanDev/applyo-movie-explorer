'use client';

import { useState } from 'react';
import { Movie, MovieDetail } from '../types/movie';
import { searchMovies, getMovieDetails } from '../utils/api';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import Pagination from '../components/Pagination';

export default function Home() {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const RESULTS_PER_PAGE = 10;
  const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);

  // Search function
  const performSearch = async (page: number = 1) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const params = {
        s: searchQuery.trim(),
        page,
        ...(selectedType && { type: selectedType }),
        ...(selectedYear && { y: selectedYear }),
      };

      const response = await searchMovies(params);
      setMovies(response.Search || []);
      setTotalResults(parseInt(response.totalResults) || 0);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
      setMovies([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search
  const handleSearch = () => {
    setCurrentPage(1);
    performSearch(1);
  };

  // Handle type change - just update the state, no auto search
  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  // Handle year change - just update the state, no auto search
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    performSearch(page);
  };

  // Handle movie card click
  const handleMovieClick = async (movie: Movie) => {
    setIsModalOpen(true);
    setIsLoadingDetails(true);
    setSelectedMovie(null);

    try {
      const details = await getMovieDetails(movie.imdbID);
      setSelectedMovie(details);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load movie details');
    } finally {
      setIsLoadingDetails(false);
    }
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  // Clear error
  const clearError = () => {
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <span className="text-3xl">🎬</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Movie Explorer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover your next favorite movie or TV series with our powerful search engine
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar
          searchQuery={searchQuery}
          selectedType={selectedType}
          selectedYear={selectedYear}
          onSearchChange={setSearchQuery}
          onTypeChange={handleTypeChange}
          onYearChange={handleYearChange}
          onSearch={handleSearch}
        />

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-8 shadow-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-red-800 dark:text-red-200">{error}</p>
              </div>
              <button
                onClick={clearError}
                className="ml-4 text-red-400 hover:text-red-600 dark:hover:text-red-300"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Results Section */}
        {movies.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  🎯 Search Results
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Found {totalResults.toLocaleString()} result{totalResults !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                <span className="text-blue-800 dark:text-blue-200 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            </div>

            {/* Movie Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  onClick={handleMovieClick}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={isLoading}
            />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && searchQuery.trim() && movies.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl max-w-md mx-auto">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No results found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try adjusting your search terms or filters
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Welcome State */}
        {!isLoading && !error && !searchQuery.trim() && (
          <div className="text-center py-16">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl max-w-md mx-auto">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Start exploring movies
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enter a movie or TV series name to begin your search
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Movie Details Modal */}
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />

      {/* Loading Overlay for Modal */}
      {isModalOpen && isLoadingDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 flex items-center space-x-4 shadow-2xl">
            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-lg font-medium text-gray-900 dark:text-white">Loading movie details...</span>
          </div>
        </div>
      )}
    </div>
  );
}
