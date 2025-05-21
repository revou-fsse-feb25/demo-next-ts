"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/home");
      }
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, session, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">NextAuth.js Demo</h1>
        <div className="mt-6">
          <div className="animate-pulse flex space-x-4 justify-center">
            <div className="rounded-full bg-blue-600 h-3 w-3"></div>
            <div className="rounded-full bg-blue-600 h-3 w-3"></div>
            <div className="rounded-full bg-blue-600 h-3 w-3"></div>
          </div>
          <p className="mt-4 text-lg text-gray-300">Redirecting...</p>
        </div>
      </div>
    </div>
  );
}
