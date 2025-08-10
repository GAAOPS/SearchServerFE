import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { FacetItem } from '../types/search';

interface MultiSelectDropdownProps {
  label: string;
  options: FacetItem[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  label,
  options,
  selectedValues,
  onChange,
  placeholder = "Select options..."
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleOption = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  const handleRemoveOption = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selectedValues.filter(v => v !== value));
  };

  const displayText = selectedValues.length > 0 
    ? `${selectedValues.length} selected`
    : placeholder;

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="filter-button w-full flex items-center justify-between text-left"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={selectedValues.length > 0 ? 'text-gray-900' : 'text-gray-500'}>
          {displayText}
        </span>
        <ChevronDownIcon 
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selectedValues.map(value => (
            <span
              key={value}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-100 text-primary-800"
            >
              {value}
              <button
                type="button"
                onClick={(e) => handleRemoveOption(value, e)}
                className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-primary-200 focus:outline-none focus:bg-primary-200"
              >
                <XMarkIcon className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg dropdown-shadow max-h-60 overflow-auto">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500">No options available</div>
          ) : (
            <ul role="listbox" className="py-1">
              {options.map((option) => (
                <li key={option.value} role="option">
                  <button
                    type="button"
                    onClick={() => handleToggleOption(option.value)}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none flex items-center justify-between ${
                      selectedValues.includes(option.value) ? 'bg-primary-50 text-primary-900' : 'text-gray-900'
                    }`}
                  >
                    <span className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedValues.includes(option.value)}
                        onChange={() => {}} // Handled by button click
                        className="mr-3 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      {option.value}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {option.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};