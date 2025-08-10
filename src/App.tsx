import React, { useState, useEffect, useCallback } from 'react';
import { SearchFilters } from './components/SearchFilters';
import { SearchResults } from './components/SearchResults';
import { searchJobs } from './services/searchApi';
import { SearchRequest, SearchResponse } from './types/search';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedEntryLevels, setSelectedEntryLevels] = useState<string[]>([]);
  const [selectedWorkingTimes, setSelectedWorkingTimes] = useState<string[]>([]);
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const request: SearchRequest = {
      searchTerm,
      activities: selectedActivities,
      locations: selectedLocations,
      entryLevels: selectedEntryLevels,
      workingTimes: selectedWorkingTimes,
      page: 1,
      includeFacets: true
    };

    try {
      const response = await searchJobs(request);
      setSearchResponse(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
      setSearchResponse(null);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, selectedActivities, selectedLocations, selectedEntryLevels, selectedWorkingTimes]);

  // Initial search on component mount
  useEffect(() => {
    performSearch();
  }, []);

  // Search when filters change (but not search term)
  useEffect(() => {
    performSearch();
  }, [selectedActivities, selectedLocations, selectedEntryLevels, selectedWorkingTimes]);

  const handleSearchSubmit = () => {
    performSearch();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Job Search Portal</h1>
              <p className="text-sm text-gray-600 mt-1">Find your perfect career opportunity</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                {searchResponse && (
                  <span>{searchResponse.pagination.totalResults} jobs available</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Search Filters */}
          <SearchFilters
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            onSearchSubmit={handleSearchSubmit}
            facets={searchResponse?.facets || {
              activities: [],
              locations: [],
              entryLevels: [],
              workingTimes: []
            }}
            selectedActivities={selectedActivities}
            selectedLocations={selectedLocations}
            selectedEntryLevels={selectedEntryLevels}
            selectedWorkingTimes={selectedWorkingTimes}
            onActivitiesChange={setSelectedActivities}
            onLocationsChange={setSelectedLocations}
            onEntryLevelsChange={setSelectedEntryLevels}
            onWorkingTimesChange={setSelectedWorkingTimes}
          />

          {/* Search Results */}
          <SearchResults
            searchResponse={searchResponse}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>&copy; 2025 Job Search Portal. Built with React and TypeScript.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;