import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { MultiSelectDropdown } from './MultiSelectDropdown';
import { Facets } from '../types/search';

interface SearchFiltersProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  activities: string[];
  onActivitiesChange: (activities: string[]) => void;
  locations: string[];
  onLocationsChange: (locations: string[]) => void;
  entryLevels: string[];
  onEntryLevelsChange: (entryLevels: string[]) => void;
  workingTimes: string[];
  onWorkingTimesChange: (workingTimes: string[]) => void;
  facets: Facets | null;
  onSearch: () => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  onSearchTermChange,
  activities,
  onActivitiesChange,
  locations,
  onLocationsChange,
  entryLevels,
  onEntryLevelsChange,
  workingTimes,
  onWorkingTimesChange,
  facets,
  onSearch
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="space-y-6">
        {/* Search Term Input */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Jobs
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter job title, keywords..."
              className="search-input pl-10"
            />
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MultiSelectDropdown
            label="Activities"
            options={facets?.activities || []}
            selectedValues={activities}
            onChange={onActivitiesChange}
            placeholder="Select activities..."
          />
          
          <MultiSelectDropdown
            label="Locations"
            options={facets?.locations || []}
            selectedValues={locations}
            onChange={onLocationsChange}
            placeholder="Select locations..."
          />
          
          <MultiSelectDropdown
            label="Entry Levels"
            options={facets?.entryLevels || []}
            selectedValues={entryLevels}
            onChange={onEntryLevelsChange}
            placeholder="Select entry levels..."
          />
          
          <MultiSelectDropdown
            label="Working Times"
            options={facets?.workingTimes || []}
            selectedValues={workingTimes}
            onChange={onWorkingTimesChange}
            placeholder="Select working times..."
          />
        </div>
      </div>
    </div>
  );
};