import React from "react";
import { fetchTodo, Todo } from "../services/api";
import TodoItem from "./Todo";

interface DemoSSRProps {
  todos: Todo[];
}

const DemoSSR: React.FC<DemoSSRProps> = ({ todos }) => {
  console.log("test serverside ", todos);
  return (
    <div>
      <p className="text-gray-300 mb-4">
        Data fetched at request time on the server.
      </p>

      <div className="mt-4">
        <h3 className="text-lg text-blue-200 mb-2">Todos from SSR:</h3>

        {/* TODO: Server-Side Rendering Demo
           1. Display the todos that were fetched on the server
           2. This data is already available at page load without client fetching
        */}

        {todos.length > 0 ? (
          <div>
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        ) : (
          <p>No Todos right now</p>
        )}
        <div className="bg-gray-700 p-3 rounded-md">
          <p className="text-yellow-400">
            ⚠️ TODO: Implement server-side rendered todo list here
          </p>
          <p className="text-gray-400 text-sm">
            The data is already passed as props to this component
          </p>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  console.log("tes server");
  const id = 10;
  try {
    const todos = await fetchTodo(id);
    return {
      props: { todos },
    };
  } catch (error) {
    console.log("error");

    return {
      props: { todos: [] },
    };
  }
};

export default DemoSSR;
