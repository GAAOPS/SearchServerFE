import React from 'react';
import { JobCard } from './JobCard';
import { SearchResponse } from '../types/search';

interface SearchResultsProps {
  searchResponse: SearchResponse | null;
  isLoading: boolean;
  error: string | null;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  searchResponse,
  isLoading,
  error
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-3 text-gray-600">Searching jobs...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Search Error</h3>
            <div className="mt-2 text-sm text-red-700">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!searchResponse) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Start your job search</h3>
          <p className="mt-1 text-sm text-gray-500">Enter keywords or use filters to find jobs</p>
        </div>
      </div>
    );
  }

  const { results, pagination, searchInfo } = searchResponse;

  return (
    <div className="space-y-6">
      {/* Search Info - Hidden field as requested */}
      <input
        type="hidden"
        value={JSON.stringify(searchInfo)}
        data-testid="search-info"
      />

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Search Results
          </h2>
          <p className="text-sm text-gray-600">
            {pagination.totalResults} jobs found
            {searchInfo.searchTerm && ` for "${searchInfo.searchTerm}"`}
            <span className="text-gray-400 ml-2">
              ({searchInfo.executionTimeMs}ms)
            </span>
          </p>
        </div>
      </div>

      {/* Applied Filters Summary */}
      {(searchInfo.appliedFilters.activities || 
        searchInfo.appliedFilters.locations || 
        searchInfo.appliedFilters.entryLevels || 
        searchInfo.appliedFilters.workingTimes) && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Applied Filters:</h3>
          <div className="flex flex-wrap gap-2">
            {searchInfo.appliedFilters.activities?.map(activity => (
              <span key={activity} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Activity: {activity}
              </span>
            ))}
            {searchInfo.appliedFilters.locations?.map(location => (
              <span key={location} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Location: {location}
              </span>
            ))}
            {searchInfo.appliedFilters.entryLevels?.map(level => (
              <span key={level} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                Entry Level: {level}
              </span>
            ))}
            {searchInfo.appliedFilters.workingTimes?.map(time => (
              <span key={time} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Working Time: {time}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Job Results */}
      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29.82-5.877 2.172M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.875a3.124 3.124 0 11-6.248 0 3.124 3.124 0 016.248 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}

      {/* Pagination Info */}
      {pagination.totalResults > 0 && (
        <div className="bg-gray-50 px-4 py-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing page {pagination.currentPage} of {pagination.totalPages}
              ({pagination.totalResults} total results)
            </div>
            <div className="text-xs text-gray-500">
              {pagination.pageSize} results per page
            </div>
          </div>
        </div>
      )}
    </div>
  );
};