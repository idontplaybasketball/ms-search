import React, { useState, useMemo } from 'react';
import Accordion from './Accordion';
import SearchIcon from './icons/SearchIcon';
import CloseIcon from './icons/CloseIcon';
import type { Filters, FilterOption, FilterSection } from '../types';
import { FILTER_DATA, FilterCategory } from '../constants';

interface SidebarProps {
  filters: Filters;
  onFilterChange: (category: FilterCategory, value: string) => void;
  onDateRangeChange: (range: { from: string; to: string }) => void;
  isOpen: boolean;
  onClose: () => void;
}

const CheckboxItem: React.FC<{ 
  item: FilterOption; 
  category: FilterCategory;
  checked: boolean;
  onFilterChange: (category: FilterCategory, value: string) => void;
  isSubItem?: boolean;
}> = ({ item, category, checked, onFilterChange, isSubItem = false }) => {
  return (
    <div className={`flex items-center justify-between py-1 ${isSubItem ? 'pl-5' : ''}`}>
      <label className="flex items-center space-x-3 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onFilterChange(category, item.name)}
          className="form-checkbox h-4 w-4 text-brand-accent border-gray-500 focus:ring-brand-accent"
        />
        <span className="text-sm text-brand-text-light">{item.name}</span>
      </label>
      <span className="text-xs text-gray-400">{`(${item.count})`}</span>
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ filters, onFilterChange, onDateRangeChange, isOpen, onClose }) => {
  const [globalSearch, setGlobalSearch] = useState('');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpansion = (itemName: string) => {
    setExpandedItems(prev => ({...prev, [itemName]: !prev[itemName]}));
  };

  const filteredSections = useMemo(() => {
    if (!globalSearch.trim()) {
      return FILTER_DATA;
    }
    const lowercasedFilter = globalSearch.toLowerCase().trim();

    const newSections = FILTER_DATA.map(section => {
      const filteredOptions = section.options.reduce<FilterOption[]>((acc, option) => {
        if (section.control === 'radio') {
            if (option.name.toLowerCase().includes(lowercasedFilter)) {
                acc.push(option);
            }
            return acc;
        }

        const optionNameMatches = option.name.toLowerCase().includes(lowercasedFilter);
        const matchingSubItems = option.subItems?.filter(subItem =>
          subItem.name.toLowerCase().includes(lowercasedFilter)
        );

        if (optionNameMatches) {
          acc.push(option);
        } else if (matchingSubItems && matchingSubItems.length > 0) {
          acc.push({ ...option, subItems: matchingSubItems });
        }
        return acc;
      }, []);
      return { ...section, options: filteredOptions };
    });
    return newSections.filter(section => section.options.length > 0);
  }, [globalSearch]);


  const sidebarContent = (
    <aside className="bg-brand-dark text-brand-text-light p-6">
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search all filters..."
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
          className="w-full bg-gray-700 border-gray-600 pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:ring-brand-accent focus:border-brand-accent"
        />
      </div>

      {filteredSections.map((section) => (
        <Accordion 
            key={section.title} 
            title={section.title} 
            defaultOpen={!!globalSearch || section.category === FilterCategory.Regions || section.category === FilterCategory.Sectors}
        >
          {section.control === 'radio' ? (
            <div className="space-y-2 mt-2">
              {section.options.map(item => (
                <div key={item.name} className="flex flex-col">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name={section.category}
                      value={item.name}
                      checked={filters.dates === item.name}
                      onChange={() => onFilterChange(section.category, item.name)}
                      className="form-radio h-4 w-4 text-brand-accent bg-gray-700 border-gray-500 focus:ring-brand-accent"
                    />
                    <span className="text-sm text-brand-text-light">{item.name}</span>
                  </label>
                  {item.name === 'Date Range' && filters.dates === 'Date Range' && (
                    <div className="mt-2 pl-7 flex items-center gap-2">
                      <input
                        type="date"
                        value={filters.dateRange?.from || ''}
                        onChange={e => onDateRangeChange({ from: e.target.value, to: filters.dateRange?.to || '' })}
                        className="w-full bg-gray-800 border-gray-600 px-2 py-1 text-sm text-white placeholder-gray-400 focus:ring-brand-accent focus:border-brand-accent"
                        style={{ colorScheme: 'dark' }}
                      />
                      <span className="text-gray-400">-</span>
                      <input
                        type="date"
                        value={filters.dateRange?.to || ''}
                        onChange={e => onDateRangeChange({ from: filters.dateRange?.from || '', to: e.target.value })}
                        className="w-full bg-gray-800 border-gray-600 px-2 py-1 text-sm text-white placeholder-gray-400 focus:ring-brand-accent focus:border-brand-accent"
                        style={{ colorScheme: 'dark' }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1 mt-2">
              {section.options.map((item) => {
                const isExpanded = !!globalSearch || !!expandedItems[item.name];
                return (
                  <React.Fragment key={item.name}>
                    <CheckboxItem 
                      item={item} 
                      category={section.category} 
                      checked={(filters[section.category] as string[]).includes(item.name)} 
                      onFilterChange={onFilterChange}
                    />
                    {item.subItems && (
                      <>
                        {!isExpanded && item.subItems.length > 0 && (
                          <div className="pl-5">
                            <button onClick={() => toggleExpansion(item.name)} className="text-sm text-brand-accent hover:underline py-1 text-left">
                              View All
                            </button>
                          </div>
                        )}
                        {isExpanded && (
                          <>
                            <div className="pl-4 border-l border-gray-700 ml-2">
                              {item.subItems.map(subItem => (
                                <CheckboxItem 
                                  key={subItem.name}
                                  item={subItem} 
                                  category={section.category} 
                                  checked={(filters[section.category] as string[]).includes(subItem.name)}
                                  onFilterChange={onFilterChange}
                                  isSubItem={true}
                                />
                              ))}
                            </div>
                            {!globalSearch && (
                                <div className="pl-5">
                                <button onClick={() => toggleExpansion(item.name)} className="text-sm text-brand-accent hover:underline py-1 text-left">
                                    View Less
                                </button>
                                </div>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          )}
        </Accordion>
      ))}
    </aside>
  );

  return (
    <>
      <div className="hidden lg:block lg:col-span-1 sticky top-8">
        {sidebarContent}
      </div>
       {isOpen && (
         <div className="lg:hidden fixed inset-0 z-40" onClick={onClose}>
           <div className="absolute inset-0 bg-black opacity-50"></div>
         </div>
       )}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-80 bg-brand-dark z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } overflow-y-auto`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-xl text-white">Filters</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-2">
          {sidebarContent}
        </div>
      </div>
    </>
  );
};

export default Sidebar;