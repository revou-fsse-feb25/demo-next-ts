import React from 'react';
import LoadingState from './LoadingState';

const DemoLoadingStates: React.FC = () => {
  return (
    <div>
      <p className="text-gray-300 mb-4">Demonstrating proper loading states.</p>
      
      <div className="space-y-4">
        <LoadingState message="Loading data..." />
        <LoadingState message="Fetching results..." />
        <LoadingState message="Refreshing content..." />
      </div>
    </div>
  );
};

export default DemoLoadingStates; 