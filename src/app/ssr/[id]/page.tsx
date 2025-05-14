"use client";
import React from "react";
import { fetchTodos, Todo } from "../../services/api";
import { useParams } from "next/navigation";

interface SSRDemoPageProps {
  todos: Todo[];
}

export default async function SSRDemoPage({ todos }: SSRDemoPageProps) {
  const router = useParams<{ id: string }>();
  const id: string = router.id;

  const data = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  const post = await data.json();
  // const data = await fetchTodos();

  console.log("data", data);
  return (
    <div>
      <h1>new page ssr</h1>
      <h1>{post.title}</h1>
    </div>
  );
}
