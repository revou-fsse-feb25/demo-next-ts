# Next.js Todo App with TypeScript and React Hook Form

A minimal Next.js demo application with TypeScript, App Router, React Hook Form, and CRUD operations using local JSON data.

## Features

- **TypeScript**: Type-safe development
- **Next.js App Router**: Modern routing framework
- **React Hook Form**: Form validation and handling
- **CRUD Operations**: Create, Read, Update, Delete operations
- **Local JSON Storage**: Todos stored in a local JSON file

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
/src
  /app                      # Next.js App Router
    /api                    # API Routes
      /todos                # Todo API endpoints
        /[id]               # Dynamic routes for specific todos
          route.ts          # GET, PATCH, DELETE handlers
        route.ts            # GET, POST handlers
    /components             # React components
      TodoForm.tsx          # Form for creating/editing todos
      TodoItem.tsx          # Component for individual todo items
      TodoList.tsx          # Main todo list component
    page.tsx                # Home page component
  /data                     # Data storage
    todos.json              # Local JSON file for storing todos
  /types                    # TypeScript types
    index.ts                # Todo type definitions
  /utils                    # Utility functions
    todoUtils.ts            # CRUD operations for todos
```

## Implementation Steps

1. **Setup Next.js**: Create a new Next.js project with TypeScript and App Router
2. **Define Types**: Create interfaces for Todo data and form inputs
3. **Create Local JSON**: Set up a local JSON file for storing todos
4. **Implement Utils**: Create utility functions for CRUD operations
5. **API Routes**: Set up API endpoints for todos
6. **React Components**: Build React components with React Hook Form
7. **Styling**: Apply minimal CSS for a clean UI

## How It Works

- **Creating Todos**: Enter a title in the form and click "Add"
- **Reading Todos**: Todos are displayed in a list
- **Updating Todos**: Click "Edit" on a todo to modify it or check/uncheck to toggle completion
- **Deleting Todos**: Click "Delete" on a todo to remove it

## Technologies Used

- Next.js
- TypeScript
- React Hook Form
- Node.js File System API
