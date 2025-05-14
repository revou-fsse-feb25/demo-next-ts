import React from "react";
import { fetchTodos, Todo } from "../services/api";
import TodoItem from "../components/Todo";
import { GetServerSideProps } from "next";
import Link from "next/link";

interface SSRDemoPageProps {
  todos: Todo[];
}

export default async function SSRDemoPage({ todos }: SSRDemoPageProps) {
  // const data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await fetchTodos();

  console.log("data", data);
  return (
    <div>
      <h1>new page ssr</h1>
      {/* <h1>{posts.title}</h1> */}

      {data.length > 0 ? (
        <div>
          {data.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      ) : (
        <p>No Todos right now</p>
      )}
    </div>
  );
}

// This function runs on every request on the server
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     // We can use context to access cookies, headers, params
//     console.log("Server request at:", new Date().toISOString());

//     // Fetch data on the server
//     const todos = await fetchTodos();

//     // Return as props to the page component
//     return {
//       props: {
//         todos,
//       },
//     };
//   } catch (error) {
//     console.error("Error in getServerSideProps:", error);

//     // Still return something to avoid errors
//     return {
//       props: {
//         todos: [],
//       },
//     };
//   }
// };

// export default SSRDemoPage;
