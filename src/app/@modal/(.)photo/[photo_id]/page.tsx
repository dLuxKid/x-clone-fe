"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function page({ params }: { params: { photo_id: string } }) {
  const router = useRouter();

  const { photo_id } = params;
  // const getParams = async () => {
  //   console.log(photo_id);
  //   return photo_id;
  // };

  return (
    <main
      className="px-[5%] flex items-center justify-center fixed inset-0"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute z-10 inset-0 bg-black/10"
        onClick={() => router.back()}
      />
      <div
        className="relative z-50 rounded-lg shadow-lg size-full max-w-lg w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photo_id}
          alt="tweet image"
          className="size-full object-fill object-center"
        />
      </div>
    </main>
  );
}
