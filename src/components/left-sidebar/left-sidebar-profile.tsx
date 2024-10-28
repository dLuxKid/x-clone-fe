"use client";

import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import pfp from "@/assets/default-pfp.png";
import Link from "next/link";

export default function LeftSidebarProfile() {
  const { user } = useAuthContext();

  return (
    <Link href={`/users/${user?.username}`} className="w-full">
      <button
        title="profile"
        className="my-4 w-full max-w-[275px] hover:bg-white/20 bg-transparent rounded-full py-2 px-4 transition duration-200 flex items-center justify-between space-x-2"
      >
        <div className="flex items-center space-x-2">
          <Image
            src={user?.profile_picture || pfp}
            alt="profile picture"
            className="rounded-full h-12 w-12 object-fill object-center"
          />
          <div className="text-left">
            <p className="font-semibold text-sm">{user?.displayname}</p>
            <p className="text-xs font-normal">{user?.username}</p>
          </div>
        </div>
        <div>
          <BsThreeDots />
        </div>
      </button>
    </Link>
  );
}
