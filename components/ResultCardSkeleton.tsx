import React from 'react';

const ResultCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-brand-border p-6 relative animate-pulse">
      <div className="flex justify-between items-start">
        <div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4 my-3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
        <div className="text-right flex-shrink-0 ml-4 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-16 ml-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-20 ml-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default ResultCardSkeleton;
