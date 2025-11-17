
import React from 'react';
import ResultCard from './ResultCard';
import CloseIcon from './icons/CloseIcon';
import RefreshIcon from './icons/RefreshIcon';
import type { Result, ActiveFilter } from '../types';
import type { FilterCategory } from '../constants';

interface MainContentProps {
  results: Result[];
  activeFilters: ActiveFilter[];
  onRemoveFilter: (category: FilterCategory, value: string) => void;
  onClearFilters: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ results, activeFilters, onRemoveFilter, onClearFilters }) => {
  return (
    <div className="lg:col-span-3">
      {activeFilters.length > 0 && (
        <div className="flex items-center flex-wrap gap-2 pb-4 border-b border-brand-border mb-4">
          {activeFilters.map(({ category, value, originalValue }) => (
            <div key={`${category}-${originalValue}`} className="flex items-center bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1">
              <span>{value}</span>
              <button onClick={() => onRemoveFilter(category, originalValue)} className="ml-2 text-gray-500 hover:text-gray-800">
                <CloseIcon className="w-3 h-3" />
              </button>
            </div>
          ))}
          <button onClick={onClearFilters} className="flex items-center text-sm text-gray-600 hover:text-brand-text ml-auto">
            <RefreshIcon className="w-4 h-4 mr-1" />
            Clear Filters
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600">
          {`1-${results.length} of 120 Results`}
        </p>
      </div>

      <div className="space-y-4">
        {results.map((result) => (
          <ResultCard key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
};

export default MainContent;
