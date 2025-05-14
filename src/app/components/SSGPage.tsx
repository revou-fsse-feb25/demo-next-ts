import React from 'react';
import { Post } from '../services/api';

interface SSGPageProps {
  posts: Post[];
}

// Static Site Generation component
const SSGPage: React.FC<SSGPageProps> = ({ posts }) => {
  // TODO: Implement the SSG component to display posts
  // This component receives build-time fetched data through props
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-green-900 text-green-100 rounded border border-green-700">
        <p>This data was statically generated at build time.</p>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-green-300">Posts (SSG):</h3>
        <div className="space-y-3">
          {/* TODO: Map through posts and display them */}
          <div className="p-4 bg-gray-800 rounded shadow border border-gray-700">
            <h4 className="text-md font-medium text-gray-200">Post title will appear here</h4>
            <p className="text-sm text-gray-300 mt-1">Post body excerpt will appear here...</p>
            <p className="text-xs text-gray-500 mt-2">Post ID: 1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SSGPage; 