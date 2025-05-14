// TODO: Import fetchUser function from services/api
// TODO: Import User type from services/api

interface DynamicSSRProps {
  userId: number;
}

// Dynamic Server-Side Rendering component using params
const DynamicSSR = async ({ userId }: DynamicSSRProps) => {
  // TODO: Implement server-side data fetching based on userId
  // 1. Use the fetchUser function to get data for the specific user
  // 2. Handle the user data in the component
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-purple-900 text-purple-100 rounded border border-purple-700">
        <p>This data was dynamically fetched on the server using ID: {userId}</p>
      </div>
      
      <div className="p-4 bg-gray-800 rounded shadow border border-gray-700 space-y-3">
        {/* TODO: Display user data here */}
        <h3 className="text-lg font-medium text-purple-300">User Name Will Appear Here</h3>
        <div className="space-y-1">
          <p className="text-gray-300">
            <span className="font-medium text-gray-200">Username:</span> username
          </p>
          <p className="text-gray-300">
            <span className="font-medium text-gray-200">Email:</span> user@example.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default DynamicSSR; 