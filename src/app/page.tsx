/**
 * TODO IMPLEMENTATION GUIDE
 * =======================
 * 
 * Follow these steps from top to bottom to implement the complete application.
 * 
 * 1. PROJECT SETUP
 *    1.1 Set up Next.js project with TypeScript and Tailwind CSS
 *    1.2 Configure dark mode in tailwind.config.js
 *    1.3 Set up project structure (components, utils, types directories)
 * 
 * 2. DATA TYPES & API
 *    2.1 Define Todo interface in types/index.ts
 *    2.2 Set up API service in utils/api.ts
 *    2.3 Implement API functions (fetchTodos, createTodo, updateTodo, deleteTodo)
 * 
 * 3. COMPONENTS - FOUNDATION
 *    3.1 Create a basic page layout in app/layout.tsx
 *    3.2 Create the main page component in app/page.tsx
 *    3.3 Set up dark mode configuration
 * 
 * 4. COMPONENTS - TODO FORM
 *    4.1 Set up React Hook Form in TodoForm component
 *    4.2 Implement form validation
 *    4.3 Handle form submission to API
 *    4.4 Add error handling for form submission
 * 
 * 5. COMPONENTS - TODO ITEM
 *    5.1 Create TodoItem component for individual todos
 *    5.2 Implement toggle functionality
 *    5.3 Add edit capability with TodoForm
 *    5.4 Implement delete functionality
 * 
 * 6. COMPONENTS - TODO LIST
 *    6.1 Set up TodoList component state
 *    6.2 Implement data fetching from API
 *    6.3 Add error and loading states
 *    6.4 Connect TodoForm for creating new todos
 *    6.5 Render list of TodoItems
 *    6.6 Add statistics for completed todos
 */

// TODO: 1.1 Import the TodoList component
import TodoList from './components/TodoList';
import FormReactHook from './components/FormReactHook';

export default function Home() {
  // TODO: 2.1 Render the TodoList component with dark mode
  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <TodoList />
        {/* <FormReactHook /> */}
      </div>
    </div>
  );
}
