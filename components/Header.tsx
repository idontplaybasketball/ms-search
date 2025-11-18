import React from 'react';
import FilterIcon from './icons/FilterIcon';

interface HeaderProps {
  onToggleSidebar: () => void;
  totalResults: number;
  tabCounts: {
    research: number;
    issuers: number;
    ratings: number;
  };
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, totalResults, tabCounts, activeTab, onTabChange }) => {
  const tabs = [
    { name: 'Research', count: tabCounts.research },
    { name: 'Issuers', count: tabCounts.issuers },
    { name: 'Ratings', count: tabCounts.ratings },
  ];

  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-brand-border pb-4">
      <div className="flex items-center space-x-4 mb-4 md:mb-0">
        <button onClick={onToggleSidebar} className="lg:hidden text-brand-text">
          <FilterIcon className="w-6 h-6" />
        </button>
        <div className="flex items-center">
          <span className="text-lg font-light mr-4">{totalResults.toLocaleString()} Results</span>
          <div className="flex items-center border border-gray-300">
            {tabs.map((tab, index) => (
              <button
                key={tab.name}
                onClick={() => onTabChange(tab.name)}
                className={`px-6 py-2 text-sm transition-colors duration-200 ${
                  activeTab === tab.name
                    ? 'bg-white text-brand-text border-gray-300 shadow-sm'
                    : 'bg-transparent text-gray-600 hover:bg-gray-100'
                } ${index > 0 ? 'border-l border-gray-300' : ''}`}
              >
                {tab.name} <span className="text-xs text-gray-500 ml-1">{`(${tab.count.toLocaleString()})`}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <label htmlFor="sort-by" className="text-sm text-gray-600">Sort By:</label>
        <select id="sort-by" className="bg-transparent border-none text-brand-text text-sm font-medium focus:ring-0">
          <option>Newest</option>
          <option>Oldest</option>
          <option>Relevance</option>
        </select>
      </div>
    </header>
  );
};

export default Header;