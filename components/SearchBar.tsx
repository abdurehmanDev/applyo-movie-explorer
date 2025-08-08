interface SearchBarProps {
  searchQuery: string;
  selectedType: string;
  selectedYear: string;
  onSearchChange: (query: string) => void;
  onTypeChange: (type: string) => void;
  onYearChange: (year: string) => void;
  onSearch: () => void;
}

export default function SearchBar({
  searchQuery,
  selectedType,
  selectedYear,
  onSearchChange,
  onTypeChange,
  onYearChange,
  onSearch
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      onSearch();
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-8 mb-8 border border-blue-100 dark:border-gray-700">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          🎬 Discover Amazing Movies & TV Shows
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Search through thousands of titles and find your next favorite
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter movie or TV series name (e.g., 'The Matrix', 'Breaking Bad')..."
            className="w-full px-6 py-4 pl-14 text-lg border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm"
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Type Filter */}
          <div className="space-y-2">
            <label htmlFor="type-filter" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              📺 Content Type
            </label>
            <select
              id="type-filter"
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 shadow-sm"
            >
              <option value="">🎭 All Types</option>
              <option value="movie">🎬 Movies Only</option>
              <option value="series">📺 TV Series Only</option>
            </select>
          </div>

          {/* Year Filter */}
          <div className="space-y-2">
            <label htmlFor="year-filter" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              📅 Release Year
            </label>
            <input
              type="number"
              id="year-filter"
              value={selectedYear}
              onChange={(e) => onYearChange(e.target.value)}
              placeholder="e.g., 2020"
              min="1900"
              max={new Date().getFullYear()}
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm"
            />
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              type="submit"
              disabled={!searchQuery.trim()}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Movies
              </>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
