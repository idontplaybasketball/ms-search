import React from 'react';
import ResultCard from './ResultCard';
import ResultCardSkeleton from './ResultCardSkeleton';
import CloseIcon from './icons/CloseIcon';
import RefreshIcon from './icons/RefreshIcon';
import type { Result, ActiveFilter } from '../types';
import type { FilterCategory } from '../types';

interface MainContentProps {
  results: Result[];
  activeFilters: ActiveFilter[];
  onRemoveFilter: (category: FilterCategory, value: string) => void;
  onClearFilters: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalResults: number;
  resultsPerPage: number;
  isLoading: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ 
  results, 
  activeFilters, 
  onRemoveFilter, 
  onClearFilters,
  currentPage,
  totalPages,
  onPageChange,
  totalResults,
  resultsPerPage,
  isLoading,
}) => {
  const firstResultIndex = totalResults > 0 ? (currentPage - 1) * resultsPerPage + 1 : 0;
  const lastResultIndex = firstResultIndex + results.length - 1;

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

      <div className="space-y-4 min-h-[400px]">
        {isLoading ? (
          Array.from({ length: resultsPerPage / 2 }).map((_, index) => <ResultCardSkeleton key={index} />)
        ) : results.length > 0 ? (
          results.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500 bg-white border border-brand-border flex items-center justify-center h-full rounded">
            <p>No results match your criteria.</p>
          </div>
        )}
      </div>

      {!isLoading && totalResults > 0 && (
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-brand-border">
          <p className="text-sm text-gray-600">
            Showing {firstResultIndex.toLocaleString()}-{lastResultIndex.toLocaleString()} of {totalResults.toLocaleString()} Results
          </p>
          {totalPages > 1 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Go to previous page"
              >
                Previous
              </button>
              <span className="text-sm text-gray-700 px-2" aria-live="polite">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Go to next page"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainContent;