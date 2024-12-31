"use client";

import ComposeTweet from "@/components/compose-tweet";
import { useRouter } from "next/navigation";

export default function Post() {
  const router = useRouter();

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-lg p-4 bg-gray-800 rounded-lg">
        <h1 className="text-2xl font-bold text-white">Compose Post</h1>
        <ComposeTweet back={() => router.back()} />
      </div>
    </main>
  );
}
