import React from 'react';

function SkeletonLoader() {
  return (
    <div className="p-4 bg-gray-200 shadow-md rounded-md">
      <div className="animate-pulse">
        <div className="h-60 bg-gray-300 rounded"></div>
        <div className="p-4">
          <div className="h-6 bg-gray-300 w-3/4 mb-4 rounded"></div>
          <div className="h-4 bg-gray-300 w-1/2 mb-2 rounded"></div>
          <div className="h-4 bg-gray-300 w-3/4 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoader;
