import { fetchUser, User } from '../services/api';

interface DynamicSSRProps {
  userId: number;
}

// Dynamic Server-Side Rendering component using params
const DynamicSSR = async ({ userId }: DynamicSSRProps) => {
  // Fetch user data on the server based on the userId
  const user: User = await fetchUser(userId);
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-purple-900 text-purple-100 rounded border border-purple-700">
        <p>This data was dynamically fetched on the server using ID: {userId}</p>
      </div>
      
      <div className="p-4 bg-gray-800 rounded shadow border border-gray-700 space-y-3">
        <h3 className="text-lg font-medium text-purple-300">{user.name}</h3>
        <div className="space-y-1">
          <p className="text-gray-300">
            <span className="font-medium text-gray-200">Username:</span> {user.username}
          </p>
          <p className="text-gray-300">
            <span className="font-medium text-gray-200">Email:</span> {user.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DynamicSSR; 