"use client";
import { useState } from "react";

// This example demonstrates props drilling - passing props through multiple components
// to show why Context API is useful for avoiding this pattern

// Top level component with user data
const PropsDrillingExample = () => {
  // State is defined at the top level
  const [username, setUsername] = useState<string>("JohnDoe");

  return (
    <div className="p-6 bg-card-light dark:bg-card-dark rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-text-light dark:text-text-dark">
        Props Drilling Example
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        This example shows how props need to be passed through multiple
        components when not using Context.
      </p>

      {/* We pass the state down to child components */}
      <UserProfile username={username} setUsername={setUsername} />
    </div>
  );
};

// Middle component that doesn't need the props but has to receive and pass them down
type UserProfileProps = {
  username: string;
  setUsername: (name: string) => void;
};

const UserProfile = ({ username, setUsername }: UserProfileProps) => {
  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
      <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-2">
        User Profile
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        This component doesn't use the username or setUsername, but must receive
        them to pass down.
      </p>

      {/* We pass the props further down to the next component */}
      <UserNameEditor username={username} setUsername={setUsername} />
    </div>
  );
};

// Leaf component that actually needs and uses the props
type UserNameEditorProps = {
  username: string;
  setUsername: (name: string) => void;
};

const UserNameEditor = ({ username, setUsername }: UserNameEditorProps) => {
  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
      <h4 className="text-md font-semibold text-text-light dark:text-text-dark mb-2">
        Username Editor
      </h4>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        This deeply nested component finally uses the username and setUsername
        props.
      </p>

      <div className="flex items-center mt-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 mr-2 bg-white dark:bg-gray-700 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent outline-none transition-all"
        />
        <span className="text-text-light dark:text-text-dark">
          Current username: <span className="font-medium">{username}</span>
        </span>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-md">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Problem:</strong> We had to pass the username and setUsername
          props through the UserProfile component, even though it doesn't use
          these props. This is called "props drilling" and becomes problematic
          as your component tree gets deeper or more complex.
        </p>
        <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-2">
          <strong>Solution:</strong> Use React Context API to make these values
          available to any component in the tree without passing props through
          intermediate components.
        </p>
      </div>
    </div>
  );
};

export default PropsDrillingExample;
