"use client";

import pfp from "@/assets/default-pfp.png";
import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";

export default function Avatar({ size }: { size: number }) {
  const { user } = useAuthContext();

  return (
    <Image
      src={user?.profile_picture || pfp}
      alt="profile picture"
      loading="lazy"
      width={Number(size)}
      height={Number(size)}
      className={`rounded-full h-${size} w-${size} object-fill object-center`}
    />
  );
}
