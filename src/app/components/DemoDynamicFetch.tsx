import React from 'react';
import { fetchUser } from '../services/api';

interface DemoDynamicFetchProps {
  userId: number;
}

// Dynamic data fetching example
const DemoDynamicFetch = async ({ userId }: DemoDynamicFetchProps) => {
  const user = await fetchUser(userId);
  
  return (
    <div>
      <p className="text-gray-300 mb-4">Fetching data based on dynamic parameters.</p>
      
      <div className="bg-gray-700 p-4 rounded-md">
        <h3 className="text-lg font-medium text-blue-200 mb-2">{user.name}</h3>
        <p className="text-gray-300">@{user.username}</p>
        <p className="text-gray-300">{user.email}</p>
        <p className="text-gray-400 text-sm mt-2">User ID: {user.id}</p>
      </div>
    </div>
  );
};

export default DemoDynamicFetch; 