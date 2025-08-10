import React from 'react';
import { JobCard } from './JobCard';
import { SearchResponse } from '../types/search';

interface SearchResultsProps {
  searchResponse: SearchResponse | null;
  loading: boolean;
  error: string | null;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  searchResponse,
  loading,
  error
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Search Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
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
          <p className="mt-1 text-sm text-gray-500">Enter keywords or use filters to find your perfect job.</p>
        </div>
      </div>
    );
  }

  const { results, pagination, searchInfo } = searchResponse;

  return (
    <div className="space-y-6">
      {/* Hidden search info for diagnostics */}
      <input
        type="hidden"
        value={JSON.stringify(searchInfo)}
        data-testid="search-info"
      />

      {/* Results Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-700">
              <span className="font-medium">{pagination.totalResults}</span> jobs found
            </p>
            {searchInfo.executionTimeMs && (
              <p className="text-sm text-gray-500">
                ({searchInfo.executionTimeMs}ms)
              </p>
            )}
          </div>
          
          {/* Applied Filters Summary */}
          {(searchInfo.appliedFilters.activities || 
            searchInfo.appliedFilters.locations || 
            searchInfo.appliedFilters.entryLevels || 
            searchInfo.appliedFilters.workingTimes) && (
            <div className="mt-2 sm:mt-0">
              <p className="text-sm text-gray-600">Filters applied</p>
            </div>
          )}
        </div>
        
        {searchInfo.searchTerm && (
          <p className="mt-2 text-sm text-gray-600">
            Search term: <span className="font-medium">"{searchInfo.searchTerm}"</span>
          </p>
        )}
      </div>

      {/* Job Results */}
      {results.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v1.306" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or removing some filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {results.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      {/* Pagination Info */}
      {pagination.totalPages > 1 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Page <span className="font-medium">{pagination.currentPage}</span> of{' '}
              <span className="font-medium">{pagination.totalPages}</span>
            </p>
            <div className="flex space-x-2">
              <button
                disabled={!pagination.hasPreviousPage}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                disabled={!pagination.hasNextPage}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};