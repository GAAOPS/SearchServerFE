import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { MultiSelectDropdown } from './MultiSelectDropdown';
import { Facets } from '../types/search';

interface SearchFiltersProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onSearchSubmit: () => void;
  facets: Facets;
  selectedActivities: string[];
  selectedLocations: string[];
  selectedEntryLevels: string[];
  selectedWorkingTimes: string[];
  onActivitiesChange: (values: string[]) => void;
  onLocationsChange: (values: string[]) => void;
  onEntryLevelsChange: (values: string[]) => void;
  onWorkingTimesChange: (values: string[]) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  onSearchTermChange,
  onSearchSubmit,
  facets,
  selectedActivities,
  selectedLocations,
  selectedEntryLevels,
  selectedWorkingTimes,
  onActivitiesChange,
  onLocationsChange,
  onEntryLevelsChange,
  onWorkingTimesChange,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="space-y-6">
        {/* Search Input */}
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
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Enter job title, keywords..."
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MultiSelectDropdown
            label="Activities"
            options={facets.activities}
            selectedValues={selectedActivities}
            onChange={onActivitiesChange}
            placeholder="Select activities..."
          />
          
          <MultiSelectDropdown
            label="Locations"
            options={facets.locations}
            selectedValues={selectedLocations}
            onChange={onLocationsChange}
            placeholder="Select locations..."
          />
          
          <MultiSelectDropdown
            label="Entry Levels"
            options={facets.entryLevels}
            selectedValues={selectedEntryLevels}
            onChange={onEntryLevelsChange}
            placeholder="Select entry levels..."
          />
          
          <MultiSelectDropdown
            label="Working Times"
            options={facets.workingTimes}
            selectedValues={selectedWorkingTimes}
            onChange={onWorkingTimesChange}
            placeholder="Select working times..."
          />
        </div>
      </div>
    </div>
  );
};