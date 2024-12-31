"use client";

import ComposeTweet from "@/components/compose-tweet";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  return (
    <main
      className="p-[5%] fixed inset-0"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute z-[800] inset-0 bg-black/10"
        onClick={() => router.back()}
      />
      <div
        className="relative z-[900] rounded-lg shadow-lg size-full max-w-lg w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <ComposeTweet back={() => router.back()} />
      </div>
    </main>
  );
}
