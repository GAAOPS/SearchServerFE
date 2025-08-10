import React, { useState, useEffect, useCallback } from 'react';
import { SearchFilters } from './components/SearchFilters';
import { SearchResults } from './components/SearchResults';
import { searchJobs } from './services/searchApi';
import { SearchRequest, SearchResponse } from './types/search';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activities, setActivities] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [entryLevels, setEntryLevels] = useState<string[]>([]);
  const [workingTimes, setWorkingTimes] = useState<string[]>([]);
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = useCallback(async () => {
    setLoading(true);
    setError(null);

    const request: SearchRequest = {
      searchTerm,
      activities,
      locations,
      entryLevels,
      workingTimes,
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
      setLoading(false);
    }
  }, [searchTerm, activities, locations, entryLevels, workingTimes]);

  // Initial search on component mount
  useEffect(() => {
    performSearch();
  }, []);

  // Auto-search when filters change (but not search term)
  useEffect(() => {
    performSearch();
  }, [activities, locations, entryLevels, workingTimes]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Job Search</h1>
              <p className="mt-1 text-sm text-gray-600">
                Find your perfect career opportunity
              </p>
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
        <SearchFilters
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          activities={activities}
          onActivitiesChange={setActivities}
          locations={locations}
          onLocationsChange={setLocations}
          entryLevels={entryLevels}
          onEntryLevelsChange={setEntryLevels}
          workingTimes={workingTimes}
          onWorkingTimesChange={setWorkingTimes}
          facets={searchResponse?.facets || null}
          onSearch={performSearch}
        />

        <SearchResults
          searchResponse={searchResponse}
          loading={loading}
          error={error}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>© 2025 Job Search Application. Built with React and TypeScript.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;