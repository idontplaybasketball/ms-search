import React, { useState, useEffect, useRef, useCallback } from 'react';
import SearchIcon from './icons/SearchIcon';
import CloseIcon from './icons/CloseIcon';
import Typeahead from './Typeahead';
import { MOCK_RESULTS } from '../mockData';
import { FilterCategory, type Result, type Article } from '../types';

interface GlobalSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearchWithFilters: (term: string, filter: { category: FilterCategory; value: string } | null, tab: string | null) => void;
}

const MOCK_ARTICLES: Article[] = [
    {
        id: 1,
        title: 'Global Energy Outlook 2024',
        category: 'Industry Studies',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&q=80',
    },
    {
        id: 2,
        title: 'The Future of Corporate Bonds',
        category: 'Commentaries',
        image: 'https://images.unsplash.com/photo-1665686310934-8651c6a22f74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&q=80',
    },
    {
        id: 3,
        title: 'Navigating Regulatory Changes in Banking',
        category: 'Regulatory Affairs',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&q=80',
    },
     {
        id: 4,
        title: 'Podcast: The State of Securitization',
        category: 'Podcast',
        image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&q=80',
    },
];

const GlobalSearch: React.FC<GlobalSearchProps> = ({ searchTerm, onSearchChange, onSearchWithFilters }) => {
  const [isTypeaheadVisible, setIsTypeaheadVisible] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [bestMatches, setBestMatches] = useState<Result[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const suggestionSuffixes = ['Methodologies', 'Research', 'Ratings', 'Industry Studies', 'Commentaries'];

  useEffect(() => {
    const lowercasedTerm = searchTerm.trim().toLowerCase();
    
    if (lowercasedTerm === '') {
      setIsTypeaheadVisible(false);
      setSuggestions([]);
      return;
    }

    // Generate Suggestions based on content types
    const generatedSuggestions = [
        searchTerm,
        ...suggestionSuffixes.map(suffix => `${searchTerm} ${suffix}`)
    ];
    setSuggestions([...new Set(generatedSuggestions)]);

    // Filter Best Matches
    const filteredBestMatches = MOCK_RESULTS.filter(r =>
      r.title.toLowerCase().includes(lowercasedTerm)
    ).slice(0, 3);
    setBestMatches(filteredBestMatches);
    
    // Filter Articles
    const filteredArticles = MOCK_ARTICLES.filter(a =>
        a.title.toLowerCase().includes(lowercasedTerm)
    ).slice(0, 3);
    setArticles(filteredArticles);

    if ((generatedSuggestions.length > 1 || filteredBestMatches.length > 0 || filteredArticles.length > 0) && document.activeElement === inputRef.current) {
        setIsTypeaheadVisible(true);
    } else {
        setIsTypeaheadVisible(false);
    }
    setActiveIndex(-1); // Reset active index on new search term

  }, [searchTerm]);

  const handleSelect = useCallback((term: string) => {
    const tabTypes = ['Research', 'Ratings'];
    const suffixMap: { [key: string]: string } = {
        'Methodologies': 'Methodology',
    };
    
    let baseTerm = term;
    let appliedFilter: { category: FilterCategory; value: string } | null = null;
    let appliedTab: string | null = null;

    for (const suffix of suggestionSuffixes) {
        if (term.toLowerCase().endsWith(` ${suffix.toLowerCase()}`)) {
            baseTerm = term.substring(0, term.length - suffix.length - 1).trim();
            if (tabTypes.includes(suffix)) {
                appliedTab = suffix;
            } else {
                const filterValue = suffixMap[suffix] || suffix;
                appliedFilter = { category: FilterCategory.ContentType, value: filterValue };
            }
            break;
        }
    }
    
    onSearchWithFilters(baseTerm, appliedFilter, appliedTab);
    setIsTypeaheadVisible(false);
    if (inputRef.current) {
        inputRef.current.blur();
    }
  }, [onSearchWithFilters, suggestionSuffixes]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const totalItems = suggestions.length;
    if (!totalItems) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prevIndex => (prevIndex + 1) % totalItems);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prevIndex => (prevIndex - 1 + totalItems) % totalItems);
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIndex > -1 && suggestions[activeIndex]) {
            handleSelect(suggestions[activeIndex]);
        } else {
            handleSelect(searchTerm);
        }
    } else if (e.key === 'Escape') {
        setIsTypeaheadVisible(false);
        if (inputRef.current) inputRef.current.blur();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsTypeaheadVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mb-8" ref={searchContainerRef}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
        <SearchIcon className="w-5 h-5 text-gray-400" />
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search issuers, ratings, research"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        onFocus={() => { if(searchTerm) setIsTypeaheadVisible(true) }}
        onKeyDown={handleKeyDown}
        className="w-full bg-brand-light border-b border-brand-text pl-12 pr-10 py-3 text-2xl text-brand-text placeholder-gray-500 focus:outline-none"
        aria-label="Global search"
        autoComplete="off"
      />
      {searchTerm && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button
            onClick={() => onSearchChange('')}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
      )}
      {isTypeaheadVisible && (
        <Typeahead
            suggestions={suggestions}
            bestMatches={bestMatches}
            articles={articles}
            onSelect={handleSelect}
            activeIndex={activeIndex}
        />
      )}
    </div>
  );
};

export default GlobalSearch;