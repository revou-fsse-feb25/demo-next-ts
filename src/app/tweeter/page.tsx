"use client";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  return (
    <div>
      <h1>page tweeter</h1>
      <button onClick={() => router.push("/tweeter/about")}>
        Button menuju page about
      </button>
    </div>
  );
}

export default page;
