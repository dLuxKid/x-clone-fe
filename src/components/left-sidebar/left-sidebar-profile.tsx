"use client";

import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import Avatar from "../avatar";

export default function LeftSidebarProfile() {
  const { user } = useAuthContext();

  return (
    <Link href={user ? `/users/${user?.username}` : "/auth"} className="w-full">
      <button
        title="profile"
        className="my-4 w-full max-w-[275px] hover:bg-white/20 bg-transparent rounded-full py-2 px-4 transition duration-200 flex items-center justify-between space-x-2"
      >
        <div className="flex items-center space-x-2">
          <div className="h-12 w-12">
            <Avatar size={12} />
          </div>
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
