import React, { useState, useMemo, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Header from './components/Header';
import { FILTER_DATA, FilterCategory, MOCK_RESULTS } from './constants';
import type { Filters, Result, FilterOption, ActiveFilter } from './types';

const App: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    regions: ['Pension Funds', 'Banking Organizations'],
    sectors: ['Financial Institutions', 'Pension Funds'],
    contentType: [],
    tags: [],
    dates: null,
    dateRange: { from: '', to: '' },
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleFilterChange = useCallback((category: FilterCategory, value: string) => {
    if (category === FilterCategory.Dates) {
      setFilters(prevFilters => ({
        ...prevFilters,
        dates: prevFilters.dates === value ? null : value,
      }));
      return;
    }
    
    const sectionData = FILTER_DATA.find(s => s.category === category);
    if (!sectionData) return;

    let item: FilterOption | undefined;
    let parentItem: FilterOption | undefined;

    for (const option of sectionData.options) {
      if (option.name === value) {
        item = option;
        break;
      }
      if (option.subItems) {
        const subItem = option.subItems.find(si => si.name === value);
        if (subItem) {
          item = subItem;
          parentItem = option;
          break;
        }
      }
    }

    if (!item) return;

    setFilters(prevFilters => {
      const currentFilters = [...(prevFilters[category] as string[])];
      let newFilters: string[];

      if (item.subItems && item.subItems.length > 0) {
        const childNames = item.subItems.map(si => si.name);
        const isParentChecked = currentFilters.includes(item.name);
        if (isParentChecked) {
          newFilters = currentFilters.filter(name => name !== item!.name && !childNames.includes(name));
        } else {
          newFilters = [...new Set([...currentFilters, item.name, ...childNames])];
        }
      } else if (parentItem && parentItem.subItems) {
        let tempFilters = currentFilters.includes(item.name)
          ? currentFilters.filter(name => name !== item.name)
          : [...currentFilters, item.name];
        const childNames = parentItem.subItems.map(si => si.name);
        const allChildrenChecked = childNames.every(name => tempFilters.includes(name));
        if (allChildrenChecked) {
          newFilters = [...new Set([...tempFilters, parentItem.name])];
        } else {
          newFilters = tempFilters.filter(name => name !== parentItem.name);
        }
      } else {
        newFilters = currentFilters.includes(item.name)
          ? currentFilters.filter(name => name !== item.name)
          : [...currentFilters, item.name];
      }
      return { ...prevFilters, [category]: newFilters };
    });
  }, []);
  
  const handleDateRangeChange = useCallback((range: { from: string; to: string }) => {
    setFilters(prev => ({ ...prev, dateRange: range }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      regions: [],
      sectors: [],
      contentType: [],
      tags: [],
      dates: null,
      dateRange: { from: '', to: '' },
    });
  }, []);

  const removeFilter = useCallback((category: FilterCategory, value: string) => {
    if (category === FilterCategory.Dates) {
      setFilters(prev => ({ ...prev, dates: null, dateRange: { from: '', to: '' } }));
      return;
    }
    handleFilterChange(category, value);
  }, [handleFilterChange]);

  const activeFilters = useMemo(() => {
    // FIX: Replaced flatMap with reduce to fix a TypeScript type inference issue.
    // The `flatMap` method was struggling to unify the types of returned objects from different conditional branches.
    // `reduce` provides more explicit control over the accumulator's type, resolving the error.
    return Object.entries(filters).reduce<ActiveFilter[]>((acc, [category, values]) => {
        const cat = category as FilterCategory;
        if (cat === FilterCategory.Dates) {
          if (values) {
            let displayValue = values as string;
            if (displayValue === 'Date Range' && filters.dateRange && (filters.dateRange.from || filters.dateRange.to)) {
              displayValue = `Range: ${filters.dateRange.from || '...'} - ${filters.dateRange.to || '...'}`;
            }
            acc.push({ category: cat, value: displayValue, originalValue: values as string });
          }
        } else if (Array.isArray(values)) {
          values.forEach(value => acc.push({ category: cat, value, originalValue: value }));
        }
        return acc;
      }, []);
  }, [filters]);
  
  const filteredResults: Result[] = useMemo(() => {
      if (activeFilters.length === 0) return MOCK_RESULTS;
      return MOCK_RESULTS.slice(0, 5 + (activeFilters.length % 5) );
  }, [activeFilters]);

  return (
    <div className="min-h-screen bg-brand-light font-sans text-brand-text">
      <div className="container mx-auto px-4 py-8">
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8 mt-6 items-start">
          <Sidebar 
            filters={filters} 
            onFilterChange={handleFilterChange} 
            onDateRangeChange={handleDateRangeChange}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          <MainContent 
            results={filteredResults} 
            activeFilters={activeFilters}
            onRemoveFilter={removeFilter}
            onClearFilters={clearFilters}
          />
        </main>
      </div>
    </div>
  );
};

export default App;