
import React from 'react';
import type { Result, Article } from '../types';

interface TypeaheadProps {
    suggestions: string[];
    bestMatches: Result[];
    articles: Article[];
    onSelect: (term: string) => void;
    activeIndex: number;
}

const Typeahead: React.FC<TypeaheadProps> = ({ suggestions, bestMatches, articles, onSelect, activeIndex }) => {
  return (
    <div className="absolute top-full left-0 w-full bg-brand-light shadow-2xl border border-brand-border mt-1 z-20">
        <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="col-span-1 p-8 border-r border-brand-border">
                <ul className="space-y-4">
                    {suggestions.map((suggestion, index) => (
                        <li key={suggestion}>
                            <button
                                onClick={() => onSelect(suggestion)}
                                className={`w-full text-left text-xl text-brand-text hover:text-brand-accent ${activeIndex === index ? 'text-brand-accent' : ''}`}
                            >
                                {suggestion}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col-span-2 p-8">
                {bestMatches.length > 0 && (
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                             <h3 className="text-lg font-semibold text-brand-text">Best matches</h3>
                             <a href="#" className="text-sm text-brand-accent hover:underline">View all</a>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {bestMatches.map(match => (
                                <div key={match.id} className="flex items-start space-x-4">
                                    <img src={match.image} alt={match.title} className="w-20 h-20 object-cover flex-shrink-0" />
                                    <div>
                                        <button onClick={() => onSelect(match.title)} className="text-left">
                                            <h4 className="font-semibold text-brand-text hover:text-brand-accent">{match.title}</h4>
                                            <p className="text-sm text-gray-600 line-clamp-2">{match.description}</p>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {articles.length > 0 && (
                     <div>
                        <div className="flex justify-between items-center mb-4">
                             <h3 className="text-lg font-semibold text-brand-text">Articles</h3>
                             <a href="#" className="text-sm text-brand-accent hover:underline">View all</a>
                        </div>
                        <div className="space-y-4">
                             {articles.map(article => (
                                <div key={article.id} className="flex items-center space-x-4">
                                     <img src={article.image} alt={article.title} className="w-20 h-16 object-cover flex-shrink-0" />
                                     <div>
                                         <p className="text-sm text-gray-500">{article.category}</p>
                                         <a href="#" className="font-semibold text-brand-text hover:text-brand-accent">{article.title}</a>
                                     </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default Typeahead;
