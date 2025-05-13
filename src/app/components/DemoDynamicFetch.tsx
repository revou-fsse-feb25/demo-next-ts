import React from 'react';
import { fetchUser } from '../services/api';

interface DemoDynamicFetchProps {
  userId: number;
}

// Dynamic data fetching example
const DemoDynamicFetch = async ({ userId }: DemoDynamicFetchProps) => {
  // TODO: Dynamic Data Fetching
  // 1. Use fetchUser() from the API service to fetch user data
  // 2. The userId parameter determines which user to fetch
  // 3. Remember this is a server component, so use async/await directly
  
  return (
    <div>
      <p className="text-gray-300 mb-4">Fetching data based on dynamic parameters.</p>
      
      <div className="bg-gray-700 p-4 rounded-md">
        <p className="text-yellow-400">⚠️ TODO: Implement dynamic fetching for user ID: {userId}</p>
        <p className="text-gray-400 text-sm">Fetch and display the user data here</p>
      </div>
    </div>
  );
};

export default DemoDynamicFetch; 