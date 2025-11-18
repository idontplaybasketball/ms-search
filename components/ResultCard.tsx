
import React from 'react';
import DownloadIcon from './icons/DownloadIcon';
import type { Result } from '../types';

interface ResultCardProps {
  result: Result;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  return (
    <div className="bg-white border border-brand-border p-6 relative transition-shadow duration-200 hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">
            <span className="font-bold">{result.contentType}</span> | {result.sector}
          </p>
          <h2 className="text-xl font-normal text-brand-text my-2 max-w-2xl">{result.title}</h2>
          <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">{result.description}</p>
        </div>
        <div className="text-right flex-shrink-0 ml-4">
          <p className="text-sm text-gray-500">{result.date}</p>
          {result.contentType === 'Methodology' && (
            <p className="text-sm font-bold text-green-700">{result.status}</p>
          )}
        </div>
      </div>
      <div className="absolute bottom-4 right-6">
        <button className="text-gray-500 hover:text-brand-text">
          <DownloadIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
