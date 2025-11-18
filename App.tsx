
import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Header from './components/Header';
import GlobalSearch from './components/GlobalSearch';
import { FILTER_DATA, MOCK_RESULTS } from './constants';
import { FilterCategory, type Filters, type Result, type FilterOption, type ActiveFilter, type FilterSection } from './types';

const App: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    regions: [],
    sectors: [],
    contentType: [],
    tags: [],
    dates: null,
    dateRange: { from: '', to: '' },
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredResults, setFilteredResults] = useState<Result[]>([]);
  const [activeTab, setActiveTab] = useState('Research');
  const [openSidebarSections, setOpenSidebarSections] = useState<Record<string, boolean>>({});

  const RESULTS_PER_PAGE = 10;
  const searchTimeout = useRef<number | null>(null);

  const filterDataWithCounts = useMemo(() => {
    const data: FilterSection[] = JSON.parse(JSON.stringify(FILTER_DATA));
    const counts: { [K in FilterCategory]?: Record<string, number> } = {};

    MOCK_RESULTS.forEach(result => {
        const updateCount = (category: FilterCategory, value: string | string[]) => {
            if (!counts[category]) counts[category] = {};
            
            if (Array.isArray(value)) {
                value.forEach(v => {
                    counts[category]![v] = (counts[category]![v] || 0) + 1;
                });
            } else if(value) {
                counts[category]![value] = (counts[category]![value] || 0) + 1;
            }
        };

        updateCount(FilterCategory.Regions, result.region);
        updateCount(FilterCategory.Sectors, result.sector);
        updateCount(FilterCategory.ContentType, result.contentType);
        updateCount(FilterCategory.Tags, result.tags);
    });

    const updateOptionsCounts = (options: FilterOption[], category: FilterCategory): number => {
        let categoryTotal = 0;
        options.forEach(option => {
            if (option.subItems && option.subItems.length > 0) {
                option.count = updateOptionsCounts(option.subItems, category);
            } else {
                option.count = counts[category]?.[option.name] || 0;
            }
            categoryTotal += option.count;
        });
        return categoryTotal;
    };
    
    data.forEach((section: FilterSection) => {
        if (section.category !== FilterCategory.Dates) {
            updateOptionsCounts(section.options, section.category);
        }
    });

    return data;
  }, []);

  const handleToggleSidebarSection = useCallback((sectionName: string) => {
    setOpenSidebarSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  }, []);

  const handleFilterChange = useCallback((category: FilterCategory, value: string) => {
    if (category === FilterCategory.Dates) {
      setFilters(prevFilters => ({
        ...prevFilters,
        dates: prevFilters.dates === value ? null : value,
      }));
      return;
    }
    
    const sectionData = filterDataWithCounts.find(s => s.category === category);
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
  }, [filterDataWithCounts]);
  
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
    setOpenSidebarSections({});
  }, []);

  const removeFilter = useCallback((category: FilterCategory, value: string) => {
    if (category === FilterCategory.Dates) {
      setFilters(prev => ({ ...prev, dates: null, dateRange: { from: '', to: '' } }));
      return;
    }
    handleFilterChange(category, value);
  }, [handleFilterChange]);
  
  const handleSearchWithFilters = useCallback((term: string, filter: { category: FilterCategory; value: string; } | null, tab: string | null) => {
    setGlobalSearchTerm(term);
    if (tab) {
        setActiveTab(tab);
    }
    if (filter) {
        const currentFilters = filters[filter.category] as string[];
        if (!currentFilters.includes(filter.value)) {
            handleFilterChange(filter.category, filter.value);
        }

        // Expand sidebar to show the applied filter
        const newOpenSections: Record<string, boolean> = {};
        const section = filterDataWithCounts.find(s => s.category === filter.category);
        if (section) {
            newOpenSections[section.title] = true; // Open main section
            // Check if it's a sub-item and open its parent
            for (const option of section.options) {
                if (option.subItems?.some(si => si.name === filter.value)) {
                    newOpenSections[option.name] = true; // Open sub-section
                    break;
                }
            }
        }
        setOpenSidebarSections(prev => ({ ...prev, ...newOpenSections }));
    }
  }, [filters, handleFilterChange, filterDataWithCounts]);

  const activeFilters = useMemo(() => {
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
        } else if (Array.isArray(values) && category !== 'dateRange') {
          values.forEach(value => acc.push({ category: cat, value, originalValue: value }));
        }
        return acc;
      }, []);
  }, [filters]);
  
  // Reset page to 1 when filters, search, or tab change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, globalSearchTerm, activeTab]);

  // Simulate live search and filtering
  useEffect(() => {
    setIsLoading(true);
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = window.setTimeout(() => {
      let results = MOCK_RESULTS;

      // 1. Global Search
      if (globalSearchTerm.trim() !== '') {
        const lowercasedTerm = globalSearchTerm.toLowerCase().trim();
        results = results.filter(result =>
          result.title.toLowerCase().includes(lowercasedTerm) ||
          result.description.toLowerCase().includes(lowercasedTerm)
        );
      }

      // 2. Faceted Filters
      const activeFilterCategories = Object.keys(filters).filter(cat => {
        if (cat === 'dateRange') return false; // Handled by Dates
        
        const category = cat as FilterCategory;
        if (category === FilterCategory.Dates) return !!filters.dates;

        return filters[category] && (filters[category] as string[]).length > 0;
      });

      if (activeFilterCategories.length > 0) {
        results = results.filter(result => {
          // AND logic between categories
          return activeFilterCategories.every(cat => {
            const category = cat as FilterCategory;

            switch (category) {
              case FilterCategory.Regions:
                return filters.regions.includes(result.region);
              case FilterCategory.Sectors:
                return filters.sectors.includes(result.sector);
              case FilterCategory.ContentType:
                return filters.contentType.includes(result.contentType);
              case FilterCategory.Tags:
                return result.tags.some(tag => filters.tags.includes(tag));
              case FilterCategory.Dates: {
                if (!filters.dates) return true;
                
                const resultDate = new Date(result.date);
                if (isNaN(resultDate.getTime())) return false; // Invalid date in data
                
                const now = new Date();
                now.setHours(0, 0, 0, 0);

                switch (filters.dates) {
                  case 'Last Week': {
                    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return resultDate >= lastWeek;
                  }
                  case 'Last Month': {
                    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
                    return resultDate >= lastMonth;
                  }
                  case 'Last Quarter': {
                    const lastQuarter = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
                    return resultDate >= lastQuarter;
                  }
                  case 'Last Year': {
                    const lastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
                    return resultDate >= lastYear;
                  }
                  case 'Date Range': {
                    const from = filters.dateRange?.from;
                    const to = filters.dateRange?.to;
                    if (!from && !to) return true;

                    const fromDate = from ? new Date(`${from}T00:00:00`) : null;
                    const toDate = to ? new Date(`${to}T23:59:59`) : null;
                    
                    if ((fromDate && isNaN(fromDate.getTime())) || (toDate && isNaN(toDate.getTime()))) return true;

                    if (fromDate && toDate) return resultDate >= fromDate && resultDate <= toDate;
                    if (fromDate) return resultDate >= fromDate;
                    if (toDate) return resultDate <= toDate;
                    return true;
                  }
                  default:
                    return true;
                }
              }
              default:
                return true;
            }
          });
        });
      }

      setFilteredResults(results);
      setIsLoading(false);
    }, 500);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [filters, globalSearchTerm]);

  const { researchResults, issuerResults, ratingResults } = useMemo(() => ({
    researchResults: filteredResults.filter(r => r.type === 'Research'),
    issuerResults: filteredResults.filter(r => r.type === 'Issuer'),
    ratingResults: filteredResults.filter(r => r.type === 'Rating'),
  }), [filteredResults]);

  const displayedResultsForTab = useMemo(() => {
    if (activeTab === 'Issuers') return issuerResults;
    if (activeTab === 'Ratings') return ratingResults;
    return researchResults;
  }, [activeTab, researchResults, issuerResults, ratingResults]);

  const totalResults = useMemo(() => displayedResultsForTab.length, [displayedResultsForTab]);
  const totalPages = useMemo(() => Math.ceil(totalResults / RESULTS_PER_PAGE), [totalResults]);
  
  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
    return displayedResultsForTab.slice(startIndex, startIndex + RESULTS_PER_PAGE);
  }, [currentPage, displayedResultsForTab]);

  return (
    <div className="min-h-screen bg-brand-light font-sans text-brand-text">
      <div className="container mx-auto px-4 py-8">
        <div className="relative z-10">
          <GlobalSearch 
            searchTerm={globalSearchTerm} 
            onSearchChange={setGlobalSearchTerm}
            onSearchWithFilters={handleSearchWithFilters}
          />
        </div>
        <Header 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          totalResults={filteredResults.length}
          tabCounts={{
            research: researchResults.length,
            issuers: issuerResults.length,
            ratings: ratingResults.length,
          }}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <main className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8 mt-6 items-start">
          <Sidebar 
            filters={filters} 
            onFilterChange={handleFilterChange} 
            onDateRangeChange={handleDateRangeChange}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            filterData={filterDataWithCounts}
            openSidebarSections={openSidebarSections}
            onToggleSection={handleToggleSidebarSection}
          />
          <MainContent 
            results={paginatedResults} 
            activeFilters={activeFilters}
            onRemoveFilter={removeFilter}
            onClearFilters={clearFilters}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalResults={totalResults}
            resultsPerPage={RESULTS_PER_PAGE}
            isLoading={isLoading}
          />
        </main>
      </div>
    </div>
  );
};

export default App;