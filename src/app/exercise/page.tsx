"use client";
import Head from "next/head";
import React, { useState } from "react";

export default function Home(): React.JSX.Element {
  const [counter, setCounter] = useState<number>(0);

  function increment(): void {
    setCounter(counter + 1);
  }

  return (
    <div>
      <Head>
        <title>My Next.js App</title>
      </Head>
      <main>
        <h1>Welcome to my app</h1>
        <p>Counter: {counter}</p>
        <button onClick={increment}>Increment</button>
      </main>
    </div>
  );
}
